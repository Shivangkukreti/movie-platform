const express = require("express");
const movies = require("../models/movie");
const show = require("../models/show");
const router = express.Router();
const { requireAuth } = require("@clerk/express");
const { authcheck } = require("../utils/myfunc");

router.post("/addshow",authcheck, async (req, res) => {
  try {
    const { movieid, price, time } = req.body;
    let x = await movies.findById(movieid);
    if (!x) {
      const response = await fetch(
        `https://api4devs.com/api/v1/movies/${movieid}`,
      );
      let data = await response.json();
      x = data.movie;
      let newmovie = new movies({
        _id: x.id,
        title: x.title,
        overview: x.overview,
        poster_path: x.posterUrl,
        backdrop_path: x.backdropUrl,
        release_date: x.releaseDate,
        original_language: x.originalLanguage,
        vote_average: x.voteAverage,
      });
      await newmovie.save();
    }
    console.log(x);

    let addshow = new show({
      movie: movieid,
      showDateTime: time,
      showPrice: price,
    });
    await addshow.save();
    res.json({ success: true, message: "show added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});


router.get("/nowshowing",async(req,res)=>{
    try {
        const now = new Date().toISOString().slice(0, 16);
        let x=await show.find({showDateTime: {$gte: now}}).populate('movie').sort({showDateTime:1})
        console.log(x);
        
        let y=new Set()
        x.forEach(show => {~
            y.add(show.movie);
        });
      
        
        res.json({success:true,message:"Now showing movies",movies:Array.from(y)})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})


router.get("/:movieid",async(req,res)=>{
    try {
        let {movieid}=req.params
        const now = new Date().toISOString().slice(0, 16);
        if(await movies.findById(movieid)==null){
            res.json({success:false,message:"Movie not found"})
        }
        let x=await show.find({movie:movieid,showDateTime:{$gte: now}}).populate('movie').sort({showDateTime:1})
        if(x.length==0){
            res.json({success:false,message:"No shows available for this movie"})
        }
        res.json({success:true,shows:x})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
})



router.get("/getoccupiedseats/:showid", async (req, res) => {
    try {
        let {showid}=req.params;
        let x=await show.findById(showid);
        if(!x){
            return res.json({success: false,message: "Show not found.",});
        }
        let bookedSeats=Object.keys(x.occupiedSeats);
        res.json({success: true,seats: bookedSeats});
    } catch (error) {
        res.json({success: false,message: error.message,});
    }
})





module.exports = router;
