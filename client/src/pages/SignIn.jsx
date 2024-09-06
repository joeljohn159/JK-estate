import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx';
 
const SignIn = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({})
  const handleChange = (e) =>{
          setFormData({...formData, [e.target.id]: e.target.value})
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    try{
      dispatch(signInStart())
      // setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/sign-in",{
        method:'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
        credentials : 'include'
      })
      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message))
        // setLoading(false);
        // setError(data.message)
        return;
      }
      

      // setLoading(false);
      // setError(null);
      console.log(data)
      dispatch(signInSuccess(data))
      navigate('/')
    }
    catch(err){
      // setLoading(false);
      // setError(null);
      dispatch(signInFailure(data.message))
      
    }
    
  } 
  return (
    <div className='max-w-sm sm:max-w-lg mx-auto'>
      <h1 className='text-center my-6 font-semibold text-2xl'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
    
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password'  className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className='uppercase border p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-50' >{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth value='Continue with Google'/>
      </form>

      <div className='flex gap-3 mt-3'>
        <p>Don't have an account</p>
        <Link to='/sign-up'><span className='text-blue-700 underline cursor-pointer'>
          Sign Up
          </span></Link>
      </div>
      {error && <p className='text-red-500 pt-3'>{error}</p>}
    </div>
  )
}

export default SignIn