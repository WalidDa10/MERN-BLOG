import mongoose from "mongoose";
import Joi from "joi";

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
})

// Validate Creat Comment  
export const validateCreatComment = (obj)=>{
    const schema = Joi.object({
            postId: Joi.string().required(),
            text: Joi.string().trim().required()
                })
        return schema.validate(obj)
}

// Validate Update Comment  
export const validateUpdateComment = (obj)=>{
    const schema = Joi.object({
            text: Joi.string().trim().required()
                })
        return schema.validate(obj)
}

export default mongoose.model('Comment', commentSchema);