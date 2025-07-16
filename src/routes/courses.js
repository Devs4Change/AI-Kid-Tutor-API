import { Router } from "express";
import { getAllCourses, getSingleCourse, addCourse, updateCourse, deleteCourse } from "../controllers/courses.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";

const courseRouter = Router();

courseRouter.get("/courses", getAllCourses);
courseRouter.get("/courses/:id", getSingleCourse);
courseRouter.post("/admin/courses/create", isAuthenticated, isAdmin, addCourse);
courseRouter.put("/admin/courses/:id", isAuthenticated, isAdmin, updateCourse);
courseRouter.delete("/admin/courses/:id", isAuthenticated, isAdmin, deleteCourse);

export default courseRouter;