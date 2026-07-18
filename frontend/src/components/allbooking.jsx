import { dummyDashboardData } from "../assets/assets";
import { useContext } from "react";
import { Appcontext } from "../context";
import { split } from "postcss/lib/list";

function Allbook() {
    let {allbookings}=useContext(Appcontext)
    // console.log(allbookings);
    
     return ( 
        <>
        <h1 className="text-4xl">List <p className="text-rose-600 inline">Bookings</p></h1>
        <table>
            <thead>
                <tr className="bg-rose-600/30 font-extrabold max-md:text-xs">
                    <td className="p-3 rounded-tl-2xl">Username</td>
                    <td className="p-3 ">Show Time</td>
                    <td className="p-3 ">Movie</td>
                    <td className="p-3 ">Seat</td>
                    <td className="p-3 rounded-tr-2xl">Earnings</td>
                </tr>
            </thead>
            <tbody>
                {
                    
                    
                    allbookings?allbookings.map((item,index)=>{
                        return(
                            <tr key={index} className="border-b max-md:text-xs border-rose-600/30">
                                <td className="p-3 ">{item.user.name}</td>
                                <td className="p-3 ">{new Date(item.show.showDateTime).toLocaleString("en",{"dateStyle":"medium","timeStyle":"short"})}</td>
                                <td className="p-3 text-center ">{ item.show.movie.title}</td>
                                <td className="p-3 text-center ">{ item.bookedSeats.join(" ")}</td>
                                <td className="p-3 text-end ">$ {item.amount}</td>
                            </tr>
                        )
                    })
                :<tr><td className="text-center text-gray-500 py-4">No bookings available.</td></tr>}
            </tbody>
        </table>
        </>
     );
}

export default Allbook;