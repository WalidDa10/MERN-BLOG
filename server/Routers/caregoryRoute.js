import express from "express"

import { CreatCategoryCrtl, DeleteCategoryCrtl, GetAllCategoriesCrtl } from "../controllers/categoriesController.js";

import { verifyAdmin, verifyMiddleare, verifyOnlyUser, verifyTokenAndAuthorization  } from "../middlewares/verifyToken.js";
import valdateObject_Id from "../middlewares/valdateObject_Id.js";

const router = express.Router()


// /api/category
router.route('/')
.post(verifyTokenAndAuthorization, CreatCategoryCrtl)
.get(GetAllCategoriesCrtl)



// /api/category/:id
router.route('/:id')
.delete(valdateObject_Id ,verifyTokenAndAuthorization, DeleteCategoryCrtl)

export default router;
