import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blurcircle from "../components/blurcircle";
import { useContext } from "react";
import { Appcontext } from "../context";
import { assets, dummyDateTimeData } from "../assets/assets";
import { toast } from "react-toastify";
import { getToken } from "@clerk/react";
import axios from "axios";

function Seatlayout() {
  let { id, date } = useParams();
  let { mybookings, setmybookings, activeshows, api, getmybookings } =
    useContext(Appcontext);
  let [myshows, setmyshows] = useState([]);
  let [showid, setshowid] = useState(null);
  let [selectedTime, setselectedTime] = useState(null);
  let [occupiedSeats, setOccupiedSeats] = useState([]);
  let [availableTimes, setavailableTimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  
  async function getoccupiedseats() {
    try {
      let { data } = await axios.get(api + "/show/getoccupiedseats/" + showid);
      if (data.success) {
        let occupiedSeats = data.seats;
        setOccupiedSeats(occupiedSeats);
        // console.log(occupiedSeats);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    let x = activeshows?.filter(
      (ele) => ele.movie._id == id && ele.showDateTime.slice(0, 10) == date,
    );
    x ? setmyshows(x) : setmyshows([]);
    let times = x?.map((ele) => ele.showDateTime);
    times ? setavailableTimes(times) : setavailableTimes([]);

    window.scrollTo(0, 0);
  }, [id, date, activeshows]);


  useEffect(() => {
  if (!selectedTime) return;

  const show = myshows.find(
    ele => ele.showDateTime === selectedTime
  );

  if (show) {
    setshowid(show._id);
  }
}, [selectedTime, myshows]);
useEffect(() => {
  if (!showid) return;

  getoccupiedseats();
}, [showid]);

  async function handlesubmit(event) {
    if (!showid) {
      toast.error("Please select a time slot.");
      return;
    }
    try {
      let { data } = await axios.post(
        api + "/booking/bookshow",
        {
          showid: showid,
          selectedseats: selectedSeats,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );
      if (data.success) {
        window.location.href = data.url;
        getmybookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setSelectedSeats([]);
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      toast.error("Please select a time slot first.");
      return;
    }
    if (selectedSeats.length >= 5 && !selectedSeats.includes(seatId)) {
      toast.error("You can select a maximum of 5 seats.");
      return;
    }
    setSelectedSeats((prev) => {
      const updated = prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId];

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
                  ? "bg-[#f84565] border-[#f84565] text-white "
                  : "border-gray-500 hover:bg-[#f84565]/20 "
              }
              ${
                occupiedSeats.includes(seatId)
                  ? "bg-gray-500 border-gray-500 text-white cursor-not-allowed"
                  : ""
              }
              `}
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
                onClick={() => setselectedTime(ele)}
                key={idx}
                className={
                  "border-2 rounded  cursor-pointer p-2 border-rose-400/20" +
                  (selectedTime === ele ? " bg-rose-400/20" : "")
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
        <button
          onClick={handlesubmit}
          className="bg-[#f84565] duration-500 w-fit mx-auto  p-3 mt-5 rounded"
        >
          Payment
        </button>
      </div>
    </div>
  );
}

export default Seatlayout;
