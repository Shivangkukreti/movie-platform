const express=require('express');
const show = require('../models/show');
const { checkseats, authcheck } = require('../utils/myfunc');
const booking = require('../models/booking');
const router=express.Router() 
const { getAuth } = require('@clerk/express');
const stripe = require('stripe');


router.post('/bookshow',authcheck,async(req,res)=>{
    try {
        let {showid,selectedseats}=req.body;
        let {userId}=getAuth(req);
 
        let x=await show.findById(showid);
        if(!x){
            return res.json({success: false,message: "Show not found.",});
        }
        if(!selectedseats || selectedseats.length==0){
            return res.json({success: false,message: "No seats selected.",});
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
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const line_items = [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Booking for ${x.movie.title} at ${new Date(x.showDateTime).toLocaleString()}`,
                    },
                    unit_amount: newbooking.amount * 100, // Amount in cents
                },
                quantity: 1,
            },
        ];
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/mybookings`,
            cancel_url: `${req.headers.origin}/mybookings`,
            expires_at: Math.floor(Date.now() / 1000) + 3600, // Session expires in 1 hour
            metadata: {
                bookingId: newbooking._id.toString(),
            },
        });
        newbooking.paymentLink=session.url;
        await newbooking.save();
        res.json({success: true,url:session.url});
    } catch (error) {
        res.json({success: false,message:error.message,});
    }
})


router.get('/mybookings',authcheck,async(req,res)=>{
    try {
        let { userId } = getAuth(req);
        let x = await booking.find({ user: userId }).populate({path:"show",populate:{path:"movie"}}).sort({ createdAt: -1 });
        res.json({ success: true, bookings: x });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
})












module.exports=router