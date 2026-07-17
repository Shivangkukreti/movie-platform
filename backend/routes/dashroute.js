const express=require('express')
const booking = require('../models/booking')
const show = require('../models/show')
const user = require('../models/user')
const router=express.Router()  




router.get("/data",async(req,res)=>{
    try {
        let allbookings=await booking.find({isPaid:true}).populate('user').populate({path:"show",populate:{path:"movie"}})
        let activeshows=await show.find({showDateTime:{$gte:new Date().toISOString().slice(0,16)}}).populate('movie').sort({showDateTime:1})
        let allusers=await user.countDocuments()
        let revenue=0;
        allbookings.forEach((booking)=>{
            revenue+=booking.amount
        })
        let dashboarddata={
            totalRevenue:revenue,
            totalBookings:allbookings,
            totalUsers:allusers,
            activeShows:activeshows.length
        }
        res.json({success:true,message:"Dashboard data fetched successfully",dashboarddata})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})














module.exports=router