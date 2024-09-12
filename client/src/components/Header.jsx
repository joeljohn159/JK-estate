import React from 'react';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const user = useSelector(state => state.user);
  return (
    <header className='bg-slate-200 shadow-sm'>
        <div className='flex justify-between max-w-6xl items-center mx-auto p-3' >
            <Link to= "/">
            <h1 className='font-medium sm:font-bold text-md sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>JK</span>
                <span className='text-slate-900'>Estate</span>
            </h1>
            </Link>
            {/* <h1 className='font-medium sm:font-bold text-md sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>JK</span>
                <span className='text-slate-900'>Estate</span>
            </h1> */}
            <form className='bg-slate-100 p-1 sm:p-2 rounded flex items-center'>
                <input type="text" placeholder='Search' className='focus:outline-none bg-transparent w-30 sm:w-64 pr-1' />
                <FaSearch className='text-slate-600 cursor-pointer  ' />
            </form>

            <ul className='flex gap-4 cursor-pointer'>
                <Link to='/'><li className='hidden sm:inline hover:underline text-slate-800'>Home</li></Link>
                <Link to='/about'><li className='hidden sm:inline hover:underline text-slate-800'>About</li></Link>
                {user.currentUser ?<Link to='/profile'><li className=' hover:underline text-slate-800'><img src={user.currentUser.photoURL} alt="avatar" className='rounded-full w-7 object-cover' /></li>
                </Link> : <Link to='/sign-in'><li className=' hover:underline text-slate-800'>SignIn</li></Link>}
            </ul>
        </div>
    </header>
  )
}

export default Header