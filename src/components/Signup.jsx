import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth_service'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo, Loading } from './index'
import {toast} from 'react-toastify'



function Signup() {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const create = async (data) => {
    setError('')
    setLoading(true)
    try {
      const userData = await authService.createAccount(data)
      if (!userData || userData instanceof Error ) {
        toast.error("Something Went Wrong")
        throw new Error(userData.message);
      }
      setLoading(false)
      toast.success('Account Created Please Login')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }


  return loading ? <Loading/> : (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 flex justify-center'>
          <span className='w-full max-w-[100px] flex justify-center items-center'>
            <Logo />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Already have an account?&nbsp;
          <Link
            to='/login'
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Login
          </Link>
        </p>
        {error && <p className='text-red-600 mt-4 mb-5 text-center'>
          {error}
        </p>}

        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            <Input
              label="Full Name:"
              placeholder='Enter your full name'
              {...register('name', {
                required: true
              })}
            />
            <Input
              label='Email:'
              placeholder='Enter your email'
              type='email'
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must be a valid address"
                }
              })}
            />
            <Input
              label='Password:'
              placeholder='Enter your password'
              type='password'
              {...register("password", {
                required: true
              })}
            />
            <Button type='submit' className='w-full'>Create Account</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup