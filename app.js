import 'dotenv/config'
import express from "express";
import conn from "./DB/connection.js";
import { allRoutes } from './src/module/routes.js';
import { AppError } from './utils/appError.js';
import cors from "cors";

conn;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"))

allRoutes(app);


app.use("*",(req,res,next)=>{
  next(new AppError("URL not found", 404))
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).json({message: err.message, stack:err.stack})
  })




app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is Running ...");
});