import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SimpleHomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState(null)

  useEffect(() => {
    // Fetch background image from Background Manager
    fetch('/api/background')
      .then(response => response.json())
      .then(data => {
        if (data && data.background_image) {
          setBackgroundImage(`/data/${data.background_image}`)
        }
      })
      .catch(error => {
        console.error('Error fetching background:', error)
      })
  }, [])

  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : { backgroundColor: '#000000' } // Black fallback if no background

  return (
    <div className="min-h-screen text-white" style={backgroundStyle}>
      {/* Dark overlay for text readability */}
      <div className="min-h-screen bg-black bg-opacity-50">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-orange-500">
                Mind's Eye Photography
              </Link>
              
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-white hover:text-orange-500 transition-colors">
                  Home
                </Link>
                <Link to="/portfolio" className="text-white hover:text-orange-500 transition-colors">
                  Portfolio
                </Link>
                <Link to="/featured" className="text-white hover:text-orange-500 transition-colors">
                  Featured
                </Link>
                <Link to="/info" className="text-white hover:text-orange-500 transition-colors">
                  Info
                </Link>
                <Link to="/contact" className="text-white hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">
              Mind's Eye Photography
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Where Moments Meet Imagination
            </p>
            <Link 
              to="/portfolio" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleHomePage

