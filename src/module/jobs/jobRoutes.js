import express from "express";
import auth from "../middleware/auth.js";
import { validation } from "../middleware/validation.js";
import authorizeUser from "../middleware/authorize.js";
import { addJob, applyJob, deleteJob, getJobData, getJobsForCompany, matchfilter, updateJob } from "./jobController.js";
import { addJobSchema, applySchema, getByIdSchema, getCompanyByNameSchema, jobFilterSchema, updateJobSchema } from "./jobValidation.js";
import { uploadSingle } from "../../../utils/fileUpload.js";

const jobRoutes = express.Router({mergeParams:true});

jobRoutes.post("/add", auth, authorizeUser("Company_HR"), validation(addJobSchema), addJob);
jobRoutes.put("/update/:id", auth, authorizeUser("Company_HR"), validation(updateJobSchema), updateJob);
jobRoutes.delete("/delete/:id", auth, authorizeUser("Company_HR"), validation(getByIdSchema), deleteJob);
jobRoutes.get("/", auth, authorizeUser(["Company_HR", "User"]),getJobData);
jobRoutes.get("/getcompanyjobs", auth, authorizeUser(["Company_HR", "User"]), validation(getCompanyByNameSchema), getJobsForCompany);
jobRoutes.get("/filterjobs/", auth, authorizeUser(["Company_HR", "User"]), validation(jobFilterSchema), matchfilter);
jobRoutes.post("/apply", uploadSingle('pdf'), auth, authorizeUser("User"), validation(applySchema), applyJob);


export default jobRoutes;