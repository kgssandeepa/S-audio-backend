import Review from "../models/review.js";


export function addReview(req,res){
    console.log(req.user);
     if (req.user==null){
        res.status(401).json({
           massage:"please login and try again"
        })
        return;
     }

     const data = req.body;

     data.name =req.user.firstName +""+ req.user.lastName;
     data.profilepicture =req.user.profilepicture;
     data.email=req.user.email;
          
     const newReview = new Review(data)

     newReview.save().then(()=>{
        res.json({massage:"Review additon succesfully"});
     }).catch((error)=>{
        req.status(500).json({error:"Review additon failed"});
     });
}  