const mongoose=require('mongoose')
const Schema=mongoose.Schema

let sch=new Schema({
    user:{type:String,required:true,ref:'user'},
    show:{type:String,required:true,ref:'show'},
    amount:{type:Number,required:true},
    bookedSeats:{type:Array,required:true},
    isPaid:{type:Boolean,default:false},
    paymentLink:{type:String,default:""},
},{timestamps:true})

let booking=mongoose.model("booking",sch)
module.exports=booking


