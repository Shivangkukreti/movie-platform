import { ArrowRight } from "lucide-react";
import { assets, dummyShowsData } from "../assets/assets";
import Card from "./moviecard";
import Blurcircle from "./blurcircle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Appcontext } from "../context";

function Featured({ x,y }) {
    let goto=useNavigate()
    let{allshows}=useContext(Appcontext)
    return ( 
        <div className="flex relative flex-col gap-4 ">
            <h2 className="font-bold text-3xl my-20" > {x} </h2>
            <Blurcircle top="0%" left="0%"></Blurcircle>
            <div className=" grid md:grid-cols-3  z-20 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 w-full">
            {
                allshows?.slice(0,4).map((ele,index)=>{
                    return(
                        <Card movie={ele} key={index} />
                    )
                })}
            </div>
            <button onClick={()=>goto('/movies')} className="bg-[#f84565]  py-2 w-fit block mx-auto px-8 rounded-3xl  "> {y}
                <ArrowRight className="inline ml-2"></ArrowRight>
            </button>
        </div>
     );
}

export default Featured;