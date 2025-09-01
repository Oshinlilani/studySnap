import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils.jsx';
import { ToastContainer } from 'react-toastify'

const Navbar = () => {
  const [ loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() =>{
      navigate('/login');
    }, 1000)
  }
  return (
    <nav>
        <div>
            {/* <img src='' alt=''/> */}
        </div>

        <div className='bg-rose-200 flex justify-end pt-6 pr-6 gap-4'>

        {!loggedInUser ? (
          <>
            <Link to='/login' className='px-4 py-2 rounded mr-4'>
              Login
            </Link>
            <Link to='/signup' className='px-4 py-2 rounded mr-4'>
              Signup
            </Link>

          </>
        ) : (
          <>
            <span className='mr-4'>Welcome {loggedInUser} :)</span>

            <button onClick={handleLogout} className=' border border-purple-500 px-4 py-2 rounded-lg  ' > Logout</button> 

          </>
        )}
      </div>
      <ToastContainer />
    </nav>
    
  )
}

export default Navbar
