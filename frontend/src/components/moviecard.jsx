import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Card({ movie }) {
    let goto=useNavigate()
    return ( 
        <div onClick={()=>goto(`/movies/${movie._id}`)} className=" hover:-translate-y-3 min-w-[20%]  duration-500 z-10 flex flex-col p-2 gap-4 rounded-2xl shadow md:p-4 border border-white/15 ">
            <img className="rounded-2xl aspect-square max-h-80 object-cover" src={movie.poster_path} alt="" />
            <div className="font-bold text-lg">{movie.title} </div>
            <div className="text-gray-600 font-bold inline">
                {movie.genres.map((ele,index)=>{
                return(
                    <span key={index}> {Object.values(ele)} | </span>
                )

            })}<span className="inline">{Math.floor(movie.runtime/60)}h {movie.runtime%60}m </span>
            </div>
            
            <div className="flex justify-between">
                <button className="bg-[#f84565] px-4 py-2 rounded-3xl">Book Now</button>
                <div className="flex justify-center items-center gap-1"> {movie.vote_average} <Star color="#f84565" height={15}></Star> </div>
            </div>
            
        </div>
     );
}

export default Card;