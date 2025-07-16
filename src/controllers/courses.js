import { CourseModel } from "../models/courses.js";
import { createCourseValidator, updateCourseValidator } from "../validators/courses.js";

// Add Course Controller
export const addCourse = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = createCourseValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        const course = await CourseModel.create(value);
        return res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};

// Get All Courses Controller
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await CourseModel.find();
        return res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
};

// Get Single Course Controller
export const getSingleCourse = async (req, res, next) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        return res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

// Update Course Controller
export const updateCourse = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = updateCourseValidator.validate(req.body);
        const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

// Delete Course Controller
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await CourseModel.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json("Course deleted successfully");
    } catch (error) {
        next(error);
    }
};