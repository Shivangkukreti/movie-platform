import { useContext } from "react";
import { Appcontext } from "../context";
import Blurcircle from "../components/blurcircle";
import Card from "../components/moviecard";
import { dummyShowsData } from "../assets/assets";
import { useEffect } from "react";

function Favourite() {
    let {myfav,setmyfav,fetchmyfav}=useContext(Appcontext)
    useEffect(()=>{
          window.scrollTo(0,0)
          fetchmyfav()
       },[])
    return myfav.length > 0 ? (
        
       <div className="flex relative flex-col gap-4 px-[5%] my-20 lg:px-[10%]">
            <h2 className="font-bold text-3xl my-20" >You Liked</h2>
            <Blurcircle top="0%" left="0%"></Blurcircle>
            <div className=" grid md:grid-cols-2 z-20 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 w-full">
            {
                myfav.map((ele,index)=>{
                     const movie = dummyShowsData.find((m) => m._id === ele)
                    return(
                        <Card movie={movie} key={index} />
                    )
                })}
            </div>
             <Blurcircle bottom="0%" right="0%"></Blurcircle>
        </div>
     ) : (
        <div className="flex flex-col items-center justify-center h-full py-20">
            <h2 className="font-bold text-3xl my-20" >You haven't liked any movies yet</h2>
        </div>
     );
}

export default Favourite;