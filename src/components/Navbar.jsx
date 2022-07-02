import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import ToggleTheme from './ToggleTheme'


const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  }

  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold'>
      <Link to='/'>
        <h1 className='text-2xl'>Cryptowatch</h1>
      </Link>
      <div className='hidden md:block'>
        <ToggleTheme />
      </div>
      <div className='hidden md:block'>
        <Link to='/sign-in' className='p-4 hover:text-accent'>Sign In</Link>
        <Link to='/sign-up' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>Sign Up</Link>
      </div>
      <div className='block md:hidden cursor-pointer z-10' onClick={toggleNav}>
        {
          nav ? <AiOutlineClose size={30}/> : <AiOutlineMenu size={30}/>
        }
      </div>
      <div className={
        nav 
        ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-500 z-10'
        : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-500'}>
        <ul className='w-full p-4'>
          <li className='border-b py-6'>
            <Link to='/'>Home</Link>
          </li>
          <li className='border-b py-6'>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li className=' py-6'>
            <ToggleTheme />
          </li>
        </ul>
        <div className='flex flex-col w-full p-4'>
          <Link to='/sign-in'>
            <button className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button>
          </Link>
          <Link to='/sign-up'>
            <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar