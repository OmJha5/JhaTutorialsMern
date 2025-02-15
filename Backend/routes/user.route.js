import express from "express"
const router = express.Router();
import {login , checkuser , showallusers , createuser , deleteuser , updateuser} from "../controller/user.controller.js"

router.route("/login").post(login);
router.route("/checkuser").get(checkuser);
router.route("/showallusers").get(showallusers);
router.route("/create").post(createuser);
router.route("/delete/:id").delete(deleteuser);
router.route("/edit/:id").put(updateuser);

export default router