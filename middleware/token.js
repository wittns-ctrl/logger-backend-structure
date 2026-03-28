import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
export const generateAccessToken = (res, userId) => {
    const Access_token = jwt.sign(
        {userId},
        process.env.JWT_ACCESS,
        {expiresIn : "15m"}
    )

return res.json({Access_token})
}



export const generateRefreshToken = (res, userId) => {
    const RefreshToken = jwt.sign(
        {userId},
        process.env.JWT_REFRESH,
        {expiresIn : "7d"}
    )

    res.cookie("RefreshToken",RefreshToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite : "none",
            maxAge: 7*24*60*60*1000
        }
     )
}

