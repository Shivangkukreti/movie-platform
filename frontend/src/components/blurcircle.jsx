function Blurcircle({ top = "auto", left = "auto", right = "auto", bottom = "auto" }) {
    return ( 
       <div className="absolute -z-5 h-80 w-80  aspect-square  rounded-full bg-[#f84565]/50 blur-3xl" style={{ top, left, right, bottom }}>

       </div>
     );
}

export default Blurcircle;