import { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import Blurcircle from "./blurcircle";
import ReactPlayer from "react-player";

function Trailer() {
  let [trailers, settrailers] = useState(dummyTrailers[0]);

  return (
    <div className=" flex flex-col relative  gap-4 px-[5%] lg:px-[10%] my-20 ">
      <h2 className="font-bold text-3xl my-20">Trailers</h2>
      <Blurcircle top="0%" left="90%"></Blurcircle>
      <div className="self-center w-[80%]  flex justify-center items-center rounded-2xl ">
        <ReactPlayer
          className="mx-auto"
          width={"100%"}
          height={500}
          src={trailers.videoUrl}
        />
      </div>
      <div className="flex gap-5 group flex-wrap justify-center my-10">
        {
            dummyTrailers.map((ele, index) => {
                return(
                    <div onClick={() => settrailers(ele)} key={index}>
                       <img className="w-40 hover:opacity-100 duration-500 hover:scale-103 group-hover:opacity-40 rounded-2xl" src={ele.image} alt="" />
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}

export default Trailer;
