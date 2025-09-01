import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils.jsx';

const Signup = () => {

  const [ signupInfo, setSignupInfo ] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);

  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if(!name || !email || !password ){
      return handleError('name, email and password is required! ')
    }
    try {
      const url = "http://localhost:5000/auth/signup";
      const response =  await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success , message , error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        }, 1000)
       } else if(error){
        const details = error?.details[0].message;
        handleError(details);
      } else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(err);
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-rose-200 p-8'>
      <div className=' shadow p-6 w-80 rounded-sm p-8 '>
        <h1 className='mb-4 pb-8 italic text-purple-600 font-mono text-4xl'>Signup</h1>

        <form onSubmit={handleSignup}>
          <div className='mb-4'>
            <label className='flex text-xl  block ' htmlFor='name'>Name</label>
            <input
              onChange={handleChange}
              className='w-full px-3 py-2 shadow '
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name'
              value={signupInfo.name} />
          </div>
          <div className='mb-4'>
            <label className='flex text-xl  block ' htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              name='email'
              className='w-full px-3 py-2 shadow '
              type='email'
              placeholder='Enter your email'
              value={signupInfo.email} />
          </div>
          <div className='mb-4'>
            <label className='flex text-xl block' htmlFor='password'>Password</label>
            <input
              onChange={handleChange}
              className='  w-full px-3 py-2 shadow border-none outline-none italic'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={signupInfo.password} />
          </div>
          <div className='mb-4'>
            <button type='submit' className='w-full bg-purple-500  py-2 border-none '>
              Signup
            </button>
            <p className='text-center'>
              Already have an account? 
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup
