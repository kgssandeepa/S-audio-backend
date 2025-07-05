import Review from "../models/review.js";


export function addReview(req,res){
    console.log(req.user);

     if (req.user == null){
        res.status(401).json({
           massage:"please login and try again"
        })
        return;
     }

     let data = req.body;

     data.name = req.user.firstName +""+ req.user.lastName;
     data.profilepicture = req.user.profilepicture;
     data.email=req.user.email;
          
     let newReview = new Review(data)

     newReview.save().then(()=>{
        res.json({massage:"Review additon succesfully"});
     }).catch((error)=>{
        req.status(500).json({error:"Review additon failed"});
     });
}  
export function getReview(req,res){
   const use = req.user;

   if( user == null|| user.role !="admin"){

      Review.find({isApproved:true}).then((reviews)=>{
         req.json(reviews); 
      })
      return
   }
 if (user.role=="admin"){
   Review.find().then((reviews)=>{
      res.json(reviews);
   })
 }
}

export function deleteReview(req,res){
   const email =  req.params.email;

     if (req.user == null){
        res.status(401).json({
           massage:"please login and try again"
        })
        return;
     }
       
     if (req.user.role== "admin"){


      
   Review.deleteOne
   ({email:email}).then(()=>{
      res.json({massage:"Review Deleted succesfully"});
   
   }).catch(()=>{
      res.status(500).json({error:"Review deletion failed"});
   });
   return

} 
if (req.user.role== "customer"){

   if(req.user.email == email){
      Review.deleteOne
   ({email:email}).then(()=>{
      res.json({massage:"Review Deleted succesfully"});
   
   }).catch(()=>{
      res.status(500).json({error:"Review deletion failed"});
   });

   }else{
      req.status(403).json({massage:"you are not authorized to perform this action"});
   }
}  

}