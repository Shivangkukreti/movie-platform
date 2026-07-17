const express=require('express');
const show = require('../models/show');
const { checkseats } = require('../utils/myfunc');
const booking = require('../models/booking');
const router=express.Router() 
const { getAuth } = require('@clerk/express');



router.post('/bookshow',async(req,res)=>{
    try {
        let {showid,selectedseats}=req.body;
        let {userId}=getAuth(req);
        console.log(userId);
        let x=await show.findById(showid);
        if(!x){
            return res.json({success: false,message: "Show not found.",});
        }
        const isavailable=await checkseats(showid,selectedseats);
        if(!isavailable){
            return res.json({success: false,message: `Some selected seats are not available.`,});
        }
        selectedseats.forEach((seat)=>{
            x.occupiedSeats[seat]=userId
        })
        console.log(x.occupiedSeats);
        
        x.markModified("occupiedSeats"); //Mongoose often doesn't detect changes inside a plain Object, so save() doesn't persist them.
        let newbooking=new booking({
            user:userId,
            show:showid,
            amount:x.showPrice*selectedseats.length,
            bookedSeats:selectedseats,
        })
        await x.save();
        await newbooking.save();
        const updated = await show.findById(showid);
       console.log(updated);
        res.json({success: true,message: "Show booked successfully.",booking:newbooking});
    } catch (error) {
        res.json({success: false,message:error.message,});
    }
})















module.exports=router