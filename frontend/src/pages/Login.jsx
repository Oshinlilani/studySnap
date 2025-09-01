import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils.jsx'
import { ToastContainer } from 'react-toastify'

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email:'',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if( !email || !password ){
      return handleError('email and password are required! ')
    }
    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(()=>{
          navigate('/home')
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
        <h1 className='mb-4 pb-8 italic text-purple-600 font-mono text-4xl'>Login</h1>

        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='flex text-xl  block ' htmlFor='email'>Email</label>
            <input
            onChange={handleChange}
              className='w-full px-3 py-2 shadow'
              type='email'
              name='email'
              placeholder='Enter your email'
              value={loginInfo.email} />
          </div>
          <div className='mb-4'>
            <label className='flex text-xl block' htmlFor='password'>Password</label>
            <input
            onChange={handleChange}
              className='  w-full px-3 py-2 shadow'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={loginInfo.password} />
          </div>
          <div className='mb-4'>
            <button type='submit' className='w-full bg-purple-500  py-2'>
              Login
            </button>
            <p className='text-center'>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
