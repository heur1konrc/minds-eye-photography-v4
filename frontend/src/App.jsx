import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import Portfolio from './pages/Portfolio'
import Info from './pages/Info'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

