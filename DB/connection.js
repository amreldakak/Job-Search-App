import mongoose from "mongoose";

const conn = mongoose.connect(process.env.CONNECTIONURL).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
});

export default conn;