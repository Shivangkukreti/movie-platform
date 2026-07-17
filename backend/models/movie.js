const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    _id: {type: String,required: true,},
    title: {type: String,required: true,},
    overview: {type: String,required: true,},
    poster_path: {type: String,required: true,},
    backdrop_path: {type: String,required: true,},
    release_date: {type: String,required: true,},
    original_language: {type: String,},
    genres: {type: Array,default: ["Action", "Adventure", "Fantasy"]},
    casts: {type: Array,default: [
  {
    name: "Milla Jovovich",
    profile_path:
      "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg",
  },
  {
    name: "Dave Bautista",
    profile_path:
      "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg",
  },
  {
    name: "Arly Jover",
    profile_path:
      "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg",
  },
  {
    name: "Amara Okereke",
    profile_path:
      "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg",
  },
  {
    name: "Fraser James",
    profile_path:
      "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg",
  },
  {
    name: "Deirdre Mullins",
    profile_path:
      "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg",
  },
  {
    name: "Sebastian Stankiewicz",
    profile_path:
      "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg",
  },
  {
    name: "Tue Lunding",
    profile_path:
      "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg",
  },
  {
    name: "Jacek Dzisiewicz",
    profile_path:
      "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg",
  },
  {
    name: "Ian Hanmore",
    profile_path:
      "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg",
  },
  {
    name: "Eveline Hall",
    profile_path:
      "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg",
  },
  {
    name: "Kamila Klamut",
    profile_path:
      "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg",
  },
  {
    name: "Caoilinn Springall",
    profile_path:
      "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg",
  },
  {
    name: "Jan Kowalewski",
    profile_path:
      "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg",
  },
  {
    name: "Pawel Wysocki",
    profile_path:
      "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg",
  },
  {
    name: "Simon Lööf",
    profile_path:
      "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg",
  },
  {
    name: "Tomasz Cymerman",
    profile_path:
      "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg",
  },
]},
    vote_average: {type: Number,required: true,},
    runtime: {type: Number,default: 128},
},
  {timestamps: true},
);

let movies = mongoose.model("movies", movieSchema);
module.exports = movies;
