import {Router} from 'express'
import { registerUser } from '../controllers/userController.js'
import { upload } from '../middlewares/multerMiddleware.js'

const router =  Router()

// router.route("/register").post(registerUser)
router.post("/register", upload.fields([
    {name: "avator", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]) , registerUser)


export default router