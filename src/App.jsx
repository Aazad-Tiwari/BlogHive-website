import { login, logout } from './store/authSlice';
import React , { useEffect, useState } from 'react'
import authService from './appwrite/auth_service'
import { useDispatch } from 'react-redux';
import {Header, Footer} from './components/'
import {Outlet} from 'react-router-dom'
import './App.css'
import { initializeLastPost } from './store/postSlice';

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL); // THIS IS FOR CREATE REACT APP
  // console.log(import.meta.env.VITE_APPWRITE_URL);  // FOR VITE

  console.log(import.meta.env.VITE_API_KEY);
  

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect (() => {

    dispatch(initializeLastPost())

    authService.getCurrentUser()
    .then( (userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch( (err) => {
      console.error()
      dispatch(logout())
    })
    .finally( () => setLoading(false));

  }, [])

 
  return !loading ? <div className=' flex flex-wrap content-center ' >
    <div className='w-full block'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  </div> : null
}

export default App
