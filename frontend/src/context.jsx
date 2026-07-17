import {  createContext, useState } from 'react';
import { useAuth } from "@clerk/react"
export const Appcontext= createContext()


function Appcontextprovider({children}) {

let [myfav,setmyfav]=useState([])
let [mybookings,setmybookings]=useState([])
const { getToken } = useAuth();
async function fetchmyfav(){
  
    
    const token = await getToken();
console.log(token);
}





let value={myfav,setmyfav,mybookings,setmybookings,fetchmyfav} 

    return ( 
    <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
     );
}

export default Appcontextprovider;
