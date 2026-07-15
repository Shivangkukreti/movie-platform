import { ArrowRight } from "lucide-react";
import Blurcircle from "../components/blurcircle";
import Card from "../components/moviecard";
import { dummyShowsData } from "../assets/assets";
import { useEffect } from "react";

function Movies() {
     useEffect(()=>{
          window.scrollTo(0,0)
       },[])
    return ( 
        
       <div className="flex relative flex-col gap-4 px-[5%] my-20 lg:px-[10%]">
            <h2 className="font-bold text-3xl my-20" >Now Showing</h2>
            <Blurcircle top="0%" left="0%"></Blurcircle>
            <div className=" grid md:grid-cols-2 z-20 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 w-full">
            {
                dummyShowsData.map((ele,index)=>{
                    return(
                        <Card movie={ele} key={index} />
                    )
                })}
            </div>
             <Blurcircle bottom="0%" right="0%"></Blurcircle>
        </div>
     );
}

export default Movies;