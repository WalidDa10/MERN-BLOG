import  asyncHandler from "express-async-handler"

import User from "../models/User.js"

import Category, {validateCreatCategory} from "../models/Category.js"



/**----------------------------------------------------
 * @description Create New Category 
 * @route /api/categories
 * @method Post
 * @access private (Only admin)
 -----------------------------------------------------*/


 export const CreatCategoryCrtl = asyncHandler(async (req , res) => {
     // Validation 
     const {error} = validateCreatCategory(req.body)
     if (error) { return res.status(400).json({message:error.details[0].message}) }
     
     const category = await Category.create({
        title: req.body.title,
        user: req.user.id
     })
 
     res.status(201).json(category)
  } )
