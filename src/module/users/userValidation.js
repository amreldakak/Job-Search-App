import Joi from "joi";

export const signUpSchema = Joi.object({

    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.date().required(),
    mobilenumber: Joi.string().required(),
    role: Joi.string().valid("User", "Company_HR").required(),
    status: Joi.string().default('offline'),
});

export const signInSchema = Joi.object({

    email: Joi.string().required(),
    password: Joi.string().required(),
    mobilenumber: Joi.number().optional(),
});

export const getUserByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

export const updateUserSchema = Joi.object({
    firstname: Joi.string().min(3),
    lastname: Joi.string().min(3),
    email: Joi.string().email(),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.date(),
    mobilenumber: Joi.number(),
});

export const updatePasswordSchema = Joi.object({
    cPassword: Joi.string().required(),
    nPassword: Joi.string().required(), 
});

export const getAllAccountsRecoveryMail = Joi.object({
    recoveryEmail: Joi.string(),
});

export const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const newPasswordOtpSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    nPassword: Joi.string().required(),
});