const show = require("../models/show");
const { getAuth } = require("@clerk/express"); 

 const getPopularMovies = async (req, res) => {
  try {
    const response = await fetch("https://api4devs.com/api/v1/movies/popular?page=20&limit=20",);
    const data = await response.json();
    res.json({success: true,movies: data.movies,});
  } catch (error) {
    console.error(error);
    res.json({success: false,message: "Failed to fetch popular movies.",});
  }
};


const checkseats = async (showId, selectedSeats) => {
  try {
    const myshow = await show.findById(showId);
    let available = true;
    selectedSeats.forEach((seat) => {
      if (myshow.occupiedSeats[seat]) {
        available = false;
      }
    });
    return available;
  } catch (error) {
    return false;
  }
};


 const authcheck = async (req, res) => {
  let {isAuthenticated,userId}=getAuth(req);
  if(!isAuthenticated){
    return res.json({success: false,message: "User not authenticated.",});
  }
}


module.exports = { getPopularMovies, checkseats, authcheck };