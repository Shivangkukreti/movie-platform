import { ArrowBigRight, ArrowRight, Calendar, Watch } from "lucide-react";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <>
      <section className="  absolute top-0 left-0 -z-2">
        <img
          src={assets.back}
          alt="Hero background"
          className="h-screen object-cover w-screen "
        />
      </section>
      <div className="flex-col gap-4 flex relative justify-center px-[5%] lg:px-[10%]  items-start h-screen">
        <img className="block" src={assets.marvelLogo} alt="" />
        <p className="lg:text-8xl text-6xl  font-bold text-white  text-start">
          Guardians of <br></br> the Galaxy
        </p>
        <p className="text-lg text-start space-x-2 font-bold text-white ">
          Action | Adventure | Sci-fi &nbsp;
          <Calendar className="inline"></Calendar> 2018{" "}
          <Watch className="inline"></Watch>2h 8m
        </p>
        <p>
          In a post-apocalyptic world where cities ride on wheels and consume
          each other to survive, two people meet in London and try to stop a
          conspiracy.
        </p>
        <button className="flex gap-2 rounded-3xl bg-[#f84565] px-4 py-2 justify-center items-center">
          Explore More <ArrowRight></ArrowRight>{" "}
        </button>
      </div>
    </>
  );
}

export default Hero;
