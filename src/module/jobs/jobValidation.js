import Joi from "joi";

export const addJobSchema = Joi.object({

    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid("onsite", "remotely", "hybrid").required(),
    workingTime: Joi.string().valid("part-time", "full-time").required(),
    seniorityLevel: Joi.string().valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO").required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
    companyId: Joi.string().hex().length(24).required(),
    
});

export const updateJobSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    jobTitle: Joi.string(),
    jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
    workingTime: Joi.string().valid("part-time", "full-time"),
    seniorityLevel: Joi.string().valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
});

export const getByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

export const jobFilterSchema = Joi.object({
    workingTime: Joi.string().valid("part-time", "full-time"),
    jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
    seniorityLevel: Joi.string().valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"),
    jobTitle: Joi.string(),
    technicalSkills: Joi.string(),
  });

  export const getCompanyByNameSchema = Joi.object({
    companyName: Joi.string().required()
});

export const applySchema = Joi.object({
    jobId: Joi.string().hex().length(24).required(),
    userTechSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    userResume: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('application/pdf').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
}).required(),

});