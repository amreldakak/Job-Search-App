import Joi from "joi";

export const addCompanySchema = Joi.object({

    companyName: Joi.string().required(),
    description: Joi.string().min(3).max(300),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.string(),
    companyEmail: Joi.string().required(),
});

export const updateCompanySchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    companyName: Joi.string(),
    description: Joi.string().min(3).max(300),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.string(),
});

export const getCompanyByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

export const getCompanyByNameSchema = Joi.object({
    name: Joi.string().required()
});