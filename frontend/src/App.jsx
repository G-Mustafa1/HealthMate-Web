import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Sidebar from './components/Sidebar'
import Home from './pages/dashboard/Home'
import Report from './pages/dashboard/Report'
import Vitials from './pages/dashboard/Vitials'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './feature/authSlice'
import AuthLayout from './layout/AuthLayout'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Sidebar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/vitals" element={<Vitials />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App