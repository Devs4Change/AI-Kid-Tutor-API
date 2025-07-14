import { Router } from "express";
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, resetPassword, updatePassword } from "../controllers/users.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";


const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.post("/users/update-password", isAuthenticated, updatePassword);
userRouter.post("/users/reset-password", isAuthenticated, resetPassword);
userRouter.get("/admin/users", isAuthenticated, getAllUsers);
userRouter.get("/admin/users/:id", isAuthenticated, getSingleUser);
userRouter.delete("/admin/users/:id", isAuthenticated, isAdmin, deleteUser);

export default userRouter;