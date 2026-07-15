import { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Blurcircle from "../components/blurcircle";


function Mybookings() {
    let [mybookings,setmybookings]=useState([])

    async function getmybooking(params) {
        setmybookings(dummyBookingData)
    }
    console.log(mybookings);
    
   useEffect(()=>{
    getmybooking()
   },[])

    return (
     
        <div className="p-[10%] grid grid-cols-2 max-lg:grid-cols-1 gap-5">
            <Blurcircle top="10%" left="45%"></Blurcircle>
            {mybookings.map((x,idx) => (
                <div className="flex max-xl:flex-col justify-evenly gap-2 relative  w-full p-5 bg-red-500/5  border border-red-400/15 rounded-2xl" key={idx}>
                    <img className="h-30 object-contain rounded-2xl" src={x.show.movie.backdrop_path} alt="" />
                    <div>
                        <h3 className="text-lg font-bold">{x.show.movie.title}</h3>
                        <p className="text-lg font-bold text-gray-500">{x.show.movie.runtime} min</p>
                        <p className="text-md font-bold text-gray-500">{new Date(x.show.showDateTime).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })}</p>

                    </div>
                    <div className="flex flex-col justify-center gap-3 items-center">
                        <h3 className="text-lg text-end [word-spacing:0.5em] font-bold">Seats : {x.bookedSeats} ( {x.bookedSeats.length} ) </h3>
                        <h3 className="text-lg text-end font-bold">Total : ${x.show.showPrice}</h3>
                        {x.isPaid?<p className="text-green-500 font-bold">Paid</p>:<button className="bg-[#007bff] p-2 rounded-2xl font-bold">Pay Now</button>}
                    </div>
                </div>
            ))}
        </div> 
        
     );
}

export default Mybookings;
