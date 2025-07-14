import { Router } from "express";
import { getAllCourses, getSingleCourse, addCourse, updateCourse } from "../controllers/courses.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";

const courseRouter = Router();

courseRouter.get("/courses", isAuthenticated, getAllCourses);
courseRouter.get("/courses/:id", isAuthenticated, getSingleCourse);
courseRouter.post("/courses/create", isAuthenticated, isAdmin, addCourse);
courseRouter.put("/courses/:id", isAuthenticated, isAdmin, updateCourse);

export default courseRouter;