import { useEffect } from "react";
import { useContext } from "react";
import { Appcontext } from "../context";
import { assets } from "../assets/assets";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  DatabaseSearch,
  ListCheckIcon,
  ListTreeIcon,
  PlusSquare,
} from "lucide-react";
import Blurcircle from "../components/blurcircle";

function Dash() {
 
  let goto = useNavigate();
  useEffect(() => {
    goto("/admin/dashboard");
    
  }, []);

  return (
    <>
      <div className=" h-fit border-b border-white/30 py-5">
        <img onClick={()=>goto("/")} className="px-[3%] cursor-pointer z-10" src={assets.logo} alt="" />
      </div>
      <Blurcircle top="-5%" left="-5%" ></Blurcircle>
      <div className="flex">
        <div className="border-r  border-white/30 w-20 lg:min-w-65 h-[calc(100vh-58px)] py-10 ">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img className="h-30 z-10 max-lg:h-10 rounded-full" src={assets.profile} alt="" />
            <p className="font-bold text-lg">Admin</p>
          </div>

          <div className="  text-center">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `w-full gap-2 text-gray-600 flex font-bold p-5  text-xl ${isActive ? "bg-red-400/30 border-r-4 rounded-r-full border-rose-600 duration-500 text-rose-600" : ""}`
              }
            >
              <DatabaseSearch></DatabaseSearch> <p className="max-lg:hidden w-full">Dashboard</p>
            </NavLink>
          </div>
          <div className=" text-center">
            <NavLink
              to="/admin/addshows"
              className={({ isActive }) =>
                `  gap-2  flex text-gray-600 font-bold p-5  text-xl ${isActive ? "bg-red-400/30 border-r-4 rounded-r-full border-rose-600 duration-500 text-rose-600" : ""}`
              }
            >
              <PlusSquare></PlusSquare> <p className="max-lg:hidden w-full">Add Shows</p>
            </NavLink>
          </div>
          <div className=" text-center">
            <NavLink
              to="/admin/listshows"
              className={({ isActive }) =>
                ` gap-2  flex text-gray-600 font-bold p-5  text-xl ${isActive ? "bg-red-400/30 border-r-4 rounded-r-full border-rose-600 duration-500 text-rose-600" : ""}`
              }
            >
              <ListTreeIcon></ListTreeIcon> <p className="max-lg:hidden w-full">List Shows</p>
            </NavLink>
          </div>
          <div className=" text-center">
            <NavLink
              to="/admin/listbookings"
              className={({ isActive }) =>
                ` gap-2 flex text-gray-600 font-bold p-5  text-xl ${isActive ? "bg-red-400/30 border-r-4 rounded-r-full border-rose-600 duration-500 text-rose-600" : ""}`
              }
            >
              <ListCheckIcon></ListCheckIcon> <p className="max-lg:hidden w-full">List Bookings</p>
            </NavLink>
          </div>
        </div>
        <div className="m-10">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Dash;
