import Joi from "joi";

export const emailValidation = () => Joi.string().lowercase().trim().email({ minDomainSegments: 2 });