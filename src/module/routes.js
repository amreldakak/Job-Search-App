import companyRoutes from "./company/companyRoute.js";
import jobRoutes from "./jobs/jobRoutes.js";
import userRoutes from "./users/userRoute.js";


export const allRoutes = (app)=>{
    app.use("/api/v1/user",userRoutes);
    app.use("/api/v1/company",companyRoutes);
    app.use("/api/v1/job",jobRoutes);
}