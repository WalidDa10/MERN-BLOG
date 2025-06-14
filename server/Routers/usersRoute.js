import express from "express"
import {DeleteUserProfile, getAllUserCtrl, getUserCountCtrl, getUserProfileCtrl, profilePhotoUploadCtrl, updateUserProfileCtrl } from "../controllers/userControllers.js"
import { verifyMiddleare ,verifyAdmin, verifyOnlyUser, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import valdateObject_Id from "../middlewares/valdateObject_Id.js";
import { photoUpload } from "../middlewares/photoUpload.js";


const router = express.Router()

//api/users/profile
router.get('/profile',verifyAdmin ,getAllUserCtrl)


//api/users/count
router.get('/count',verifyAdmin ,getUserCountCtrl)


//api/users/profile/:id
router.get('/profile/:id',valdateObject_Id, getUserProfileCtrl)
router.put('/profile/:id',valdateObject_Id, verifyOnlyUser ,updateUserProfileCtrl)
router.delete('/profile/:id', valdateObject_Id,verifyTokenAndAuthorization,DeleteUserProfile)

//api/users/profile/profile-photo-upload
router.post('/profile/profile-photo-upload',verifyMiddleare, photoUpload.single('image') , profilePhotoUploadCtrl)





export default router;

