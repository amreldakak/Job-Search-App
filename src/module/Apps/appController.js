import applicationModel from "../../../DB/model/application.model.js";
import {handleError} from "../middleware/HandleAsyncError.js";



/*
get Applications for certain jobs 
*/
export const getAppsForCompany = handleError( async (req,res)=>{
    let getApps = await applicationModel.find()
    .populate({path: 'jobId', select: '-jobDescription -softSkills'})
    .populate({path: 'userId', select: '-_id -password '});
  let companyApps = getApps.filter(ele =>ele.jobId && ele.jobId.companyId == req.params.id);
    if (companyApps.length > 0) {
        res.json({ message: "Done", companyApps });
      } else {
        res.json({ message: "Not Found" });
      }
});