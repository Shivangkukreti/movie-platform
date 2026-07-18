import { useEffect, useState } from 'react'
import { Route,Routes, useLocation,Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import Movies from './pages/movies'
import MovieDetail from './pages/moviedetail'
import Mybookings from './pages/mybook'
import Seatlayout from './pages/seatlayout'
import Favourite from './pages/fav'
import Footer from './components/footer'
import Dash from './pages/dashboard'
import { useContext } from 'react'
import { Appcontext } from './context'
import Maindash from './components/maindash'
import Addshow from './components/addshow'
import Listshows from './components/showlisting'
import Allbook from './components/allbooking'
import { toast, ToastContainer } from 'react-toastify'


function App() {


   const location = useLocation();
  let {user}=useContext(Appcontext)
  const isAdmin = location.pathname.startsWith("/admin");

  return (
   <>
   {!isAdmin && <Navbar/>}
   <ToastContainer></ToastContainer>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/movies' element={<Movies></Movies>}/>
      <Route path='/movies/:id' element={<MovieDetail></MovieDetail>}/>
      <Route path='/mybookings' element={<Mybookings></Mybookings>}/>
      <Route path='/movies/:id/:date' element={<Seatlayout></Seatlayout>}/>
      <Route path='/favourite' element={<Favourite></Favourite>}/>
      <Route path='/admin' element={ <Dash></Dash>} >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path='addshows' element={<Addshow></Addshow>} />
        <Route path='listshows' element={<Listshows></Listshows>} />
        <Route path='listbookings' element={<Allbook></Allbook>} />
        <Route  path='dashboard' element={<Maindash></Maindash>} />
      </Route>
      <Route path='*' element={<h1 className='text-center h-screen flex justify-center items-center text-6xl font-bold'>404 Not Found !</h1>}/>
    </Routes>
    {!isAdmin && <Footer></Footer>}
   </>
  )
}

export default App
