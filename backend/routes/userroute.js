const express = require('express');
const router = express.Router();
let {getAuth,clerkClient} = require('@clerk/express');
const booking = require('../models/booking');
const user = require('../models/user');
const { authcheck } = require('../utils/myfunc');
const movies = require('../models/movie');


router.get("/getuser",authcheck,async(req,res)=>{
    try {
        let {userId}=getAuth(req);
        let myuser=await user.findById(userId);
        if (!myuser) {
            return res.json({success:false,message:"User not found"})
        }
        res.json({success:true,message:"User fetched successfully",user:myuser})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})

router.get("/userbookings",authcheck,async(req,res)=>{
    try {
        let {userId}=getAuth(req);
    const bookings = await booking.find({user:userId}).populate({path:"show",populate:{path:"movie"}}).sort({createdAt:-1})
    res.json({success:true,message:"User bookings fetched successfully",bookings})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
})


router.post("/updatefavorite",authcheck,async(req,res)=>{
    try {
        let {movieid}=req.body;
        let {userId}=getAuth(req);
        let myuser=await clerkClient.users.getUser(userId);
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
        await clerkClient.users.updateUserMetadata(userId, { privateMetadata: myuser.privateMetadata });
        res.json({success:true,message:"User favorites updated successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})


router.get("/getfavourites",authcheck,async(req,res)=>{
    try {
        let {userId}=getAuth(req);
        let myuser=await clerkClient.users.getUser(userId);
        if (!myuser) {
            return res.json({success:false,message:"User not found"})
        }
        let favorites=myuser.privateMetadata.favorites || [];
        let favoriteMovies = await movies.find({_id:{$in:favorites}});
        console.log(favoriteMovies);
        
        res.json({success:true,message:"User favorites fetched successfully",favoriteMovies})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})





module.exports = router;