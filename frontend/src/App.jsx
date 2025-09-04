import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import FreshPortfolio from './pages/FreshPortfolio'
import FeaturedPage from './pages/FeaturedPage'
import AboutMindsEye from './pages/AboutMindsEye'
import ContactPage from './pages/ContactPage'
import CopyrightProtection from './components/CopyrightProtection'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <CopyrightProtection />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<FreshPortfolio />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/info" element={<AboutMindsEye />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
