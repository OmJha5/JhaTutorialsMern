import express from "express"
const router = express.Router();
import {createPost} from "../controller/post.controller.js"
import { singleUpload } from "../multer.js";

router.route("/create").post(singleUpload , createPost);

export default router