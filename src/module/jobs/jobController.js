import {handleError} from "../middleware/HandleAsyncError.js";
import jobModel from "../../../DB/model/job.model.js";
import {v2 as cloudinary} from 'cloudinary';
import applicationModel from "../../../DB/model/application.model.js";
cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET, 
  });
  

/*
  get all data for job document and companyhr id then add all into mongdb as document
*/
export const addJob = handleError( async (req,res)=>{
    let {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,companyId} = req.body;
    let addedBy=req.userId;
    let add = await jobModel.insertMany({jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy,companyId});
    res.json({message:"Done",add});
});

/*
  let all data for job document to be updated  then add update it's document in mongdb else response with job not found 
*/
export const updateJob = handleError( async(req,res)=>{

    let updatedJob = await jobModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedJob && res.json({message:"Done",updatedJob});
    !updatedJob && res.json({message:"Not Found"});
});

/*
  get job id from req.parms if found delete else response with job not found
*/
export const deleteJob = handleError( async(req,res)=>{
    let deleted = await jobModel.findByIdAndDelete(req.params.id);
    deleted && res.json({message:"Done",deleted});
    !deleted && res.json({message:"Not Found"});
});

/*
  get job data,filter sees if there is req.params to get all jobs that related to a specific company if found return all their jobs
  (this filter for merge params),
  if there is no req.params return all jobs with all companies data
*/
export const getJobData = handleError( async (req,res)=>{
    let filter={};
    if(req.params.id){
        filter.companyId=req.params.id;
    }
    let companyData = await jobModel.find(filter).populate("companyId");
    res.json({message:"Done",companyData});

});

/*
    search for jobs of certian company using req.query as shown in filter function then if found response with data
     else response not found
*/
export const getJobsForCompany = handleError( async (req,res)=>{
    let searchCompany = await jobModel.find().populate("companyId");
    let company = searchCompany.filter(ele => ele.companyId && ele.companyId.companyName === req.query.companyName);
    company && res.json({message:"Done",company});
    !company && res.json({message:"Not Found"});
});

/*
  filter search get data from user and if match stored data response with data else response with not found
*/
export const matchfilter = handleError( async (req,res)=>{
    let matchSearch = await jobModel.find(req.body);
    matchSearch && res.json({message:"Done",matchSearch});
    !matchSearch && res.json({message:"Not Found"});
});

/*
  apply for job gets user id from auth middleware then upload user resume on cloudinary then store secure url in userResume field
  then save in application collection
*/
export const applyJob = handleError( async (req,res)=>{

    req.body.userId=req.userId;
    cloudinary.uploader.upload(req.file.path,
    { public_id: req.file.originalname }, 
    async function(error, result) {
        if(req.file){
            req.body.userResume= result.secure_url;
        let add = new applicationModel(req.body);
        let added = await add.save();
        res.json({message:"Done",added});
        }
        
    });
    
});