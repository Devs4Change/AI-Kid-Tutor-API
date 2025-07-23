import { Router } from "express";
import { getAllCourses, getSingleCourse, addCourse, updateCourse, deleteCourse } from "../controllers/courses.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";

const courseRouter = Router();

// Routes

// Fetch all courses
courseRouter.get("/courses", getAllCourses);

// Fetch single course
courseRouter.get("/courses/:id", getSingleCourse);

// Admin

// Create course
courseRouter.post("/courses/create", isAuthenticated, isAdmin, addCourse);

// Update course
courseRouter.put("/courses/:id", isAuthenticated, isAdmin, updateCourse);

// Delete course
courseRouter.delete("/courses/:id", isAuthenticated, isAdmin, deleteCourse);

export default courseRouter;