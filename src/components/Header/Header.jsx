import React from 'react'
import { LogoutBtn, Logo, Container } from '../index'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
    <header className='bg-white w-full md:h-[98px] h-20 flex items-center font-roboto shadow-lg shadow-[#7b4ee443]'>
      <nav className='flex w-full max-w-7xl mx-auto items-center justify-between px-4'>
        <div className='flex justify-between items-center'>
          <Link to='/' >
            <Logo />
          </Link>
          <h1 className='pl-5 text-[#333333] xsm:text-xl sm:text-2xl font-bold font-roboto hidden xsm:block'>BloggHive</h1>
        </div>
        <div>
        <ul className='flex items-center xsm:gap-6 gap-4'>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                {item.name == "Get Started ⇛" ? <NavLink to={item.path} className= { ({isActive}) => `lg:px-8 lg:py-3 lg:ml-12 sm:ml-3 xsm:px-2 xsm:py-2 px-1 py-1 font-semibold flex items-center justify-center rounded-lg  ${isActive ? `text-white bg-gray-400` : `bg-blog_blue text-white`}  hover:text-gray-200 duration-300 `}>{item.name}</NavLink>  : <NavLink to={item.path} className=  { ({isActive}) => `font-semibold lg:px-8 lg:py-3 sm:px-2 sm:py-2 lg:mx-12 hover:text-blog_blue duration-300 ${isActive ? `text-blog_blue` : `text-blog_black`} `}>{item.name}</NavLink>}
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