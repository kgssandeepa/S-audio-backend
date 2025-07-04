import mongoose from "mongoose";

const userSchema = new mongoose.Schema({


    email :{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : { 
        type : String,
        required : true,
        default : "customer"
    },
    firstName :{
        type : String,
        required : true
    },
    lastName :{
        type : String,
         required : true
    },
    address :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    profilepicture :{
        type:String,
        required:true,
        default:"https://i.pinimg.com/736x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
    }
    

});

const User = mongoose.model("user",userSchema); 
export default User;