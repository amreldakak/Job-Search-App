import userModel from "../../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { handleError } from "../middleware/HandleAsyncError.js";

/*
  get all user data check if email or mobile already signed up then encrypt password then save all user data in User collection
*/
export const signUp =handleError( async (req,res)=>{

    const { firstname, lastname, email, password, recoveryEmail, DOB, mobilenumber, role } = req.body;

      const existingUser = await userModel.findOne({ $or: [{ email }, { mobilenumber }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Email or mobileNumber already exists' });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      let add = new userModel({
        firstname,
        lastname,
        username: firstname + lastname,
        email,
        password: hashPassword,
        recoveryEmail,
        DOB,
        mobilenumber,
        role,
      });
    let addedUser = await add.save();

    res.json({message:"Done",addedUser});
});

/*
  get sign in data then find mobile or email if found compare password if password match change status to online
   and generate token contains user id, status,role then log in, if password didn't match response with wrong password
   if email or mobile not found response register first.
*/
export const signIn = handleError( async (req,res)=>{

        let {email,mobilenumber,password} = req.body;
    
        let founded = await userModel.findOne({$or: [{ email }, { mobilenumber }]});
        if(founded) {
           let match = bcrypt.compareSync(password,founded.password);
           if(match){
            founded.status = 'online';
            let token = jwt.sign({userId:founded._id,state:founded.status,role:founded.role},process.env.SECRET_KEY,{expiresIn:'50h'});
            await founded.save();
            res.json({message:"Done",token});
           }
           else{
                res.json({message:"Wrong Password"});
                
            }
        
        } else {
            res.json({message:"Register First"});
    
        }
});

/*
  get user data to be updated then find user by id check user and their status then check email and mobile number if used before,
  if not save data and response with done
*/
export const update = handleError( async (req,res)=>{
    let {email,mobilenumber,recoveryEmail,DOB,lastname,firstname}=req.body;

    let user = await userModel.findById(req.userId);

    if(user && req.state ==  "online"){
        

        if (email && email !== user.email ){ 
            let checkEmail = await userModel.findOne({email});
            if(checkEmail){
                return res.json({message:"email is already exists"});
            }
        }

        if(mobilenumber && mobilenumber !== user.mobilenumber){
            let checkNumber = await userModel.findOne({mobilenumber});
            if(checkNumber){
                return res.json({message:"mobile number is already exists"});
            }
        }

        user.email = email || user.email;
        user.mobilenumber = mobilenumber || user.mobilenumber;
        user.recoveryEmail = recoveryEmail || user.recoveryEmail;
        user.DOB = DOB || user.DOB;
        user.lastname = lastname || user.lastname;
        user.firstname = firstname || user.firstname;
        user.username = firstname + lastname || user.username;

        let updatedUser = await user.save();

        res.json({message:"Done",updatedUser});
    }
});

/*
  if user status online find user if found delete else response with something went wrong
*/
export const deleteUser = handleError( async(req,res) =>{

    if(req.state == "online"){
        let user = await userModel.findById(req.userId);
        if (user){
            let deletedUser = await userModel.findByIdAndDelete(user._id);
            res.json({message:"Done",deletedUser});
        }
    }
    else{
        res.json({message:"something went wrong"});
    }
});

/*
  find user if found response user data else something went wrong
*/
export const getUserData = handleError( async (req,res) => {
    
        let user = await userModel.findById(req.userId);
        if (user){
            res.json({message:"Done",user});
        } else {
            res.json({message:"something went wrong"});
        }
});

/*
  set id as req.params find user by id if found response with data else user not found
*/
export const getAnyUser = handleError( async (req,res)=>{
    let {id} = req.params;
    let theUser = await userModel.findById(id);
    theUser && res.json({message:"Done",theUser});
    !theUser && res.json({message:"User not Found"});
});

/*
  get current and new password then find user if found compare current pass with stored one if match encrypt new pass and update
  if not match response Current Password isn't correct
*/
export const updatePassword = handleError( async (req,res)=>{
    let {cPassword,nPassword}=req.body;

    let user = await userModel.findById(req.userId);

    if(user){
        let match = bcrypt.compareSync(cPassword,user.password);
        if(match){
            let hashNewPass = bcrypt.hashSync(nPassword,Number(process.env.ROUND));
            let updated = await userModel.findByIdAndUpdate({_id:user._id},{password:hashNewPass});
            updated && res.json({message:"Done",updated});
        }
        res.json({message:"Current Password isn't correct"});
    }
});

/*
  get email then generate otp find user and update otp  else email not found
*/
export const forgetPassword = handleError( async (req,res,next)=>{
        
          const { email } = req.body;
    
          // Generate a random OTP
          const otp = otpGenerator.generate(Number(process.env.OTPNUMB), {upperCase:false,specialChars:false,alphabets:false});
    
          // Find the user using email and update the OTP
          const user = await userModel.findOneAndUpdate({email},{otp},{new:true});

          // If user found successfully response with OTP 
          user && res.json({ message: "OTP generated successfully", otp }); 
          
          !user && res.json({ message: "Email not found"}); 
            
          


          
});

/*
  get email and otp and new pass, find user with email and otp , if found change otp to "", and encrypt password
  and save new password else wrong otp
*/
export const newPasswordFromOtp = handleError( async (req,res)=>{
    let {email,otp,nPassword}=req.body;

    let user = await userModel.findOne({email,otp});

    if(user){
            let otp = "";
            let hashNewPass = bcrypt.hashSync(nPassword,Number(process.env.ROUND));
            let updated = await userModel.findOneAndUpdate({email:user.email},{password:hashNewPass,otp},{new:true});
            res.json({message:"Done",updated});
    }
        !user && res.json({message:"Wrong OTP"});
});

/*
  search for all users with same recover email if found response data else no user found
*/
export const sameRecoveryEmail = handleError( async (req,res)=>{
    let {recoveryEmail} = req.body;
    let all = await userModel.find({recoveryEmail});
    all && res.json({message:"Done",all});
    !all && res.json({message:"No User Found"});
});