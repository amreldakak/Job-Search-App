import express from "express";
import { validation } from "../middleware/validation.js";
import { getAppByCompanyIdSchema } from "./appValidation.js";
import { getAppsForCompany } from "./appController.js";
const appRoutes = express.Router({mergeParams:true});


appRoutes.use("/",validation(getAppByCompanyIdSchema),getAppsForCompany);



export default appRoutes;