import  asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
import cloudinary from "cloudinary"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



// Cloudinary Upload image
const cloudInaryUploadImage = async (FileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(FileToUpload,{
            resource_type: 'auto'
        })
        return data
    } catch (error) {
        return error
    }
}

// Cloudinary Remove image
const cloudInaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId)
        return result
    } catch (error) {
        return error
    }
}


// Cloudinary Remove Multiple image
const cloudInaryRemoveMultipleImage = async (ArraPublicIds) => {
    try {
        const result = await cloudinary.v2.api.delete_resources(ArraPublicIds)
        return result
    } catch (error) {
        return error
    }
}

export {
    cloudInaryUploadImage,
    cloudInaryRemoveImage,
    cloudInaryRemoveMultipleImage
}