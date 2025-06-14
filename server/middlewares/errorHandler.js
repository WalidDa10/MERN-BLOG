// Not found Middleware
export const NotFound = (req, res, next)=>{
    const error = new Error(`Not Found -${req.originalUlr}`)
    res.status(404)
    next(error)
}


//Error Handler Middleware
export const ErrorHandlerMidl =  async (err,req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack 
    })
} 