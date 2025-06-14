import express from "express"
import {DeleteUserProfile, getAllUserCtrl, getUserCountCtrl, getUserProfileCtrl, profilePhotoUploadCtrl, updateUserProfileCtrl } from "../controllers/userControllers.js"
import { verifyMiddleare ,verifyAdmin, verifyOnlyUser, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import valdateObject_Id from "../middlewares/valdateObject_Id.js";
import { photoUpload } from "../middlewares/photoUpload.js";
import { creatPostCtrl, deletePostCtrl, getAllPostCtrl, getPostCountCtrl, getSinglePostCtrl, ToggleLikeCtrl, updateImagePostCtrl, updatePostCtrl } from "../controllers/postsController.js";



const router = express.Router()

//api/posts
router.post('/posts',verifyMiddleare, photoUpload.single("image") ,creatPostCtrl)

//api/posts
router.get('/posts', getAllPostCtrl )

//api/posts/count
router.get('/posts/count', getPostCountCtrl) 

//api/posts/:id
router.get('/posts/:id', valdateObject_Id,getSinglePostCtrl )


//api/posts/:id
router.delete('/posts/:id', valdateObject_Id, verifyMiddleare,deletePostCtrl )

//api/posts/:id
router.put('/posts/:id', valdateObject_Id,photoUpload.single('image') ,verifyMiddleare,updatePostCtrl )

// /api/posts/upload-image/:id
router.put('/posts/upload-image/:id', valdateObject_Id, verifyMiddleare,photoUpload.single('image') ,updateImagePostCtrl )

// /api/posts/like/:id
router.put('/posts/like/:id', valdateObject_Id, verifyMiddleare, ToggleLikeCtrl )



   

export default router;

