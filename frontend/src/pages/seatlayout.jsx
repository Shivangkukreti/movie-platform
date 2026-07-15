import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blurcircle from "../components/blurcircle";
import { useContext } from "react";
import { Appcontext } from "../context";
import { assets, dummyDateTimeData } from "../assets/assets";

function Seatlayout() {
  let { id, date } = useParams();
  let {mybookings,setmybookings}=useContext(Appcontext)
  const [formdata, setform] = useState({
    movieid: id,
    date,
    seatnumber: [],
    time: null,
  });
  let [availableTimes, setavailableTimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    Object.entries(dummyDateTimeData).forEach(([key, value]) => {
      if (key == date) {
        setavailableTimes(value);
      }
    });
    window.scrollTo(0, 0);
  }, [id, date]);

  function handleall(event) {
    const { name, value } = event.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formdata);
  }

  function handlesubmit(event) {
    event.preventDefault();
    console.log(formdata);
    setmybookings((prev) => [...prev, formdata]);
    setform({
      movieid: id,
      date,
      seatnumber: [],
      time: null,
    });
    setSelectedSeats([]);
  }

  const handleSeatClick = (seatId) => {
    if (!formdata.time) {
      alert("Please select a time slot first.");
      return;
    }
    if(selectedSeats.length >= 5 && !selectedSeats.includes(seatId)) {
      alert("You can select a maximum of 5 seats.");
      return;
    }
    setSelectedSeats((prev) => {
      const updated = prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId];

      setform((form) => ({
        ...form,
        seatnumber: updated,
      }));
      

      return updated;
    });
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex justify-center gap-2 mt-3">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;

          return (
            <button
              key={seatId}
              type="button"
              onClick={() => handleSeatClick(seatId)}
              className={`h-9 w-9 rounded border text-sm transition-all duration-200
              ${
                selectedSeats.includes(seatId)
                  ? "bg-[#f84565] border-[#f84565] text-white"
                  : "border-gray-500 hover:bg-[#f84565]/20"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="px-[5%] lg:px-[10%] overflow-hidden ">
      <div className="flex flex-col relative  w-full p-5 bg-red-500/15 my-30 border border-red-400/15 rounded-2xl ">
        <Blurcircle top="0%" left="70%"></Blurcircle>
        <div className="font-bold flex   text-xl text-start ">
          Choose Time Slot
        </div>
        <div className="flex gap-5 mt-5">
          {availableTimes.map((ele, idx) => {
            return (
              <button
                name="time"
                value={ele}
                onClick={handleall}
                key={idx}
                className={
                  "border-2 rounded  cursor-pointer p-2 border-rose-400/20" +
                  (formdata.time === ele ? " bg-rose-400/20" : "")
                }
              >
                {new Date(ele).toLocaleTimeString("en", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            );
          })}
        </div>{" "}
      </div>

      <div className="flex gap-5 my-20 items-center flex-col">
        <h1 className="font-bold     text-3xl text-center ">Select Seats</h1>
        <img className="w-[80%] mx-auto" src={assets.screenImage} alt="" />
        <p className="text-gray-500 font-bold">Screen Side</p>
        <div>
          <div className="mt-8">
            {renderSeats("A")}
            {renderSeats("B")}
            {renderSeats("C")}
            {renderSeats("D")}
            {renderSeats("E")}
            {renderSeats("F")}
          </div>
        </div>
        <button onClick={handlesubmit} className="bg-[#f84565] duration-500 w-fit mx-auto  p-3 mt-5 rounded">
          Payment
        </button>
      </div>
    </div>
  );
}

export default Seatlayout;
