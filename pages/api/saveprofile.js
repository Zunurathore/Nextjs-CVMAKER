// pages/api/saveprofile.js
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
const {connectDb}  = require("@/helper/db");
import Profile from '@/models/Profile'; // Adjust the path according to your project structure
import User from '@/models/User'; // Ensure you have the User model

const handler = async (req, res) => {
  try {
    await connectDb();

    if (req.method === 'POST') {
      const { vorname, nachname, strabe, hausnummer, PLZ, Ort, email, tel, geburtsdatum, ausgeübterBeruf, arbeitgeber, income, } = req.body;

      // Get token from cookies
      const cookies = parseCookies({ req });
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      // Decode token to get user information
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decoded.email; // Assuming your token payload has the user email

      // Fetch the user from the database using the email
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Create a new Profile instance with the form data
      const newProfile = new Profile({
        userId: user._id,
        vorname,
        nachname,
        strabe,
        hausnummer,
        PLZ,
        Ort,
        email,
        tel,
        geburtsdatum,
        ausgeübterBeruf,
        arbeitgeber,
        income,
        // Add other fields as needed
      });

      // Save the new profile to the database
      await newProfile.save();

      // Send a success response
      res.status(200).json({ success: true, data: newProfile });
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default handler;
