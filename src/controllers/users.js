import { UserModel } from "../models/users.js"
import { loginUserValidator, resetPasswordValidator, resgisterUserValidator, updatePasswordValidator } from "../validators/users.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User Controller
export const registerUser = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = resgisterUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }

        // Check if user exists
        const existingUser = await UserModel.findOne({ email: value.email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        // Hash Password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Create user
        await UserModel.create({ ...value, password: hashedPassword });

        return res.status(201).json("User registered successfully");
    } catch (error) {
        next(error);
    }
}

// Login User Controller
export const loginUser = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = loginUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        // Find user
        const user = await UserModel.findOne({ email: value.email });

        if (!user) {
            return res.status(404).json("User not found");
        }
        // Check password
        const isPasswordValid = bcrypt.compareSync(value.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json("Invalid Credentials");
        }
        // Generate token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );
        // Send success response
        return res.status(200).json({ message: "User logged in Successfully", accessToken: token , role: user.role});

    } catch (error) {
        next(error);
    }
};

// Update Password Controller
export const updatePassword = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = updatePasswordValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }

        // Find user
        const user = await UserModel.findOne({ email: value.email });

        if (!user) {
            return res.status(404).json("User not found");
        }

        // Check password
        const isPasswordValid = bcrypt.compareSync(value.oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json("Invalid Credentials");
        }

        // Hash Password
        const hashedPassword = bcrypt.hashSync(value.newPassword, 10);

        // Update password
        await UserModel.updateOne({ email: value.email }, { $set: { password: hashedPassword } });

        return res.status(200).json("Password updated successfully");
    } catch (error) {
        next(error);
    }
};

// Reset Password Controller
export const resetPassword = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = resetPasswordValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }

        // Find user
        const user = await UserModel.findOne({ email: value.email });

        if (!user) {
            return res.status(404).json("User not found");
        };

        //Hash Password
        const hashedPassword = bcrypt.hashSync(value.password, 10);

        // Update password
        await UserModel.updateOne({ email: value.email }, { $set: { password: hashedPassword } });

        return res.status(200).json("Password reset successfully");
    }
    catch (error) {
        next(error);
    }
};


//Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get single user
export const getSingleUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};