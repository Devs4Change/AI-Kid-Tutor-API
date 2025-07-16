import { Router } from "express";
import { getAllCourses, getSingleCourse, addCourse, updateCourse, deleteCourse } from "../controllers/courses.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";

const courseRouter = Router();

courseRouter.get("/courses", getAllCourses);
courseRouter.get("/courses/:id", getSingleCourse);
courseRouter.post("/courses/create", isAuthenticated, isAdmin, addCourse);
courseRouter.put("/courses/:id", isAuthenticated, isAdmin, updateCourse);
courseRouter.delete("/courses/:id", isAuthenticated, isAdmin, deleteCourse);

export default courseRouter;