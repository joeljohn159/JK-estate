import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({})
  const handleChange = (e) =>{
          setFormData({...formData, [e.target.id]: e.target.value})
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/sign-up",{
        method:'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if(data.success === false){
        setLoading(false);
        setError(data.message)
        return;
      }

      
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }
    catch(err){
      setLoading(false);
      setError(null);
      
    }
    
  } 
  return (
    <div className='max-w-sm sm:max-w-lg mx-auto'>
      <h1 className='text-center my-6 font-semibold text-2xl'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='Username'  className='border p-3 rounded-lg' id='username'  onChange={handleChange}/>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password'  className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className='uppercase border p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-50' >Sign Up</button>
        <OAuth value='Continue with Google' />
      </form>

      <div className='flex gap-3 mt-3'>
        <p>Have an account</p>
        <Link to='/sign-in'><span className='text-blue-700 underline cursor-pointer'>
          {loading ? 'Loading...' : 'Sign In'}
          </span></Link>
      </div>
      {error && <p className='text-red-500 pt-3'>{error}</p>}
    </div>
  )
}

export default SignUp