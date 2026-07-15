import { Star } from "lucide-react";
import { dummyShowsData } from "../assets/assets";
import { useState } from "react";

function Addshow() {
    const [formdata, setform] = useState({time:"",price:"",movieid:""});
    
    function handleall(event) {
      const { name, value } = event.target;
      setform(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    function handlesubmit(event) {
         event.preventDefault();
        if(!formdata.time || !formdata.price || !formdata.movieid){
            alert("Please fill in all fields");
            return;
        }
     
      console.log(formdata);
      setform({time:"",price:"",movieid:""});
    }
  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl">
        Add <p className="text-rose-600 inline">Shows</p>
      </h1>
      <p className="font-extrabold text-lg mt-10">Now Playing Movies</p>
      <div className="flex shrink-0 group gap-2  overflow-x-auto h-fit mt-5">
        {dummyShowsData.map((x, idx) => {
          return (
            <div
              key={idx}

              onClick={()=>setform((prev)=>({...prev,movieid:x._id}))}
              className={"flex group-hover:opacity-30 hover:scale-95 hover:opacity-100 duration-300 flex-col gap-2 border-rose-600/30 border rounded-xl p-3 shrink-0 w-60"+(formdata.movieid === x._id ? " bg-rose-600/30 " : "")}
            >
              <img
                className="rounded-xl h-60 object-cover"
                src={x.backdrop_path}
                alt=""
              />
              <p className="font-bold text-center text-lg">{x.title}</p>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Star color="red" height={15} fill="red"></Star>
                  <p className="text-sm text-gray-400">{x.vote_average}</p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(x.release_date).toLocaleDateString("en", {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form>
        <div className="mt-10 flex gap-2 items-center ">
            <h3 className="font-bold inline text-lg ">Show Name :</h3>
            <span className="text-rose-600 font-bold text-2xl"> {formdata.movieid ? dummyShowsData.find((x) => x._id === formdata.movieid)?.title : ""} </span>
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
          value={formdata.time}
          name="time"
            className=" border border-rose-600 p-6 text-rose-600 rounded-xl"
            type="datetime-local"
            placeholder="Enter show time"
          />
        </label>
        <button onClick={handlesubmit} className="bg-rose-600 text-white p-4 rounded-xl mt-10">
          Add Show
        </button>
      </form>
    </div>
  );
}

export default Addshow;
