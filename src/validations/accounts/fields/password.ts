import Joi from "joi";

export const passwordValidation = Joi.string().min(8).max(50);