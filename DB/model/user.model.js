import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  recoveryEmail: { type: String },
  DOB: { type: Date, required: true },
  mobilenumber: { type: String, unique: true },
  otp: { type: String, default:""},
  role: { type: String, enum: ["User", "Company_HR"], required: true },
  status: { type: String, enum: ["online", "offline"], default: "offline" },
},{
    timestamps:true,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;