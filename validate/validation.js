import joi from "joi"
export const joiSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
})

export const titleSchema = joi.object({
  title: joi.string().min(2).max(15).required(),
  description: joi.string().min(2).max(30).required(),
  status: joi.string().min(2).max(30).required(),
  priority: joi.number().required()
})