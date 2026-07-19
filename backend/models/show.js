const mongoose=require('mongoose')
const Schema=mongoose.Schema


let showschema=new Schema({

    movie:{type:String,required:true,ref:'movies'},
    showDateTime:{type:String,required:true},
    showPrice:{type:Number,required:true},
    occupiedSeats:{type:Object,default:{}},
},{minimize:false})

showschema.post

let show=mongoose.model("show",showschema)
module.exports=show