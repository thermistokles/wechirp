import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Landing from './pages/Landing'

function App() {

  return (
    <>
      <Router>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
