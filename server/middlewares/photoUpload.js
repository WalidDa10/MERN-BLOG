import path from "path"
import multer from "multer"
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


//Photo Storage 
const photoStorage = multer.diskStorage({
    destination: function (req, file, cb ) {
        cb(null, path.join(__dirname,"../images") )
    },

    filename: function (req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g,"-") + file.originalname )
        }else{
            cb(null, false);
        }    
    }
})


// Photo Upload Middelwears

const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        }else{
            cb({message:"Unspported file format"}, false)
        }
    },
    limits: {fileSize: 1024 * 1024 * 3} // 3 megabyte
})

export {
    photoUpload
}