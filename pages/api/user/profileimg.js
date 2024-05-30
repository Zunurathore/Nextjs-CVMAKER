import { IncomingForm } from 'formidable';
import User from '@/models/User'; // Ensure you have the User model
const { connectDb } = require("@/helper/db");
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    await connectDb();

    if (req.method === "POST") {
        const cookies = parseCookies({ req });
        const token = cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const id = decoded.id;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const form = new IncomingForm();
        const uploadDir = path.join(process.cwd(), 'public', 'profileimges');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        form.uploadDir = uploadDir;
        form.keepExtensions = true;
        if(user.profileimg)
            {
                const imagePath = path.join(uploadDir, user.profileimg.split('/').pop());
                // Check if the file exists
                if (fs.existsSync(imagePath)) {
                    // Delete the file
                    fs.unlinkSync(imagePath);
                }
            }
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing the form:', err);
                return res.status(500).json({ success: false, error: 'Error parsing the form' });
            }

            const photo = files.photo;
            const photoFile = Array.isArray(photo) ? photo[0] : photo;

            if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
                console.error('Filepath or originalFilename missing:', photoFile);
                return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
            }

            const uniqueId = uuidv4();
            const fileExtension = photoFile.originalFilename.split('.').pop();
            const uniqueFileName = `${uniqueId}.${fileExtension}`;
            const newPath = path.join(uploadDir, uniqueFileName);

            fs.rename(photoFile.filepath, newPath, async (err) => {
                if (err) {
                    console.error('Error moving file:', err);
                    return res.status(500).json({ success: false, error: 'Error moving file' });
                }

                user.profileimg = `/profileimges/${uniqueFileName}`;
                await user.save();

                return res.status(200).json({ success: true, message: 'Profile image updated successfully', profileimg: user.profileimg });
            });
        });
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

export default handler;
