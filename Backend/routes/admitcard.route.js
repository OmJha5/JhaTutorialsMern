import express from "express"
const router = express.Router();
import { singleUpload } from "../multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createAdmitCard, deleteAdmitCard, editAdmitCard, getAllAdmitCard, getCurrAdmitCard, getTop5Post } from "../controller/admitcard.controller.js";

router.route("/create").post(isAuthenticated , singleUpload , createAdmitCard);
router.route("/get").get(getAllAdmitCard);
router.route("/delete/:id").delete(deleteAdmitCard);
router.route("/get/:id").get(getCurrAdmitCard);
router.route("/getTop5Post").get(getTop5Post);
router.route("/edit/:id").post(singleUpload , editAdmitCard)

export default router