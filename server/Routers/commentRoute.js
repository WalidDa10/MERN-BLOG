import express from "express"

import { CreatCommentCrtl, DeleteCommentCrtl, GetAllCommentsCrtl, UpdateCommentCrtl } from "../controllers/commentController.js"
import { verifyAdmin, verifyMiddleare, verifyOnlyUser, verifyTokenAndAuthorization  } from "../middlewares/verifyToken.js";
import valdateObject_Id from "../middlewares/valdateObject_Id.js";

const router = express.Router()

// /api/comment
router.route('/comment')
.post(verifyMiddleare, CreatCommentCrtl)
.get(verifyAdmin,GetAllCommentsCrtl)

// /api/comment/:id
router.route('/comment/:id')
.delete(valdateObject_Id ,verifyMiddleare, DeleteCommentCrtl)
.put( valdateObject_Id,verifyMiddleare, UpdateCommentCrtl )

export default router;