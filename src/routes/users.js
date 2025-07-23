import { Router } from "express";
import { deleteUser, getAllUsers, getSingleUser, loginUser, logoutUser, registerUser, resetPassword, updatePassword } from "../controllers/users.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";

const userRouter = Router();

// Routes
// Register User
userRouter.post("/users/register", registerUser);

// Login User
userRouter.post("/users/login", loginUser);

// Update Password
userRouter.post("/users/update-password", isAuthenticated, updatePassword);

// Reset Password
userRouter.post("/users/reset-password", isAuthenticated, resetPassword);

// Admin
// Fetch all users
userRouter.get("/admin/users", isAuthenticated, isAdmin, getAllUsers);

// Fetch single user
userRouter.get("/admin/users/:id", isAuthenticated, isAdmin, getSingleUser);

// Delete user
userRouter.delete("/admin/users/:id", isAuthenticated, isAdmin, deleteUser);

// Logout user
userRouter.post("/users/logout", isAuthenticated, logoutUser);

export default userRouter;