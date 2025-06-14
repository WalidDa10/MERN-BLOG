import express from "express"
import { RigsterUserCtrl,LoginUserCtrl } from "../controllers/authController.js"


const router = express.Router()

// api/auth/register
router.post('/register',RigsterUserCtrl)


// api/auth/login
router.post('/login',LoginUserCtrl)

export default router;