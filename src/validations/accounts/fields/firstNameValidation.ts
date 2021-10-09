import Joi from "joi";

export const firstNameValidation = () => Joi.string().min(1).max(100);
