import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const titleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity',
        required: true,
    },
    title: {
        type: String,
        minlength: [2,'title should be atleast 2 characters'],
        maxlength: [20, 'title should be atmost 20 characters'],
        required: true,
    },
    description: {
        type: String,
        minlength: [1,'description should be atleast 1 character'],
        maxlength: [50, 'description should be atmost 50 characters'],
    },
    status: {
        type: String,
        enum: ["pending","in-progress","completed"],
        default: "pending",
    },
    priority: {
        type: Number,
        enum: [1,2,3,4,5],
    }
},
{timestamps: true})
titleSchema.index({owner:1})
titleSchema.index({title:1})
titleSchema.index({owner:1,createdAt: -1})
titleSchema.index({title:'text', description:'text'});
export const User = mongoose.model('user',titleSchema);



const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 2,
        maxlength: 30, 
        required: true 
    },
    email:{
      type: String,
      unique: [true,"email exists"],
      required: true  
    },
    password: {
        type: String,
        minlenght: 4,
        maxlenght: 10,
        required : true
    }
})
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

export const users = mongoose.model("activity", UserSchema)