import { generateAccessToken,generateRefreshToken } from "../middleware/token.js";
import {User,users} from "../models/task.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler"
import sanitize from "mongo-sanitize";
export const create = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body;

  if ( !title ||title.length==0) {
  return res.status(400).send("bad request");
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
  const {page,limit,title} = req.query
  const priority = parseInt(req.query.priority)
  const skip = (page-1)*limit;
  const filter = {};
  if(req.query.title){
    filter.title = req.query.title
  }
  if(req.query.priority){
    filter.priority = req.query.priority
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
     res.status(404)
     throw new Error("user not found");
    } else {
      res.status(200).json(exists);
    }
});
export const fetch_update = asyncHandler(async (req, res) => {
    const id_ = req.params.id;
    const content = req.body;
    const findUpdated = await User.findOneAndUpdate({ id: id_ }, content, {
      new: true,
    });
    if (!findUpdated) {
      res.status(404)
      throw new Error("not found");
    }
    res.status(200).json(findUpdated);
});
export const f_delete = asyncHandler(async (req, res) => {
    const id_ = parseInt(req.params.id);
    const deleter = await User.findOneAndDelete({ id: id_ });
    if (!deleter) {
    res.status(404)
    throw new Error("not found");
    }
    res.status(200).json("user deleted successfully");

});
export const login = asyncHandler(async(req,res) => {
  const {email,password} = req.body;
  const search = await users.findOne({email});
  if (!search){
    res.status(404);
    throw new Error("user not found")
  }
  const matcher = search.password;
  const comparing = await bcrypt.compare(password,matcher)
  if(!comparing){
    res.status(401);
    throw new Error("invalid request")
  }
  generateRefreshToken(res,search._id)
  const token = generateAccessToken(res,search._id);
})

export const refresh = asyncHandler(async(req,res) => {
  const refreshToken = req.cookies.RefreshToken;
  if(!refreshToken){
    res.status(401)
    throw new Error("no refreshtoken , please login again")
  }
  try{
  const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH)
  const  accessToken = generateAccessToken(res,decoded._id)
  }catch(error){
    res.status(401)
    if(error.name === "TokenExpiredError"){
      throw new Error("token expired , please login again")
    }
  }
})
 
export const register =  asyncHandler(async(req,res) => {
const sanitizedBody = sanitize(req.body);
const {name,email,password} = sanitizedBody;
const existes = await users.findOne({email:req.body.email});
if(existes){
  res.status(401)
 throw new Error("unauthorized, email already exists");
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
    res.status(400)
    throw new Error("no token to logout")
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