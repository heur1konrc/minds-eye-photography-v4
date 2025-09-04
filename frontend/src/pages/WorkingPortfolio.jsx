import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const WorkingPortfolio = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All Work')
  const [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()
  const imagesPerPage = 12

  // Initialize from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get('category') || 'All Work'
    const page = parseInt(urlParams.get('page')) || 1
    setSelectedCategory(category)
    setCurrentPage(page)
  }, [])

  // Fetch images from API - trigger on location change
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        console.log('Fetching portfolio images...')
        const response = await fetch('/api/simple-portfolio')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Portfolio data loaded:', data)
        
        // Process the data to ensure correct image URLs
        const portfolioImages = data.map(img => ({
          ...img,
          url: img.url || `/data/${img.filename}`
        }))
        
        setImages(portfolioImages)
      } catch (error) {
        console.error('Error loading portfolio:', error)
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [location.pathname]) // Re-fetch when route changes

  // Get unique categories
  const categories = ['All Work', ...new Set(images.flatMap(img => img.categories || []))]

  // Filter images by category
  const filteredImages = images.filter(img => 
    selectedCategory === 'All Work' || img.categories?.includes(selectedCategory)
  )

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    // Update URL
    const url = new URL(window.location)
    url.searchParams.set('category', category)
    url.searchParams.set('page', '1')
    window.history.pushState({}, '', url)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Update URL
    const url = new URL(window.location)
    url.searchParams.set('page', page.toString())
    window.history.pushState({}, '', url)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-orange-500 text-xl">Loading Portfolio...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Portfolio</h1>
          <p className="text-slate-300 text-lg mb-2">
            Explore The Collection! There are currently {filteredImages.length} images on the Portfolio.
          </p>
          <p className="text-slate-400">
            The images are categorized for easy navigation. All images are clickable to view a larger version.
          </p>
          <p className="text-slate-400">Enjoy your visit!</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentImages.map((image) => (
            <div key={image.id} className="group relative bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                {image.categories && image.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {image.categories.map(cat => (
                      <span key={cat} className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkingPortfolio

