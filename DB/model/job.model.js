import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        enum: ["onsite", "remotely", "hybrid"]
    },
    workingTime: {
        type: String,
        enum: ["part-time", "full-time"]
    },
    seniorityLevel: {
        type: String,
        enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"]
    },
    jobDescription: {
        type: String
    },
    technicalSkills: [{
        type: String
    }],
    softSkills: [{
        type: String
    }],
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: "Company"
    }
},{
    timestamps:true,
});

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;