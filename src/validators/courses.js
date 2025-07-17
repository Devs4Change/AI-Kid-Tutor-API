import Joi from "joi";

// Create Course Validator
export const createCourseValidator = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    level: Joi.string().required(),
    duration: Joi.string().required(),
    lessons: Joi.array().required(),
    description: Joi.string().required(),
    skills: Joi.array(),
    thumbnail: Joi.string(),
    status: Joi.string(),
    rating: Joi.number(),
    enrolled: Joi.number()
});

// Update Course Validator
export const updateCourseValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    level: Joi.string(),
    duration: Joi.string(),
    lessons: Joi.array(),
});

