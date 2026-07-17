const express = require('express');
const router = express.Router();
let {getAuth,clerkClient} = require('@clerk/express');
const booking = require('../models/booking');


router.get("/userbookings",async(req,res)=>{
    try {
        let {userId}=getAuth(req);
    const bookings = await booking.find({user:userId}).populate({path:"show",populate:{path:"movie"}}).sort({createdAt:-1})
    res.json({success:true,message:"User bookings fetched successfully",bookings})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
})


router.post("/updatefavorite",async(req,res)=>{
    try {
        let {movieid}=req.body;
        let {userId}=getAuth(req);
        let myuser=await clerkClient.users.get(userId);
        if (!myuser) {
            return res.json({success:false,message:"User not found"})
        }
        if(!myuser.privateMetadata.favorites){
            myuser.privateMetadata.favorites=[]
        }
        if (myuser.privateMetadata.favorites.includes(movieid)) {
            myuser.privateMetadata.favorites = myuser.privateMetadata.favorites.filter((id) => id !== movieid);
        } else {
            myuser.privateMetadata.favorites.push(movieid);
        }
        await clerkClient.users.update(userId, { privateMetadata: myuser.privateMetadata });
        res.json({success:true,message:"User favorites updated successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})


router.get("/getfavourites",async(req,res)=>{
    try {
        let {userId}=getAuth(req);
        let myuser=await clerkClient.users.get(userId);
        if (!myuser) {
            return res.json({success:false,message:"User not found"})
        }
        let favorites=myuser.privateMetadata.favorites || [];
        let favoriteMovies = await movie.find({_id:{$in:favorites}});
        res.json({success:true,message:"User favorites fetched successfully",favoriteMovies})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})





module.exports = router;