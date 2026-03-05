import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/UserSchema.js";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname) {
            return res.status(400).json({ error: "Fullname is required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Password must be strong (min 8 chars, uppercase, number, symbol)" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_PASS));

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).json({ success: true, message: 'User signed up successfully',});

    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found, signup first" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful', user, token });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Error during login', message: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Error during logout:', error.message);
        res.status(500).send({ error: 'Error during logout', message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, message: 'User fetched successfully', user });
    } catch (error) {
        console.error('Error getting user:', error.message);
        res.status(500).send({ error: 'Error getting user', message: error.message });
    }
}
