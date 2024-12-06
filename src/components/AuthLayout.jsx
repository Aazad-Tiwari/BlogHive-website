import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from './Loading'

export default function Protected({children,authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authStatus !== authentication){
            navigate(authentication ? '/login' : '/')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <Loading/> : <> {children} </>
}
