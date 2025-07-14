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
        const course = await CourseModel.create(req.body);
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