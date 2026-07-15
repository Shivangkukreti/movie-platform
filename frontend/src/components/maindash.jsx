import { UserAvatar } from "@clerk/react";
import { BadgeDollarSign, Currency, GitGraph, PlayCircle, TicketPercent, User2Icon } from "lucide-react";
import { dummyShowsData } from "../assets/assets";
import Card from "./moviecard";

function Maindash() {
    return ( 
         <div className="w-[70%]">
        <h1 className="text-4xl">Admin <p className="text-rose-600 inline">Dashboard</p></h1>
        <div className="flex flex-wrap gap-4">
            <div className="bg-rose-700/20 w-fit  flex-2  px-6 py-4 border flex flex-col gap-2 border-rose-500/30 rounded-2xl ">
            <p className="text-2xl text-center max-sm:text-sm font-bold">Total Bookings</p>
            <div className="flex justify-evenly items-center">
                <span className="text-2xl font-bold">1527</span>
                <TicketPercent></TicketPercent>
                </div></div>
            <div className="bg-rose-700/20 flex-2 w-fit px-6 py-4 border flex flex-col gap-2 border-rose-500/30 rounded-2xl ">
            <p className="text-2xl text-center max-sm:text-sm font-bold">Total Revenue</p>
            <div className="flex justify-evenly items-center">
                <span className="text-2xl font-bold">$25,430</span>
                <BadgeDollarSign></BadgeDollarSign>
                </div></div>
            <div className="bg-rose-700/20 flex-2 w-fit px-6 py-4 border flex flex-col gap-2 border-rose-500/30   rounded-2xl ">
            <p className="text-2xl text-center max-sm:text-sm font-bold">Action Shows</p>
            <div className="flex justify-evenly items-center">
                <span className="text-2xl font-bold">12</span>
                <PlayCircle></PlayCircle>
                </div></div>
            <div className="bg-rose-700/20  flex-2 w-fit  px-6 py-4 border flex flex-col gap-2 border-rose-500/30   rounded-2xl ">
            <p className="text-2xl text-center max-sm:text-sm font-bold">Total Users</p>
            <div className="flex justify-evenly items-center">
                <span className="text-2xl font-bold">1,234</span>
                <User2Icon></User2Icon>
                </div></div>

                
                     <div className=" flex overflow-x-auto gap-5 md:gap-10 w-full">
            {
                dummyShowsData.map((ele,index)=>{
                    return(
                        <Card movie={ele} key={index} />
                    )
                })}
            </div>
              
        </div>
        </div>
     );
}

export default Maindash;