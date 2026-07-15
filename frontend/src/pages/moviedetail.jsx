import { use, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyShowsData , dummyCastsData, dummyDateTimeData } from "../assets/assets";
import { Heart, Star } from "lucide-react";
import Blurcircle from "../components/blurcircle";
import Featured from "../components/featured";
import Loading from "../components/loading";
import { Appcontext } from "../context";

function MovieDetail() {
    let {id}=useParams()
    let [movie,setmovie]=useState(null)
    let {myfav,setmyfav}=useContext(Appcontext)
    let [mydate,setmydate]=useState(null)
    let goto=useNavigate()
    const castRef = useRef(null);

  const scrollToCast = () => {
    castRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center", // start, center, end, nearest
    });
  };
    useEffect(()=>{
        let x=dummyShowsData.find((ele)=>ele._id==id)
        x?setmovie(x):setmovie(null)
        window.scrollTo(0,0)
    },[id])
      return movie ? ( 
        <>
         <div className=" w-[50%] mx-auto my-20 justify-center duration-500 z-10 flex  p-2 gap-10 rounded-2xl shadow md:p-4  ">
            <Blurcircle top="10%" left="30%"></Blurcircle>
            <img className="rounded-2xl h-120 object-cover" src={movie.poster_path} alt="" />
            <div className="flex flex-col gap-5 justify-center">
                <div className="font-bold text-5xl">{movie.title} </div>
                <div className="flex justify-start text-xl font-bold items-center gap-1"> <Star color="#f84565" height={15}></Star> {movie.vote_average} User Rating </div>
            <div className="text-gray-600  text-2xl font-bold inline">
                {movie.genres.map((ele,index)=>{
                return(
                    <span key={index}>{ele.name} | </span>
                )

            })}<span className="inline">{Math.floor(movie.runtime/60)}h {movie.runtime%60}m </span>
            </div>
            <p className="text-gray-300">{movie.overview} </p>
            <div className="flex gap-10 items-center text-xl">
                <button onClick={scrollToCast} className="hover:bg-[#f84565] duration-500 bg-gray-600 p-4 rounded">Buy Tickets</button>
                 <button className="hover:bg-[#f84565] duration-500 bg-gray-600 p-4 rounded">Watch Trailer</button>
                 
                 <Heart fill={myfav.includes(id) ? "#f84565" : "none"} onClick={()=>setmyfav(prev=>prev.includes(id) ? prev.filter((favId)=>favId!==id) : [...prev,id])} color="#f84565" height={100}></Heart>
            </div>     
        </div> 
            </div>

           <div className="px-[5%] lg:px-[10%] my-20">
            <h2 className="font-bold text-3xl my-20" >Your Favourite Cast</h2>
            <div className="flex gap-3 overflow-x-auto ">
                {
                dummyCastsData.map((ele,idx)=>{
                    return(
                        <div className="flex w-25 flex-col shrink-0 items-center gap-3" key={idx}>
                            <img className="aspect-square h-20 rounded-full object-cover" src={ele.profile_path} alt="" /> 
                            <div className="text-white text-xs text-center font-bold">{ele.name}</div>
                        </div>
                    )
                })
            }  
            </div>

            <div ref={castRef} className="flex flex-col relative  w-full p-5 bg-red-500/15 my-30 border border-red-400/15 rounded-2xl ">
            <Blurcircle top="10%" left="70%"></Blurcircle>
            <div className="font-bold text-xl text-start ">Choose Date</div>
            <div  className="flex gap-3 mt-10 mx-20">
                {/* <span  className="border-2 rounded cursor-pointer p-2 border-rose-400/20">17 Sept</span>
                <span className="border-2 rounded cursor-pointer p-2 border-rose-400/20">18 Sept</span>
                <span className="border-2 rounded cursor-pointer p-2 border-rose-400/20">19 Sept</span>
                <span className="border-2 rounded cursor-pointer p-2 border-rose-400/20">20 Sept</span>
                <span className="border-2 rounded cursor-pointer p-2 border-rose-400/20">21 Sept</span> */}
                {
                    Object.keys(dummyDateTimeData).map((ele,idx)=>{
                        return(
                            <span onClick={()=>setmydate(ele)} key={idx} className={"border-2 rounded cursor-pointer p-2 border-rose-400/20" + (mydate==ele?" bg-rose-400":"")}>
                                {new Date(ele).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                </span>
                        )
                    })
                }
            </div>
            <button onClick={()=> mydate?goto(`${mydate}`):alert('select date')} className="bg-[#f84565] duration-500 w-fit mx-auto  p-3 mt-5 rounded">Book Now</button>
            </div>
          
            <div className="">
             <Featured x="You May Also Like" y="Show More"></Featured>   
            </div>
          
           </div>
        </>
         
     ):<Loading> </Loading>};


export default MovieDetail;