import  asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
import fs from "fs"
    
import User, { validateUpdateUser } from "../models/User.js"
import Post, {validateCreatePost, validateUpdatePost} from "../models/Post.js"
import { cloudInaryRemoveImage, cloudInaryUploadImage } from "../utils/cloudinary.js"
import { url } from "inspector"
import Comment from "../models/Comment.js"


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config()

/**----------------------------------------------------
 * @description Create New Post
 * @route /api/posts
 * @method Post
 * @access private (Only user himself)
 -----------------------------------------------------*/

export const creatPostCtrl = asyncHandler(async (req, res) => {
    // 1.Validation for image
        if (!req.file) {
            return res.status(400).json({
                message: "No image Provided"
             })
        }
    // 2.Validation Data
        const {error} = validateCreatePost(req.body)
        if (error) { return res.status(400).json({message:error.details[0].message}) }
    // 3. Upload image 
        const pathImage = path.join(__dirname, `../images/${req.file.filename}`)
        const result = await cloudInaryUploadImage(pathImage)
        
    // 4. Create Post and save it to DB
    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user:req.user.id,
        image: {
            url:result.secure_url,
            publicId: result.public_id
        }
    })
    post.save()
    // 5. Send Response to the client
        res.status(200).json(post)
    // .6 Remove the image from the server
        fs.unlinkSync(pathImage) 
})



/**----------------------------------------------------
 * @description Get All Post
 * @route /api/posts
 * @method GET
 * @access public 
 -----------------------------------------------------*/

export const getAllPostCtrl = asyncHandler(async (req, res) => {
    const  POST_PRE_PAGE = 4
    const {pageNumber, category } = req.query
    let posts;

    if (pageNumber) {
        posts = await Post.find()
        .skip( (pageNumber-1) * POST_PRE_PAGE )
            .limit(POST_PRE_PAGE)
            .sort({createdAt: -1})
            .populate('user', ["-password"] )
    }else if (category) {
        posts = await Post.find({ category})
            .sort({createdAt: -1})
            .populate('user', ["-password"] )
    }else{
        posts = await Post.find().sort({createdAt: -1})
            .populate('user', ["-password"] )
    }
    res.status(200).json(posts)
})




/**----------------------------------------------------
 * @description Get Single Post
 * @route /api/posts/:id
 * @method GET
 * @access public 
 -----------------------------------------------------*/

export const getSinglePostCtrl = asyncHandler(async (req, res) => {
     const post = await Post.findById(req.params.id)
        .populate('user', ["-password"] )
        .populate('comments')
     if (!post) {
        return res.status(404).json({message: 'Post Not Found'})
     }
     res.status(200).json(post)
})



/**----------------------------------------------------
 * @description Get Posts Count
 * @route /api/posts/count
 * @method GET
 * @access public 
 -----------------------------------------------------*/

export const getPostCountCtrl = asyncHandler(async (req, res) => {
     const count = await Post.countDocuments()
     res.status(200).json(count)
})


/**----------------------------------------------------
 * @description Delete Posts 
 * @route /api/posts/count
 * @method Delete
 * @access private (only user himself or the admin) 
 -----------------------------------------------------*/

export const deletePostCtrl = asyncHandler(async (req, res) => {
     const post = await Post.findById(req.params.id)
     if (!post) {
        return res.status(404).json({message: 'Post Not Found'})
     }
     if ( req.user.isAdmin || req.user.id === post.user.toString()) { // _id
        await Post.findByIdAndDelete(req.params.id)
        await cloudInaryRemoveImage(post.image.publicId)
        // Delete all comments that belong to this post
        await Comment.deleteMany({postId: post._id})
        res.status(200).json({
            message: "Post has been Deleted Successfuly",
            PostId: post._id
        })
     }else{
        res.status(400).json({
            message: 'access denied, forbidden'
        })
     }
})

/**----------------------------------------------------
 * @description Update Posts 
 * @route /api/posts/:id
 * @method PUT
 * @access private (only user himself) 
 -----------------------------------------------------*/

export const updatePostCtrl = asyncHandler(async (req, res) => {
     // 1. Validation 
     const {error} = validateUpdatePost(req.body)
    if (error) { return res.status(400).json({message:error.details[0].message})}

    // 2. Check the post
    const post = await Post.findById(req.params.id)
     if (!post) { return res.status(404).json({message: 'Post Not Found'})}

    // 3. check if this post  belong to logged  in user  
     if (req.user.id !== post.user.toString() ) {
        return res.status(403).json({message: "Access denied, you are not allowed"})
     }

    //@TODO 4. check the file and update Photo of the post
    // if (req.file) {
    //     const pathImage = path.join(__dirname, `../images/${req.file.filename}`)
    //     const result = await cloudInaryUploadImage(pathImage)
    //     //  Delete the old profile photo if exist 
    //         if (post.image.publicId !== null) {
    //             await cloudInaryRemoveImage(post.image.publicId) 
    //         }
    //         //Change the Post Photo in the DB
    //         post.image = {
    //                 url: result.secure_url,
    //                 publicId: result.public_id
    //             }
    //         // const update = await Post.findByIdAndUpdate(req.params.id, {
    //         // $set:{
    //         //     image: {
    //         //         url: result.secure_url ,
    //         //         publicId: result.public_id
    //         //     }
    //         // }
    //         // }, {new : true}).populate("user" , ["-password"])

    //         fs.unlink(pathImage)
    // }
    
    // 5. Update the Post 
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set:{
                title : req.body.title,
                description  : req.body.description,
                category : req.body.category
            }
        }, {new : true}).populate("user" , ["-password"])

        res.status(200).json(updatedPost)
})



/**----------------------------------------------------
 * @description Update Image Post 
 * @route /api/posts/upload-image/:id
 * @method PUT
 * @access private (only user himself) 
 -----------------------------------------------------*/

export const updateImagePostCtrl = asyncHandler(async (req, res) => {
    // 1. Validation 
    if (!req.file) {return res.status(400).json({message:"No Image Provided"})}

    // 2. Check the post
    const post = await Post.findById(req.params.id)
     if (!post) { return res.status(404).json({message: 'Post Not Found'})}

    // 3. check if this post  belong to logged  in user  
    if (req.user.id !== post.user.toString() ) {
    return res.status(403).json({message: "Access denied, you are not allowed"})
    }
    
    // 4. Update the image Post 
    await cloudInaryRemoveImage(post.image.publicId)

    const pathImage = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudInaryUploadImage(pathImage)

    const updatedImagePost = await Post.findByIdAndUpdate(req.params.id, {
            $set:{
                image:{
                    url: result.secure_url,
                    publicId: result.public_id
                }
                
            }
        }, {new : true})

        res.status(200).json(updatedImagePost)

    // 6. Remove image from server
    fs.unlinkSync(pathImage)
})



/**----------------------------------------------------
 * @description Toggle Like 
 * @route /api/posts/like/:id
 * @method PUT
 * @access private (only logged in user) 
 -----------------------------------------------------*/

export const ToggleLikeCtrl = asyncHandler(async (req, res) => {
    const ID_loggedInUser = req.user.id
    const {id: PostId} = req.params
    // 1. Check the post
    let post = await Post.findById(PostId)
     if (!post) { return res.status(404).json({message: 'Post Not Found'})}
    const isPostAlreadyLiked = post.likes.find(
         (user) => user.toString() === ID_loggedInUser) 

        
    if (isPostAlreadyLiked) {
        post = await Post.findByIdAndUpdate(PostId,
            {
                $pull: {likes: ID_loggedInUser}
            }, {new: true}
        )
    }else{
        post = await Post.findByIdAndUpdate(PostId,
            {
                $push: {likes: ID_loggedInUser}
            }, {new: true}
        )
    }
    
    res.status(200).json(post)
    
})