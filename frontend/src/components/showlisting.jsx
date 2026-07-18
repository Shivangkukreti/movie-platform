import { dummyDashboardData } from "../assets/assets";
import { useContext } from "react";
import { Appcontext } from "../context";

function Listshows() {
    let {activeshows}=useContext(Appcontext)

    
    return ( 
        <>
        <h1 className="text-4xl">List <p className="text-rose-600 inline">Shows</p></h1>
        <table>
            <thead>
                <tr className="bg-rose-600/30 font-extrabold max-md:text-xs">
                    <td className="p-3 rounded-tl-2xl">Movie name</td>
                    <td className="p-3 ">Show Time</td>
                    <td className="p-3 ">Total Bookings</td>
                    <td className="p-3 rounded-tr-2xl">Earnings</td>
                </tr>
            </thead>
            <tbody>
                {
                    
                    
                    activeshows?activeshows.map((item,index)=>{
                        return(
                            <tr key={index} className="border-b max-md:text-xs border-rose-600/30">
                                <td className="p-3 ">{item.movie.title}</td>
                                <td className="p-3 ">{new Date(item.showDateTime).toLocaleString("en",{"dateStyle":"medium","timeStyle":"short"})}</td>
                                <td className="p-3 text-center ">{ Object.keys(item.occupiedSeats).length}</td>
                                <td className="p-3 text-end ">$ {item.showPrice* Object.keys(item.occupiedSeats).length}</td>
                            </tr>
                        )
                    })
                :<tr><td className="text-center text-gray-500 py-4">No shows available.</td></tr>}
            </tbody>
        </table>
        </>
     );
}

export default Listshows;