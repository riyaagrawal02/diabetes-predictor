import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Diabetes from '../models/diabetes.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "user alraedy exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "user resgistered successfully" })
    } catch (error) {
        console.error("error", error.message);
        res.status(500).json({ message: "Error" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist.Please signup" })
        }
        console.log(user)
        const isPasswordSame = await bcrypt.compare(password, user.password);
        if (!isPasswordSame) {
            return res.status(403).json({ message: 'Invalid Password' })
        }
        const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Signed in successfully", token })
    } catch (error) {
        console.error('Error', error.message);
        res.status(500).json({ message: "Error" })
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const email = req.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found! Please signin!" })
        }
        res.status(200).json({ message: "User Found Successfully!", user });

    } catch (error) {
        console.error("Error", error.message);
        res.status(500).json({ message: "Internal Server Error in signing in user!" })
    }
});

export default router