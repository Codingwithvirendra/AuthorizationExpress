import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const UserSignup = mongoose.model('UserSignup',signupSchema);
export default UserSignup;