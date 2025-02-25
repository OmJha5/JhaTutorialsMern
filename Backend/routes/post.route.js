import express from "express"
const router = express.Router();
import {createPost, deletePost, editPost, getAllPosts, getPostById} from "../controller/post.controller.js"
import { singleUpload } from "../multer.js";

router.route("/create").post(singleUpload , createPost);
router.route("/get").get(getAllPosts);
router.route("/delete/:id").delete(deletePost);
router.route("/get/:id").get(getPostById)
router.route("/edit/:id").post(singleUpload , editPost);

export default router