import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
         type: String,
         unique: true,
         required: true 
        },
    description: { 
         type: String,
         minLength:[3,"title is too short"],
         maxLength:[300,"title is too Long"]
        },
    industry: { type: String },
    address: { type: String },
    numberOfEmployees: { type: String },
    companyEmail: { 
        type: String,
        unique: true,
        required: true
    },
    companyHR: { 
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
},{
    timestamps:true,
});

const companyModel = mongoose.model("Company", companySchema);

export default companyModel;