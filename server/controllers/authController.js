import  asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
    
import {validateRegisterUser , validateLoginUser } from "../models/User.js"
import User from "../models/User.js"


dotenv.config()

/**----------------------------------------------------
 * @description Regster New User- Sing Up
 * @route /api/auth/register
 * @method POST
 * @access public
 -----------------------------------------------------*/
export const RigsterUserCtrl = asyncHandler(async (req, res) => {
    const {error} = validateRegisterUser(req.body)
    if (error) { return res.status(400).json({message:error.details[0].message}) }
    let user = await User.findOne({email: req.body.email})
    if (user) { return res.status(400).json({message: "wrong email or password! 1"}) }
    const hashpass = await bcrypt.hash(req.body.password, 10)
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpass
    })
    await user.save();
    // @TODO -sending email(verify account)
    res.status(201).json({message:"You regstered successfully, Please log in"})

})





/**----------------------------------------------------
 * @description Login New User
 * @route /api/auth/login
 * @method POST
 * @access public
 -----------------------------------------------------*/


 export const LoginUserCtrl = asyncHandler(async (req, res) => {
    const {error} = validateLoginUser(req.body)
    if (error) { return res.status(400).json({message:error.details[0].message})}
    const DBUser =await User.findOne({email: req.body.email})
    if (!DBUser) { return res.status(404).json({message: "wrong email or password! 2"}) }
    const isMatch = await bcrypt.compare(req.body.password, DBUser.password)
    if (!isMatch) {return res.status(404).json({message: "wrong email or password! 2"}) }

    // Generate Auth token Using JWT
    const token = jwt.sign({id: DBUser._id , isAdmin: DBUser.isAdmin}, process.env.SECRET_KEY)
    //res.cookie('token',token,{httpOnly: true})
    
    
    // @TODO -sending email(verify account if not verified )
    res.status(200).json({
        message:"You login successfully",
        _id: DBUser._id,
        isAdmin: DBUser.isAdmin,
        profilePhoto: DBUser.profilPhoto,
        token,
        user: DBUser.username
        })
   

})