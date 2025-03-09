import express from "express"
const router = express.Router();
import {createPost, deletePost, editPost, getAllPosts, getAllShortPostInfo, gethandpickedposts, getPostById, getPostByQuery, getTop5GraduationAndPGPost, getTop5TwelthPosts, getTop9Post} from "../controller/post.controller.js"
import { singleUpload } from "../multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.route("/create").post(isAuthenticated , singleUpload , createPost);
router.route("/get").get(getAllPosts);
router.route("/delete/:id").delete(isAuthenticated , deletePost);
router.route("/get/:id").get(getPostById)
router.route("/browse").get(getPostByQuery)
router.route("/gettop9").get(getTop9Post);
router.route("/getTop5TwelthPosts").get(getTop5TwelthPosts);
router.route("/getTop5GraduationAndPgPost").get(getTop5GraduationAndPGPost)
router.route("/edit/:id").post(isAuthenticated , singleUpload , editPost);
router.route("/gethandpickedposts").get(gethandpickedposts);
router.route("/getAllShortPostInfo/:who").get(getAllShortPostInfo); // Who means admit card or answerkey uske basis pe we can fetch posts.

export default router