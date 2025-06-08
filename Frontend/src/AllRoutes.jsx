import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'


const AllRoutes = () => {
  return (
      <div>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup/> } />
              <Route path='/dashboard' element={<Dashboard/> } />
          </Routes>
    </div>
  )
}

export default AllRoutes