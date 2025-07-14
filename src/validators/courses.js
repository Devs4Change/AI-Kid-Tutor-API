import Joi from "joi";

// Create Course Validator
export const createCourseValidator = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    level: Joi.string().required(),
    duration: Joi.string().required(),
    lessons: Joi.number().required(),
    description: Joi.string().required(),
});

// Update Course Validator
export const updateCourseValidator = Joi.object({
    title: Joi.string(),
    category: Joi.string(),
    level: Joi.string(),
    duration: Joi.string(),
    lessons: Joi.number(),
    description: Joi.string(),
});

