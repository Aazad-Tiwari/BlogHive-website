import { login, logout, initializeUserData } from './store/authSlice';
import React , { useEffect, useState } from 'react'
import authService from './appwrite/auth_service'
import { useDispatch } from 'react-redux';
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

   useEffect(() => {
        const fetchAndValidateUser = async () => {
            try {
                dispatch(initializeUserData());

                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData)); 
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Error validating user session:", error);
                dispatch(logout());
            } finally {
                setLoading(false); 
            }
        };

        fetchAndValidateUser();
    }, [dispatch]);

 
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
