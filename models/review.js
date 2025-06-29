import mongoose from "mongoose";

const reviewschema = new mongoose.Schema({
    email:{
        type : String,
        required:true,
        unique : true
    },
    name :{
        type : String,
        required : true
    },
    rating :{
        type : String,
        required : true
    },
    Comment :{
        type : String,
        required : true
    },
    date:{
        type : String,
        required : true,
        default :Date.now()
    },
    isApproved:{
        type:Boolean,
        required : true,
        default: false
    },
    profilepicture :{
        type:String,
        required:true,
        default:"https://i.pinimg.com/736x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
    }
    
    
})

const Review = mongoose.model("Review",reviewschema);

export default reviewschema