import { Router } from "express";
//import router from "./movies.routes";
import * as usrCtrl from "../controllers/user.controller";
import * as authJwt from "../middlewares/authJwt";
import * as verifySignUp from "../middlewares/verifySignup";

const router = Router();

router.post("/", [authJwt.verifyToken,
                 authJwt.isAdmin,
                 //authJwt.isModerator,
                 verifySignUp.checkRoleExisted], usrCtrl.createUser);
export default router;
