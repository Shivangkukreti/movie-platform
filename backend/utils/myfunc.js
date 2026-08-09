const show = require("../models/show");
const { getAuth } = require("@clerk/express");
// https://api4devs.com/api/v1/movies/popular?page=20&limit=20

const movieIds = [
  "tt16311594", // F1: The Movie
  "tt10548174", // 28 Years Later
  "tt36463894", // Predator: Killer of Killers
  "tt7181546", // Ballerina
  "tt3566834", // A Minecraft Movie
  "tt26743210", // How to Train Your Dragon
  "tt4900148", // Elio
  "tt5950044", // Superman
  "tt7967302", // Mission: Impossible - The Final Reckoning

  "tt28015403", // Supergirl
  "tt22022452", // Thunderbolts*
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0468569", // The Dark Knight
  "tt0071562", // The Godfather Part II
  "tt0050083", // 12 Angry Men
  "tt0108052", // Schindler's List
  "tt0167260", // The Lord of the Rings: The Return of the King
  "tt0110912", // Pulp Fiction
  "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
  "tt0109830", // Forrest Gump
  "tt0137523", // Fight Club
  "tt1375666", // Inception
  "tt0080684", // Star Wars: The Empire Strikes Back
  "tt0167261", // The Lord of the Rings: The Two Towers
  "tt0133093", // The Matrix
  "tt0099685", // Goodfellas
  "tt0073486", // One Flew Over the Cuckoo's Nest
  "tt0114369", // Se7en
  "tt0102926", //
  "tt28479262",
  "tt26743210",
];
const getPopularMovies = async (req, res) => {
  try {
    const movies = await Promise.all(
      movieIds.map(async (id) => {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=54796620`,
        );

        return await response.json();
      }),
    );
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to fetch popular movies." });
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

const authcheck = async (req, res, next) => {
  let { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated) {
    return res.json({ success: false, message: "User not authenticated." });
  }
  next();
};

module.exports = { getPopularMovies, checkseats, authcheck };
