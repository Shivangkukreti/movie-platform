const mongoose=require('mongoose')
const Schema=mongoose.Schema


let userSchema=new Schema({
    _id:{type:String,required:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
})

let user=mongoose.model("user", userSchema)
module.exports=user