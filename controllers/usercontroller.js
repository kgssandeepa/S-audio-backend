import User from "../models/user.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export function registeruser(req,res){

const data =req.body;
console.log(data);

data.password = bcrypt.hashSync(data.password,10);
//.
const newUser = new User(data);

  newUser.save().then(()=>{
    res.json({massage :"User registerd successfully"})

  }).catch((error)=>
  {
    res.status(500).json({ error: "user register failed" });

  })
}

export function loginUser(req,res){
  const data = req.body;
  User.findOne({
    email:data.email
  }).then(
    (User)=>{
      
        if (User===null){
          return res.status(404).json({error:"user not found"});
        }else{
          

          const isPasswordcorrect =  bcrypt.compareSync(data.password,User.password);
          console.log(isPasswordcorrect)
        
        if (isPasswordcorrect){
         const token = jwt.sign({
            firstName : User.firstName,
            lastName  :User.lastName,
            email     :User.email,
            role      :User.role,
            profilepicture:User.profilepicture
         },process.env.JWT_SECRET);

          res.json({massage:"login succesfull",token :token});
        }  else{
          res.status(401).json({error:"login faild"});
        }
        
       }
      });
     
    }
  