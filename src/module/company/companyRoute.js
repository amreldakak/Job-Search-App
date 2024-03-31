import express from "express";
import { addCompany, deleteCompany, searchCompanyName, updateCompany } from "./comanyController.js"
import { addCompanySchema, getCompanyByIdSchema, getCompanyByNameSchema, updateCompanySchema } from "./companyValidation.js"
import auth from "../middleware/auth.js";
import { validation } from "../middleware/validation.js";
import authorizeUser from "../middleware/authorize.js";
import jobRoutes from "../jobs/jobRoutes.js"
import appRoutes from "../Apps/appRoute.js";
const companyRoutes = express.Router({mergeParams:true});

companyRoutes.post("/addcompany", auth, authorizeUser("Company_HR"), validation(addCompanySchema), addCompany);
companyRoutes.put("/updatecompany/:id", auth, authorizeUser("Company_HR"), validation(updateCompanySchema), updateCompany);
companyRoutes.delete("/deletecompany/:id", auth, authorizeUser("Company_HR"), validation(getCompanyByIdSchema), deleteCompany);
companyRoutes.use("/:id/jobs", auth, authorizeUser("Company_HR"), validation(getCompanyByIdSchema),jobRoutes);
companyRoutes.get("/searchcompany/:name", auth, authorizeUser(["Company_HR", "User"]), validation(getCompanyByNameSchema), searchCompanyName);
companyRoutes.use("/:id/apps", auth, authorizeUser("Company_HR"), validation(getCompanyByIdSchema), appRoutes);


export default companyRoutes;