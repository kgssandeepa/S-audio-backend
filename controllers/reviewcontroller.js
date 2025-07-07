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
export async function getReview(req,res){
   const use = req.user;

  try{
   if (user.role == "admin"){
      const reviews= await Review.find();
      res.json(reviews);
   }else{
      const reviews = await Review.find({isApproved:true});
      res.json(reviews);
   }
  }catch(error){
   res.status(500).json({error:"failed to get reviews"});
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
export function approveReview(req,res){
   const email = req.params.emaill;

   if(req.user == null){
      res.status(401).json({massage:"please login and try agin"});
      return
    }
     if (req.user.role == "admin"){

       Review.updateOne(
         {
            email:email
         }
         ,{
          isApproved:true,
         }
       ).then(()=>{
         res.json({massage :"Review approved Successfully"})
       }).catch(()=>{
         res.status(500).json({error : "Review approvel failed" });
        });
       }else{
       res.status(403).json({massage:"you are not and admin.only admins can approve the reviews"});
    }
} 