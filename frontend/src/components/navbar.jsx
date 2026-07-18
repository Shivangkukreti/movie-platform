import { assets } from "../assets/assets";
import { useNavigate,NavLink } from "react-router-dom";
import {useClerk, useUser,UserButton} from "@clerk/react"
import {Search,MenuIcon,XIcon, X, User, TicketPlus} from "lucide-react"
import { use, useEffect, useState } from "react";

function Navbar() {
    let goto=useNavigate()
    let {user} = useUser()
    let {openSignIn} = useClerk()
    let [show,setshow]=useState(false)

     const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Change after 20px
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
    return ( 
        <div className={` z-50 sticky top-0 flex px-[5%] lg:px-[10%]  shadow items-center justify-between duration-500 py-2 h-20 ${scrolled ? "bg-black/80" : "bg-transparent"}`}>
           <div className="">
            <img onClick={()=>goto('/')} src={assets.logo} alt="" />
           </div>
           
           <div className={ `flex max-md:fixed duration-500 max-md:top-0 max-md:bottom-0  max-md:right-0 max-md:flex-col max-md:w-full max-md:justify-center max-md:items-center  max-md:backdrop-blur  text-xs gap-6 md:rounded-4xl max-md:bg-black/70  lg:text-xl w-fit py-3 px-8 font-medium bg-white/10 border border-gray-200/20 ${show?"max-md:left-0 ":"max-md:-left-full"} `}>
            <XIcon onClick={()=>setshow(false)} className="text-white absolute top-4 right-4 md:hidden" />
            <NavLink onClick={()=>setshow(false)} to={"/"} className={({isActive})=>isActive?"text-[#f84565] underline-offset-5 duration-500 underline":"text-white"}>Home</NavLink>
            <NavLink onClick={()=>setshow(false)} to={"/movies"} className={({isActive})=>isActive?"text-[#f84565] underline-offset-5 duration-500 underline":"text-white"}>Movies</NavLink>
            <NavLink onClick={()=>setshow(false)} to={"/favourite"} className={({isActive})=>isActive?"text-[#f84565] underline-offset-5 duration-500 underline":"text-white"}>Favourites</NavLink>
            <NavLink onClick={()=>setshow(false)} to={"/admin"} className={({isActive})=>isActive?"text-[#f84565] underline-offset-5 duration-500 underline":"text-white"}>Dashboard</NavLink>
           </div>


           <div className="flex items-center gap-4">
            <Search className="text-white" />
           {user? <UserButton >
            <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}></TicketPlus>} onClick={()=>goto('/mybookings')} />
            </UserButton.MenuItems>
           </UserButton> : <button className="font-medium text-xl rounded-3xl bg-[#f84565] px-8 py-2" onClick={() => openSignIn()}>Login</button>}
           <MenuIcon onClick={()=>setshow(true)} className="text-white md:hidden " />
           </div>
           
        </div>
     );
}

export default Navbar;