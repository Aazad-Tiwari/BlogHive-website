import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth_service'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo, Loading } from './index'
import { toast } from 'react-toastify'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState : {errors} } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const login = async (data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (!session || session instanceof Error) {
                toast.error("Something Went Wrong")
                throw new Error(session.message);
            }
            const userData = await authService.getCurrentUser()
            if (userData) {
                toast.success('Login Successful')
                dispatch(authLogin(userData))
                setLoading(false)
                navigate("/")
            }

        } catch (error) {
            setLoading(false)
            setError(error.message)
            
        }
    }

    return loading ? <Loading/> : (
        <div className='flex items-center justify-center w-full '>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 xxsm:space-y-5 xsm:space-y-3  shadow-xl shadow-[#7b4ee47a]`} >
                <div className='mb-2 flex justify-center'>
                    <span className='w-full justify-center items-center flex '>
                        <Logo />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to='/signup'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-4 mb-5 text-center'>
                    {error}
                </p>}
                <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label='Email:'
                            placeholder='Enter your email'
                            type='email'
                            {...register("email", {
                                required: 'email is required',
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must be a valid address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 mb-1 -mt-3">{errors.email.message}</p>}
                        <Input
                            label='Password:'
                            placeholder='Enter your password'
                            type='password'
                            {...register("password", {
                                required: 'password is required'
                            })}
                        />
                        {errors.password && <p className="text-red-500 mb-1 -mt-3">{errors.password.message}</p>}
                        <Button
                            type='submit'
                            className='w-full'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login