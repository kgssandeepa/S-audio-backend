 import express, { response } from "express";
 import bodyParser from "body-parser";
 import mongoose from "mongoose";
 import userRouter from './routes/userrouter.js';
 import productRouter from "./routes/productRouter.js";
 import jwt from "jsonwebtoken";
 import dotenv from "dotenv";
 import reviewRouter from "./routes/reviewRouter.js";

 dotenv.config();
 
 const app=express();

 app.use(bodyParser.json());

 let mongourl =process.env.MONGO_URL;
 
    mongoose.connect(mongourl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }).then(() => { 
      console.log('Connected to MongoDB');
    }).catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
    
   app.use(bodyParser.json())
    app.use((req,res,next)=>{
         let token =req.header
         ("Authorization")
      //create the auth
         if (token!=null){
          token=token.replace("Bearer","");

          
         

         jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
          if(!err){
            req.user=decoded;
          }
         });
        }
        next()
    })
  

    


app.use("/api/users",userRouter)
app.use("/api/product",productRouter)
app.use("/api/reviews",reviewRouter);



 app.listen(3000,()=>{
    console.log("server is runing on port 3000")
 });