import React, { useState, useEffect } from 'react'

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch('/api/background-image')
        if (!response.ok) {
          throw new Error('Failed to fetch background image')
        }
        const data = await response.json()
        setBackgroundImage(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching background image:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBackgroundImage()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  const imageUrl = backgroundImage ? `/data/${backgroundImage.filename}` : null

  return (
    <div className="relative min-h-screen">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-35"></div>
        </div>
      )}
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Mind's Eye Photography
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-2xl mx-auto">
            Capturing moments through a unique perspective
          </p>
          <div className="space-x-4">
            <a
              href="/portfolio"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              View Portfolio
            </a>
            <a
              href="/info"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

