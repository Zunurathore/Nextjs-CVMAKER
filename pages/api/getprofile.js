import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
const {connectDb}  = require("@/helper/db");
import Profile from '@/models/Profile';
import User from '@/models/User';

const handler = async (req, res) => {
  try {
    await connectDb();

    if (req.method === 'GET') {
      // Get token from cookies
      const cookies = parseCookies({ req });
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      // Decode token to get user information
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decoded.email;

      // Fetch the user from the database using the email
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Fetch the profile for the user
      const profile = await Profile.findOne({ userId: user._id });

      if (!profile) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }

      // Send the profile data
      res.status(200).json(profile);
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default handler;
