import jwt from 'jsonwebtoken'

export const protect = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.authorization.headers.startsWith("Bearer")){
    token = req.headers.authorization.split("")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_ACCESS)

        res.user = decoded;

        next()
    }catch(error){
        res.status(401)
        throw new Error("Not authorized, token failded!")
}
    }
    else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
}
export default protect;
