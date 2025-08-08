import { Router} from "express"
import Controller from '../Controllers/Auth.Controller.js';
import authMiddleware from "../Middleware/Auth.Middleware.js";
import upload from "../Middleware/Multer.Middleware.js";
const {RegisterController, LoginController,userInfoController, LogoutController } = Controller;

const router = Router()

const uploadFile=upload.fields([
    {
        name:"profilePhoto",
        maxCount:1
    }
])

router.route('/login').post(LoginController)
router.route('/register').post(uploadFile,RegisterController);
router.route('/userInfo').get(authMiddleware,userInfoController);
router.route('/logout').post(authMiddleware, LogoutController);

export default router;