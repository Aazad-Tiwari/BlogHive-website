import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth_service'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo, Loading } from './index'
import { toast } from 'react-toastify'



function Signup() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const create = async (data) => {
    setError('')
    setLoading(true)
    try {
      const userData = await authService.createAccount(data)
      if (!userData || userData instanceof Error) {
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


  return loading ? <Loading message='adding a new member' /> : (
    <div className='flex items-center justify-center '>
      <div className='mx-auto w-full max-w-lg bg-gray-100 xxsm:space-y-5 xsm:space-y-3 rounded-xl p-10 border border-black/10 shadow-xl shadow-[#7b4ee49f]'>
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
                required: 'name is required'
              })}
            />
            {errors.name && <p className="text-red-500 mb-1 -mt-3">{errors.name.message}</p>}
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
            <Button type='submit' className='w-full'>Create Account</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup