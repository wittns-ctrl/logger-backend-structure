import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv';
dotenv.config()

export const protect = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
    
        const decoded = jwt.verify(token,process.env.JWT_ACCESS)

        req.user = decoded.userId;

        next()

}
    
    else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})
export default protect;

