import express from "express";
import protect from "../middleware/protect.js"
const router  = express.Router();
import {create,fetch,fetchById,fetch_update,f_delete,login,refresh,register,logout} from "../controllers/taskController.js"
import {validate} from "../middleware/valid.js";
import { joiSchema } from "../validate/validation.js";
router.route("/tasks")
.post(protect,create)
.get(fetch)
router.route("/tasks/:id")
.get(protect,fetchById)
.patch(protect,fetch_update)
.delete(protect,f_delete)
router.route("/login")
.post(login);
router.route("/refresh")
.post(refresh)
router.route("/register")
.post(validate(joiSchema),register)
router.route("/logout")
.post(protect,logout)

export default router;