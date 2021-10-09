import Joi from "joi";

export const lastNameValidation = () => Joi.string().min(1).max(100);
