import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import  asyncHandler from "express-async-handler"
dotenv.config()



export const verifyMiddleare =  async (req, res, next) => {
     const authtoken = req.headers.authorization
     
    if(!authtoken) {return res.status(401).send('token is not provid') }
    const token = authtoken.split(" ")[1]
    try {
        const decode= await jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

} 

export const verifyAdmin = asyncHandler( async (req , res , next) => {
    verifyMiddleare(req , res ,()=>{
        if (req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({
            message: " Not allowed, only Admin"
        })
        }
    })
} )

// verfiy token & only himself
export const verifyOnlyUser = asyncHandler( async (req , res , next) => {
    verifyMiddleare(req , res ,()=>{
        if (req.user.id === req.params.id){
            next()
        }else{
            return res.status(403).json({
            message: " Not allowed, only user himself"
        })
        }
    })
} )


// verfiy token & Authorization //  Admin or Himself 
export const verifyTokenAndAuthorization = asyncHandler( async (req , res , next) => {
    verifyMiddleare(req , res ,()=>{
        if (req.user.isAdmin || req.user.id === req.params.id  ){
            next()
        }else{
            return res.status(403).json({
            message: " Not allowed, only user himself or admin"
        })
        }
    })
} )



