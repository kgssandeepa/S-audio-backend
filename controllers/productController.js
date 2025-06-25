import product from "../models/product.js";

export function addproduct(req,res){
    console.log(req.user)

    if (req.user==null){
        res.status(401).json({
            massage:"please login and try again"
        })
        return
    }
    if(req.user.role !="admin"){
        res.status(403).json({
            massage:"you are not authorized to perform this action"
        })
        return
    }
    const data = req.body;
    const newproduct= new product(data);
    newproduct.save()
    .then(()=>{
        res.json({massage:"product added succesfully"});
    })
    .catch((error)=>{
        res.staus(500).json({error:"product addition failed"});
    })
}