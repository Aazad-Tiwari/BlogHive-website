import { login, logout, initializeUserData } from './store/authSlice';
import React , { useEffect, useState } from 'react'
import authService from './appwrite/auth_service'
import { useDispatch, useSelector } from 'react-redux';
import {Header, Footer, Loading} from './components/'
import {Outlet} from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL); // THIS IS FOR CREATE REACT APP
  // console.log(import.meta.env.VITE_APPWRITE_URL);  // FOR VITE

  // console.log(import.meta.env.VITE_API_KEY);
  

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    dispatch(initializeUserData() )

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


 
  return !loading ? <div className=' flex  content-center overflow-x-hidden' >
    <div className='w-full block'>
      <Header/>
      <Outlet/>
      <Footer/>
      <ToastContainer 
          position="top-center" 
          autoClose={2000} 
          hideProgressBar={false} 
          closeOnClick 
          pauseOnHover 
        />
    </div>
  </div> : <Loading/>
}

export default App
