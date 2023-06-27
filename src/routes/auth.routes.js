import { Router } from "express";
import User from "../models/User";
import * as authCtrl from '../controllers/auth.controller'
import * as verifySignup from '../middlewares/verifySignup'

const router = Router()

router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRoleExisted],authCtrl.signUp)

router.post('/signin',authCtrl.signIn)

export default router;