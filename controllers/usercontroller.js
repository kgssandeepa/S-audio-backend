import User from "../models/user.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export function registeruser(req,res){

const data =req.body;

data.password = bcrypt.hashSync(data.password,10);

const newUser = new User({data});

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
          res.json({massage:"user found",user:User});

          const isPasswordcorrect =  bcrypt.compareSync(data.password,User.password);
        
        if (isPasswordcorrect){
         const token = jwt.sign({
            firstName : User.firstName,
            lastName  :User.lastName,
            email     :User.email,
            role      :User.role,
         },"kv-secret-89! ");

         return res.json({massage:"login succesfull",token :token});
        }  else{
         return res.status(401).json({error:"login faild"});
        }
         
          
          

          
        }
      })
    }
  