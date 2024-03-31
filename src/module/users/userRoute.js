import express from "express";
import { signUpSchema, signInSchema, updateUserSchema, getUserByIdSchema, updatePasswordSchema, getAllAccountsRecoveryMail, emailSchema, newPasswordOtpSchema } from "./userValidation.js";
import {validation} from "./../middleware/validation.js"
import { deleteUser, forgetPassword, getAnyUser, getUserData, newPasswordFromOtp, sameRecoveryEmail, signIn, signUp, update, updatePassword } from "./userController.js";
import auth from "../middleware/auth.js";

const userRoutes = express.Router({mergeParams:true});


userRoutes.post("/signup",validation(signUpSchema),signUp);
userRoutes.post("/signin",validation(signInSchema),signIn);
userRoutes.patch("/update",auth,validation(updateUserSchema),update);
userRoutes.delete("/delete",auth,deleteUser);
userRoutes.get("/myData",auth, getUserData);
userRoutes.put("/updatepass",auth,validation(updatePasswordSchema),updatePassword);
userRoutes.patch("/forgetpassword",validation(emailSchema),forgetPassword);
userRoutes.patch("/newpasswordusingotp",validation(newPasswordOtpSchema),newPasswordFromOtp)
userRoutes.post("/samerecoveryemail",validation(getAllAccountsRecoveryMail),sameRecoveryEmail);
userRoutes.route("/:id")
.get(validation(getUserByIdSchema),getAnyUser)



export default userRoutes;