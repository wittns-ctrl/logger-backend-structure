import express from "express";
import protect from "../middleware/protect.js"
const router  = express.Router();
import {create,fetch,fetchById,fetch_update,f_delete,login,refresh,register,logout,imageUpload,updateImage} from "../controllers/taskController.js"
import {validate} from "../middleware/valid.js";
import { joiSchema,titleSchema } from "../validate/validation.js";
import { loginlimiter } from "../middleware/ratelimit.js";
import upload from "../middleware/cloud.js"
router.route("/tasks")
.post(protect,validate(titleSchema),create)
.get(fetch)
router.route("/tasks/:id")
.get(protect,fetchById)
.patch(protect,fetch_update)
.delete(protect,f_delete)
router.route("/login")
.post(loginlimiter,login);
router.route("/refresh")
.post(refresh)
router.route("/register")
.post(validate(joiSchema),register)
router.route("/logout")
.post(protect,logout)
router.route("/upload")
.post(upload.array('images',5),imageUpload)
router.route("/updateImage")
.put(protect,upload.single("images"),updateImage)

export default router;