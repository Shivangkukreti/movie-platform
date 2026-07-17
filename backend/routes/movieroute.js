const express=require('express')
const router=express.Router() 
let {getPopularMovies}=require('../utils/myfunc')

router.get('/',getPopularMovies)








module.exports=router