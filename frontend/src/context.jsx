import {  createContext, useState } from 'react';

export const Appcontext= createContext()


function Appcontextprovider({children}) {

let [myfav,setmyfav]=useState([])
let [mybookings,setmybookings]=useState([])






let value={myfav,setmyfav,mybookings,setmybookings} 

    return ( 
    <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
     );
}

export default Appcontextprovider;
