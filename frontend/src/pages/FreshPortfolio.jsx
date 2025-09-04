import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const FreshPortfolio = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All Work')
  const [selectedImage, setSelectedImage] = useState(null)
  const location = useLocation()

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        console.log('🔄 Fetching portfolio images...')
        
        const response = await fetch('/api/simple-portfolio?t=' + Date.now())
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('✅ Portfolio data loaded:', data.length, 'images')
        
        setImages(data)
      } catch (error) {
        console.error('❌ Error loading portfolio:', error)
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [location]) // Refetch when location changes

  // Get unique categories
  const categories = ['All Work', ...new Set(images.flatMap(img => img.categories || []))]

  // Filter images by category
  const filteredImages = selectedCategory === 'All Work' 
    ? images 
    : images.filter(img => img.categories?.includes(selectedCategory))

  // Open image modal
  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  // Close image modal
  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-900 text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Portfolio</h1>
        <p className="text-slate-300 text-lg mb-2">
          Explore The Collection! There are currently {images.length} images on the Portfolio.
        </p>
        <p className="text-slate-400">
          The images are categorized for easy navigation. All images are clickable to view a larger version.
        </p>
        <p className="text-slate-400">Enjoy your visit!</p>
      </div>

      {/* Category Filter */}
      <div className="bg-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {category}
                <span className="ml-2 text-sm opacity-75">
                  {category === 'All Work' 
                    ? images.length 
                    : images.filter(img => img.categories?.includes(category)).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal(image)}
                >
                  {/* Image */}
                  <div className="aspect-[3/2] bg-slate-700 relative overflow-hidden">
                    <img
                      src={image.url || `/data/${image.filename}`}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  
                  {/* Image Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{image.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {image.categories?.map(cat => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image */}
            <img
              src={selectedImage.url || `/data/${selectedImage.filename}`}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-slate-300 mb-3">{selectedImage.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedImage.categories?.map(cat => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FreshPortfolio

