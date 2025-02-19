import multer from "multer";

import {storage} from "./cloudConfig.js"
export const singleUpload = multer({storage}).single("file");