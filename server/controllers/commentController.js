import  asyncHandler from "express-async-handler"

import Comment, { validateCreatComment, validateUpdateComment } from "../models/Comment.js"
import User from "../models/User.js"



/**----------------------------------------------------
 * @description Create Comment 
 * @route /api/comment
 * @method Post
 * @access private (Only user himself)
 -----------------------------------------------------*/

 export const CreatCommentCrtl = asyncHandler(async (req , res) => {
    // Validation 
    const {error} = validateCreatComment(req.body)
    if (error) { return res.status(400).json({message:error.details[0].message}) }

    const profile = await User.findById(req.user.id)
    
    const comment = await Comment.create({
        postId: req.body.postId, 
        text:req.body.text,
        user: req.user.id,
        username: profile.username
    })

    res.status(201).json(comment)
 } )


 /**----------------------------------------------------
 * @description Get All Comment 
 * @route /api/comment
 * @method GET
 * @access private (Only Admin)
 -----------------------------------------------------*/

 export const GetAllCommentsCrtl = asyncHandler(async (req , res) => {
    const comments = await Comment.find().populate('user')
    res.status(200).json(comments)
 } )


 /**----------------------------------------------------
 * @description Delete Comment 
 * @route /api/comment/:id
 * @method DELETE
 * @access private (Only Admin or owner of the comment )
 -----------------------------------------------------*/

 export const DeleteCommentCrtl = asyncHandler(async (req , res) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment)  return res.status(404).json({message: "comment not found!"})
    if (req.user.isAdmin || req.user.id === comment.user.toString() ) {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message: " The comment has been deleted "})
    }else{
        res.status(203).json({message: "Access denied, not allowed "})
    }
 } )


 /**----------------------------------------------------
 * @description Update Comment 
 * @route /api/comment/:id
 * @method PUT
 * @access private (Only user himself)
 -----------------------------------------------------*/

 export const UpdateCommentCrtl = asyncHandler(async (req , res) => {
    // Validation 
    const {error} = validateUpdateComment(req.body)
    if (error) { return res.status(400).json({message:error.details[0].message}) }

    const comment = await Comment.findById(req.params.id)
    if (!comment)  return res.status(404).json({message: "comment not found!"})

    if (req.user.id !== comment.user.toString()) {
        return res.status(200).json({ message: "Access denied, only user Himself"})
    }

    const UpdatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        text: req.body.text, 
        updateAt: new Date()
    })
    
    res.status(201).json(UpdatedComment)
 } )