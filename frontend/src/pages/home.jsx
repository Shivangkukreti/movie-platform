import { useEffect } from "react";
import { assets } from "../assets/assets";
import Featured from "../components/featured";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Trailer from "../components/trailer";

function Home() {
   

    return ( 
        <div className="overflow-hidden px-[5%] lg:px-[10%]">
           <Hero></Hero>
           <Featured x="Now Showing" y="View All"></Featured>
           <Trailer></Trailer>
          
        </div>
     );
}

export default Home;