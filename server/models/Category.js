import mongoose from "mongoose";
import Joi from "joi";

const CatergorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
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

// Validate Creat Category  
export const validateCreatCategory = (obj)=>{
    const schema = Joi.object({
            title: Joi.string().trim().required()
                })
        return schema.validate(obj)
}

export default mongoose.model('Category', CatergorySchema);