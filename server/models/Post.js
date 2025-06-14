import mongoose from "mongoose";
const { Schema } = mongoose;
import Joi from "joi";
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true ,
        minlength:2,
        maxlenght: 200
    },
    description:{
        type: String,
        required: true,
        trim:true ,
        unique: true,
        minlength:5
    },
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: String,
        required: true
    },

    image: {
        type: Object,
        default:{
            url:"",
            publicId: null
        }
    },
    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'   
        }
    ],
    createdAt:{
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
} );

// Populate Comment for this Post 
postSchema.virtual("comments" , {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id"
})



// Validate Create Post
export const validateCreatePost = (obj) =>{
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(5).required(),
        category:Joi.string().trim().required()
    })
    return schema.validate(obj)
}

// Validate Update Post
export const validateUpdatePost = (obj) =>{
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
        description: Joi.string().trim().min(5),
        category:Joi.string().trim()
    })
    return schema.validate(obj)
}






export default mongoose.model('Post', postSchema);