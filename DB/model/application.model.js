import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: "Job", required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", required: true
    },
    userTechSkills: [{ type: String }],
    userSoftSkills: [{ type: String }],
    userResume: { type: String },
},{
    timestamps:true,
});

const applicationModel = mongoose.model("Application", applicationSchema);

export default applicationModel;