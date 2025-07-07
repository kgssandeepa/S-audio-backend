import express from "express";
import { addReview ,approveReview,deleteReview,getReview} from "../controllers/reviewcontroller.js";

import { verifyToken } from '../middleware/auth.js';



const reviewRouter =express.Router();

reviewRouter.post("/", verifyToken,addReview)
reviewRouter.get("/",verifyToken,getReview)
reviewRouter.delete(":email",verifyToken,deleteReview)
reviewRouter.put("/approve/:email",verifyToken,approveReview)
/*
reviewRouter.get ("/:email",(req,res)=>{
    console.log("this is email route")
})


reviewRouter.get("/approved",(req,res)=>{
    console.log("This is approved Route")
})

reviewRouter.get("/:name",

    (req,res)=>{
        console.log(req.params.name) 
    }
)*/


reviewRouter.put("/approve/:email",approveReview)

export default reviewRouter;