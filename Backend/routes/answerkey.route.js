import express from "express"
const router = express.Router();
import { singleUpload } from "../multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createAnswerKey, deleteAnswerKey, editAnswerKey, getAllAnswerKey, getCurrAnswerKey, getTop5Post } from "../controller/answerkey.controller.js";

router.route("/create").post(isAuthenticated , singleUpload , createAnswerKey);
router.route("/get").get(getAllAnswerKey);
router.route("/delete/:id").delete(deleteAnswerKey);
router.route("/get/:id").get(getCurrAnswerKey);
router.route("/getTop5Post").get(getTop5Post);
router.route("/edit/:id").post(singleUpload , editAnswerKey)

export default router