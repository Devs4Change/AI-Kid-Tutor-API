import Joi from "joi";

// Register User Validator
export const resgisterUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("user", "admin").default("user")
});

// Login User Validator
export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// Update Password
export const updatePasswordValidator = Joi.object({
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

// Reset Password
export const resetPasswordValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})