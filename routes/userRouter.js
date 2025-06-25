import express from  "express";
import { loginUser, registeruser } from "../controllers/usercontroller.js";

const userrouter = express.Router();

userrouter.post("/",registeruser)

userrouter.post("/login",loginUser)

export default userrouter;  