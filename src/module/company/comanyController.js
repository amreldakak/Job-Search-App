import {handleError} from "../middleware/HandleAsyncError.js";
import companyModel from "../../../DB/model/company.model.js";
import applicationModel from "../../../DB/model/application.model.js";

/*
    get company data from company hr then add it to company collection(database)
*/
export const addCompany = handleError( async (req,res)=>{
    let {companyName,description,industry,address,numberOfEmployees,companyEmail} = req.body;
    let companyHR=req.userId;
    let add = await companyModel.insertMany({companyName,description,industry,address,numberOfEmployees,companyEmail,companyHR});
    res.json({message:"Done",add});
});

/*
    get company data that will be updated and get id, if id found get update with the new data else response with not found
*/
export const updateCompany = handleError( async(req,res)=>{

    let updatedCompany = await companyModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedCompany && res.json({message:"Done",updatedCompany});
    !updatedCompany && res.json({message:"Not Found"});
});

/*
get company id to delete it from database, if id found get delete company else response with not found
*/
export const deleteCompany = handleError( async(req,res)=>{
    let deleted = await companyModel.findByIdAndDelete(req.params.id);
    deleted && res.json({message:"Done",deleted});
    !deleted && res.json({message:"Not Found"});
});

// export const getCompanyData = handleError( async (req,res)=>{
//     let companyData = await companyModel.findById(req.params.id);
//     res.json({message:"Done",companyData});

//     //still need more logics
// });

/*
    get company name from req.params and find company with it else not found
*/
export const searchCompanyName = handleError( async (req,res)=>{
    let searchCompany = await companyModel.findOne({companyName:req.params.name});
    searchCompany && res.json({message:"Done",searchCompany});
    !searchCompany && res.json({message:"Not Found"});
});
