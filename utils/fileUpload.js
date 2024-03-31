import {AppError} from "./appError.js"
import multer from "multer"

 const uploadFile = ()=>{
    const storage = multer.diskStorage({});

      function fileFilter (req, file, cb) {

        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
        
        if(file.mimetype.startsWith("application")){
            // To accept the file pass `true`, like so:
            cb(null, true)
        }else{
            // To reject this file pass `false`, like so:
            cb(new AppError("invalid pdf type",401), false)
        }
        
      }
      
      const upload = multer({ storage: storage, fileFilter})
      return upload;
 }

 export const uploadSingle = (fieldName) => uploadFile().single(fieldName);
 export const uploadArray = (fieldName) => uploadFile().array(fieldName,10);
 export const uploadFields = (fieldsName) => uploadFile().fields(fieldsName);