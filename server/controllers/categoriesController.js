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




  /**----------------------------------------------------
 * @description Create Get all Categories 
 * @route /api/categories
 * @method Get
 * @access public
 -----------------------------------------------------*/


 export const GetAllCategoriesCrtl = asyncHandler(async (req , res) => {
     const categories = await Category.find()
     res.status(200).json(categories)
  } )


  /**----------------------------------------------------
 * @description Delete Category 
 * @route /api/categories/:id
 * @method Delete
 * @access private (Only admin)
 -----------------------------------------------------*/


 export const DeleteCategoryCrtl = asyncHandler(async (req , res) => {
    const category = await Category.findById(req.params.id)
    if (!category) { return res.status(404).json({message: 'Category Not Found'})}

    await Category.findByIdAndDelete(req.params.id)
     
     res.status(200).json({
        message: 'category has been deleted',
        CategoryID: category._id
     })
  } )

