import express from "express"
const router = express.Router();
import {login , checkuser , showallusers , createuser , deleteuser , updateuser} from "../controller/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.route("/login").post(login);
router.route("/checkuser").get(checkuser);
router.route("/showallusers").get(isAuthenticated , showallusers);
router.route("/create").post(isAuthenticated , createuser);
router.route("/delete/:id").delete(isAuthenticated , deleteuser);
router.route("/edit/:id").put(isAuthenticated , updateuser);

export default router