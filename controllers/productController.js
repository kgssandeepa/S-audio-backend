import product from "../models/product.js";

export function addproduct(req,res){
    console.log(req.user)

    if (!req.user){
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

export async function getProducts(req,res) {
    try{
        const products = await product.find();
        res.json(products);

    }catch(e){
        res.status(500).json({
            massage:"failed to get products"
        })
    }
}

