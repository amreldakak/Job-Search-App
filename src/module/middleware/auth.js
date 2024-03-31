import  jwt  from "jsonwebtoken";
import { AppError } from "../../../utils/appError.js";

const auth = (req,res,next)=>{
    let token = req.header("token");
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            next(new AppError(err,401));
        }else {
            req.userId = decoded.userId;
            req.state = decoded.state;
            req.role=decoded.role;
            next();
        }
    })
}

export default auth;