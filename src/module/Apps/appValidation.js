import Joi from "joi";

export const getAppByCompanyIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});