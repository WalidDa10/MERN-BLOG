import  asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
import fs from "fs"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
    
import User, { validateUpdateUser } from "../models/User.js"
import { cloudInaryRemoveImage, cloudInaryUploadImage, cloudInaryRemoveMultipleImage } from "../utils/cloudinary.js"
import { url } from "inspector"


dotenv.config()

/**----------------------------------------------------
 * @description Get All Users Profile
 * @route /api/users/profile
 * @method GET
 * @access private (Only admin)
 -----------------------------------------------------*/

export const getAllUserCtrl = asyncHandler(async (req, res) => {
 const users = await User.find().select("-password").populate('posts')
 res.status(200).json(users)
})


/**----------------------------------------------------
 * @description Get  User Profile
 * @route /api/users/profile/:id
 * @method GET
 * @access public 
 -----------------------------------------------------*/
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id).select("-password").populate('posts')
 if (!user) {
    return res.status(404).json({message: "User not found"})
 }
 res.status(200).json(user)
})




/**----------------------------------------------------
 * @description Update User Profile
 * @route /api/users/profile/:id
 * @method PUT
 * @access private (only user himself) 
 -----------------------------------------------------*/
export const updateUserProfileCtrl = asyncHandler(async (req, res) => {
    const {error} = validateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password,10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:{
            username : req.body.username,
            password  : req.body.password,
            bio : req.body.bio
        }
    }, {new : true}).select("-password")

    return res.status(200).json(updatedUser)
})



/**----------------------------------------------------
 * @description Get Users Count
 * @route /api/users/count
 * @method GET
 * @access private (Only admin)
 -----------------------------------------------------*/

export const getUserCountCtrl = asyncHandler(async (req, res) => {
 const count = await User.countDocuments()
 res.status(200).json(count)
})



/**----------------------------------------------------
 * @description Profile Photo Upload
 * @route /api/users/profile/profile-photo-upload
 * @method Post
 * @access private (Only logged in user)
 -----------------------------------------------------*/

export const profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({message: "NO File Provided"})
    }
    // 2. get the path to the image
    const pathImage = path.join(__dirname, `../images/${req.file.filename}`)
    // 3. Upload to cloudinary
    const result = await cloudInaryUploadImage(pathImage)

    // 4. Get the user form DB
    const user = await User.findById(req.user.id)

    // 5. Delete the old profile photo if exist 
    if (user.profilPhoto.publicId !== null) {
        const resultRemove = await cloudInaryRemoveImage(user.profilPhoto.publicId) 
    }
    
    // 6. Change the profilePhoto in the DB 
    user.profilPhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await user.save()
    // 7.
    res.status(200).json({ 
    message: "Successfuly",
    profilePhoto : {url: result.secure_url , publicId: result.public_id }
    })

    // 8. Remove the image from the server (folder)
    fs.unlinkSync(pathImage)
})



/**----------------------------------------------------
 * @description  Delete User Profile (Account)
 * @route /api/users/profile/:id
 * @method Delete
 * @access private (Only admin or user himself)
 -----------------------------------------------------*/


 export const DeleteUserProfile = asyncHandler( async (req, res) => {
    // 1. Get the user from DB
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({message: "User Not Found"})
    }
    //2. Get all posts from DB
    const posts = Post.find({user: user._id})
    //3. Get the public ids from the posts
    const PublicIds = posts?.map( (post)=>{ post.image.publicId} )
     
    //4. Delete all posts image from cloudinary that belong to this user 
    if (PublicIds?.length > 0) {
        await cloudInaryRemoveMultipleImage(PublicIds)
    }
    // 5. Delete the profile pictuer from cloudinary 
    await cloudInaryRemoveImage(user.profilPhoto.publicId)

    //6. Delete user posts & comments
    await Comment.deleteMany({user: user._id}) 
    await Post.deleteMany({user: user._id})
    

    // 7. Delete user himself 
    await User.findByIdAndDelete(req.params.id)
    // 8. Send response to the client 
    res.status(200).json({
        message: "the user profile has been Deleted"
    })
 } )