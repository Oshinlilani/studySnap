import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
