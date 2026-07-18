import {  createContext, useState } from 'react';
import { useAuth, useUser } from "@clerk/react"
import axios from 'axios';
export const Appcontext= createContext()
import {toast} from 'react-toastify'
import { useEffect } from 'react';


function Appcontextprovider({children}) {

let api=import.meta.env.VITE_BACKEND_URL
let [myfav,setmyfav]=useState([])
let [allshows,setallshows]=useState([])
let [activeshows,setactiveshows]=useState(null)
let [allbookings,setallbookings]=useState(null)
let [dashdata,setdashdata]=useState({totalRevenue:0,totalBookings:0,activeShows:0,totalUsers:0})
let [mybookings,setmybookings]=useState(null)
let {getToken}=useAuth()
let {user}=useUser()

// async function fetchadmin() {
//     try {
//         let token=await getToken()
//         let {data}=await axios.get(api+"/user/getuser",{headers:{Authorization:`Bearer ${token}`}})

//     } catch (error) {
//         toast.error(error.message)
//     }
// }





async function getmybookings() {
    try{
        let token=await getToken()
        let {data}=await axios.get(api+"/booking/mybookings",{headers:{Authorization:`Bearer ${token}`}})
        if (data.success) {
            setmybookings(data.bookings)
        }else{
            toast.error(data.message)
        }
    }catch(error){
        toast.error(error.message)
    }
}


async function getallshows() {
    try {
        let {data}=await axios.get(api+'/show/nowshowing')
        if (data.success) {
            setallshows(data.movies)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

async function fetchmyfav() {
    try {
        let token=await getToken()
        let {data}=await axios.get(api+'/user/getfavourites',{headers:{Authorization:`Bearer ${token}`}})
        if (data.success) {
            setmyfav(data.favoriteMovies)
        }
    } catch (error) {
        toast.error(error.message)
    }
}



async function getdashdata() {
    let token=await getToken()
    let {data}=await axios.get(api+'/dashboard/data',{headers:{Authorization:`Bearer ${token}`}})
    
    if (data.success) {
        setdashdata(prev=>({...prev,totalRevenue:data.dashboarddata.totalRevenue,
            totalUsers:data.dashboarddata.totalUsers,
            totalBookings:data.dashboarddata.totalBookings.length,
            activeShows:data.dashboarddata.activeShows.length}))
        setallbookings(data.dashboarddata.totalBookings)
        setactiveshows(data.dashboarddata.activeShows)
    }
}



useEffect(()=>{
    getallshows()
    
},[])

useEffect(()=>{
    if (user) {
        fetchmyfav()
        getdashdata()
        getmybookings()

    }
},[user])

let value={myfav,setmyfav,mybookings,setmybookings,
    api,allshows,user,getallshows,fetchmyfav,dashdata,getdashdata,
    allbookings,activeshows,getmybookings} 

    return ( 
    <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
     );
}

export default Appcontextprovider;
