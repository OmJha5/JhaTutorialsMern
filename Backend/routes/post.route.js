import express from "express"
const router = express.Router();
import {createPost, deletePost, editPost, getAllPosts, getPostById, getPostByQuery, getTop5GraduationAndPGPost, getTop5TwelthPosts, getTop9Post} from "../controller/post.controller.js"
import { singleUpload } from "../multer.js";

router.route("/create").post(singleUpload , createPost);
router.route("/get").get(getAllPosts);
router.route("/delete/:id").delete(deletePost);
router.route("/get/:id").get(getPostById)
router.route("/browse").get(getPostByQuery)
router.route("/gettop9").get(getTop9Post);
router.route("/getTop5TwelthPosts").get(getTop5TwelthPosts);
router.route("/getTop5GraduationAndPgPost").get(getTop5GraduationAndPGPost)
router.route("/edit/:id").post(singleUpload , editPost);

export default router