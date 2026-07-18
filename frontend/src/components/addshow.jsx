import { Loader, Star } from "lucide-react";
import { dummyShowsData } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getToken } from "@clerk/react";
import { useContext } from "react";
import { Appcontext } from "../context";
import { useEffect } from "react";

function Addshow() {
  const [formdata, setform] = useState({ time: "", price: "", movieid: "" });
  let [nowmovies, setnowmovies] = useState([]);
  let { api,getallshows,getdashdata } = useContext(Appcontext);
  const today = new Date().toISOString().slice(0, 16);
  function handleall(event) {
    const { name, value } = event.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handlesubmit(event) {
    event.preventDefault();
    if (!formdata.time || !formdata.price || !formdata.movieid) {
      alert("Please fill in all fields");
      return;
    }
    setform({ time: "", price: "", movieid: "" });
    let token = await getToken();
    console.log(token);

    try {
      let { data } = await axios.post(api + "/show/addshow", formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        getallshows()
        getdashdata()
        console.log(data.message);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function getnowmovies() {
    try {
      let token = await getToken();
      let { data } = await axios.get(api + "/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setnowmovies(data.movies);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getnowmovies();
  }, []);

  return (
    <div className="flex flex-col w-[70%] ">
      <h1 className="text-4xl">
        Add <p className="text-rose-600 inline">Shows</p>
      </h1>
      <p className="font-extrabold text-lg mt-10">Now Playing Movies</p>
      <div className="flex shrink-0 group gap-2  overflow-x-auto  w-300 h-fit mt-5 ">
        {nowmovies.length>0?nowmovies.map((x, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setform((prev) => ({ ...prev, movieid: x.id }))}
              className={
                "flex group-hover:opacity-30 hover:scale-95 hover:opacity-100 duration-300 flex-col gap-2 border-rose-600/30 border rounded-xl p-3 shrink-0 w-60" +
                (formdata.movieid === x.id ? " bg-rose-600/30 " : "")
              }
            >
              <img
                className="rounded-xl h-60 object-cover "
                src={
                  x.backdrop_path ||
                  x.backdropUrl ||
                  x.poster_path ||
                  x.posterUrl
                }
                alt=""
              />
              <p className="font-bold text-center text-lg">{x.title}</p>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Star color="red" height={15} fill="red"></Star>
                  <p className="text-sm text-gray-400">{x.vote_average}</p>
                </div>
                <p className="text-sm text-gray-400">
                  {x.release_date || x.releaseDate}
                </p>
              </div>
            </div>
          );
        }): <Loader className="animate-spin w-full h-20  flex justify-center items-center text-rose-600" height={30}></Loader>}
      </div>
      <form>
        <div className="mt-10 flex gap-2 items-center ">
          <h3 className="font-bold inline text-lg ">Show Name :</h3>
          <span className="text-rose-600 font-bold text-2xl">
            {" "}
            {formdata.movieid
              ? nowmovies.find((x) => x.id === formdata.movieid)?.title
              : ""}{" "}
          </span>
        </div>
        <label className="flex flex-col gap-2 mt-10 font-bold justify-center  items-start">
          Show Price :
          <input
            onChange={handleall}
            name="price"
            value={formdata.price}
            className=" border border-rose-600 p-6 text-rose-600 text-2xl rounded-xl"
            min={1}
            type="number"
            placeholder="Enter show price"
          />
        </label>
        <label className="flex flex-col gap-2 mt-10 font-bold justify-center  items-start">
          Show Time :
          <input
            onChange={handleall}
            min={today}
            value={formdata.time}
            name="time"
            className=" border border-rose-600 p-6 text-rose-600 rounded-xl"
            type="datetime-local"
            placeholder="Enter show time"
          />
        </label>
        <button
          onClick={handlesubmit}
          className="bg-rose-600 text-white p-4 rounded-xl mt-10"
        >
          Add Show
        </button>
      </form>
    </div>
  );
}

export default Addshow;
