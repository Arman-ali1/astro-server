import {Router} from "express"
import {sendmail,} from "./../controllers/queryController.js"


const router = Router()


router.route("/OrderMailConfir").post(sendmail)

export default router;