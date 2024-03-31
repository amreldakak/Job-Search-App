import {AppError} from "./../../../utils/appError.js"


export const validation = (schema)=>{
    return (req,res,next) =>{

        let filters={};
        if(req.file){
            filters={userResume: req.file,...req.body, ...req.params, ...req.query}
        }else if(req.files){
            filters={...req.files, ...req.body, ...req.params, ...req.query}
        } else{
            filters={...req.body, ...req.params, ...req.query}
        }

        let {error} = schema.validate(   filters , {abortEarly:false});

        if(!error){
            next()
        }else{
            let errorList=[];
            error.details.forEach(ele => {
                errorList.push(ele.message);
            });
            next(new AppError(errorList,401))
        }
    }

}