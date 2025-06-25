 import express, { response } from "express";
 import bodyParser from "body-parser";
 import mongoose from "mongoose";
import userRouter from './routes/userrouter.js';
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken"

 
 const app=express();

 app.use(bodyParser.json());

 let mongourl ="mongodb+srv://adminsonal:123@cluster0.yyor4.mongodb.net/prods?retryWrites=true&w=majority&appName=Cluster0"
 
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
         const token =req.header
         ("Authorization")

         if (token!=null){
          token=token.replace("Bearer","");

          
         

         jwt.verify(token,"kv-secret-89!",(err,decoded)=>{
          if(!err){
            req.user=decoded;
          }
         });
        }
        next()
    })
  

    


app.use("/api/users",userRouter)
app.use("/api/product",productRouter)



 app.listen(3000,()=>{
    console.log("server is runing on port 3000")
 });