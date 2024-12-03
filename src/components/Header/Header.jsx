import React from 'react'
import { LogoutBtn, Logo, Container } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

  const authStatus = useSelector(state => state.auth.status)            
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: "Login",
      path: '/login',
      active: authStatus ? false : true,
    },
    {
      name: 'Get Started ⇛',
      path: '/signup',
      active: authStatus ? false : true,
    },
    {
      name: 'Blogs',
      path: '/all-posts',
      active: authStatus ? true : false,
    },
    {
      name: 'Add ⇛',
      path: '/add-post',
      active: authStatus ? true : false,
    }

  ]

  return (
    <header className='bg-white w-full h-[98px] flex items-center font-roboto'>
      <nav className='flex w-full max-w-7xl mx-auto justify-between px-4'>
        <div className='flex justify-between items-center'>
          <Link to='/' >
            <Logo />
          </Link>
          <h1 className='pl-5 text-[#333333] text-2xl font-bold font-roboto'>Bloggs</h1>
        </div>
        <div>
        <ul className='flex '>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                {item.name == "Get Started ⇛" ? <button onClick={() => navigate(item.path)} className='px-8 py-3 ml-12 font-semibold flex items-center justify-center rounded-lg text-white bg-blog_blue hover:text-gray-200 duration-300 '>{item.name}</button>  : <button onClick={() => navigate(item.path)} className='font-semibold px-8 py-3 mx-12 text-blog_black hover:text-blog_blue duration-300 '>{item.name}</button>}
              </li>
            ) : null)}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header