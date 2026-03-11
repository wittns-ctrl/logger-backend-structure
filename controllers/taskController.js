import { generateAccessToken,generateRefreshToken } from "../middleware/token.js";
import ApiError from "../middleware/class.js";
import {User,users} from "../models/task.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler"
import sanitize from "mongo-sanitize";

export const create = asyncHandler(async (req, res) => {
  const sanitizer = sanitize(req.body)
  const { title, description, status, priority } = sanitizer;

  if ( !title ||title.length==0) {
  throw new ApiError('bad request',404);
  }
    const task = await User.create({
      owner: req.user.userId,
      title: title,
      description: description,
      status: status,
      priority: priority,
    });
    res.status(201).json(task);
});


export const fetch = asyncHandler(async (req, res) => {
  const sanitizer = sanitize(req.query);
  const page = sanitizer.page || 1;
  const limit = sanitizer.limit || 3;
  const priority = parseInt(sanitizer.priority)
  const skip = (page-1)*limit;
  const filter = {};
  if(req.query.title){
    filter.title = sanitizer.title
  }
  if(sanitizer.priority){
    filter.priority = sanitizer.priority
  }
    const search = await User.find(filter)
                             .populate("owner","name")
                             .sort({createdAt:-1})
                             .limit(limit)
                             .skip(skip)
    res.status(200).json(search);
});
export const fetchById = asyncHandler(async (req, res) => {
    const exists = await User.findById(req.params.id)
    if (!exists) {
     throw new Error("user not found",404);
    } else {
      res.status(200).json(exists);
    }
});


export const fetch_update = asyncHandler(async (req, res) => {
  const sanitizer = sanitize(req.params)
  const sanis = sanitize(req.body)
    const id_ = sanitizer.id;
    const content = sanis;
    const findUpdated = await User.findOneAndUpdate({ id: id_ }, content, {
      new: true,
    });
    if (!findUpdated) {
      throw new Error("not found",404);
    }
    res.status(200).json(findUpdated);
});



export const f_delete = asyncHandler(async (req, res) => {
  const sanitizer = sanitize(req.params)
    const id_ = parseInt(sanitizer.id);
    const deleter = await User.findOneAndDelete({ id: id_ });
    if (!deleter) {
    throw new Error("not found",404);
    }
    res.status(200).json("user deleted successfully");

});


export const login = asyncHandler(async(req,res) => {
  const sanitized = sanitize(req.body);
  const {email,password} = sanitized;
  const search = await users.findOne({email});
  if (!search){
    throw new Error("user not found",404)
  }
  const matcher = search.password;
  const comparing = await bcrypt.compare(password,matcher)
  if(!comparing){
  
    throw new Error("invalid request",401)
  }
  generateRefreshToken(res,search._id)
  const token = generateAccessToken(res,search._id);
})




export const refresh = asyncHandler(async(req,res) => {
  const refreshToken = req.cookies.RefreshToken;
  if(!refreshToken){
  
    throw new Error("no refreshtoken , please login again",401)
  }
  try{
  const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH)
  const  accessToken = generateAccessToken(res,decoded._id)
  }catch(error){
    if(error.name === "TokenExpiredError"){
      throw new Error("token expired , please login again",401)
    }
  }
})
 



export const register =  asyncHandler(async(req,res) => {
const sanitizedBody = sanitize(req.body);
const {name,email,password} = sanitizedBody;
const existes = await users.findOne({email:req.body.email});
if(existes){
  
 throw new Error("unauthorized, email already exists",401);
}
const createUser = users.create(
  {
    name: name,
    email: email,
    password : password
  }
)
res.status(201).send("user created successfully")
})



export const logout = asyncHandler(async(req,res) => {
  const refreshToken = req.cookies.RefreshToken
  if(!refreshToken){
    
    throw new Error("no token to logout",400)
  }
  res.clearCookie("RefreshToken",
  {
    httpOnly : true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "Strict"
  }
  )
  res.status(200).json({message : "user logged out successfully"})
})