import mongoose from "mongoose";
const { Schema } = mongoose;
import Joi from "joi";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true ,
        minlength:2,
        maxlenght: 100
    },
    email:{
        type: String,
        required: true,
        trim:true ,
        unique: true,
        minlength:5,
        maxlenght: 100
    },
    password: {
        type : String,
        required: true
    },
    profilPhoto: {
        type: Object,
        default:{
            url:"https://pixabay.com/vectors/avatar-icon-placeholder-profile-2092113/",
            publicId: null
        }
    },
    bio:{
        type: String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
},{
    timeseries:true,
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

// Populste Posts that Belongs to this user when he Get his profile 
userSchema.virtual("posts" , {
    ref: "Post",
    foreignField: "user",
    localField: "_id"
})

// Validate Register User
export const validateRegisterUser = (obj) =>{
    const schema = Joi.object({
        username:Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(2).required()
    })
    return schema.validate(obj)
}

// Validate Login User
export const validateLoginUser = (obj) =>{
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(2).required()
    })
    return schema.validate(obj)
}


// Validate Update User
export const validateUpdateUser = (obj) =>{
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: Joi.string().trim().min(2),
        bio: Joi.string()
    })
    return schema.validate(obj)
}



export default mongoose.model('User', userSchema);