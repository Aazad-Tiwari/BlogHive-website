import { login, logout, initializeUserData } from './store/authSlice';
import React , { useEffect, useState } from 'react'
import authService from './appwrite/auth_service'
import { useDispatch, useSelector } from 'react-redux';
import {Header, Footer} from './components/'
import {Outlet} from 'react-router-dom'
import './App.css'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL); // THIS IS FOR CREATE REACT APP
  // console.log(import.meta.env.VITE_APPWRITE_URL);  // FOR VITE

  // console.log(import.meta.env.VITE_API_KEY);
  

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    dispatch(initializeUserData() )

    // If the user is logged in, fetch the current user data
    if (authStatus) {
      const fetchCurrentUser = async () => {
        try {
          const userData = await authService.getCurrentUser(); 
          if (userData) {
            dispatch(login(userData));
            
          } else {
            dispatch(logout());
          }
        } catch (err) {
          console.log('aazad bhai',err);
          dispatch(logout());
        } finally {
          setLoading(false);
        }
      };

      fetchCurrentUser();
    } else {
      // If not logged in, directly set loading to false
      setLoading(false);
    }
  }, [dispatch, authStatus]); // Only run this effect when authStatus changes


 
  return !loading ? <div className=' flex flex-wrap content-center ' >
    <div className='w-full block'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  </div> : null
}

export default App
