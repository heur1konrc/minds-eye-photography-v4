import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Portfolio = () => {
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const imagesPerPage = 12

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch images
        const imagesResponse = await fetch('/api/portfolio')
        if (!imagesResponse.ok) {
          throw new Error('Failed to fetch portfolio images')
        }
        const imagesData = await imagesResponse.json()
        setImages(imagesData)

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories')
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories')
        }
        const categoriesData = await categoriesResponse.json()
        setCategories([{ id: 'all', name: 'All' }, ...categoriesData])
        
      } catch (err) {
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => 
        image.categories && image.categories.some(cat => cat.id === selectedCategory)
      )

  // Calculate pagination
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage)

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading portfolio...</div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h1>
        <p className="text-lg text-gray-600">
          Explore our collection of photography work
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      {currentImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {currentImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img
                src={`/data/${image.filename}`}
                alt={image.title || 'Portfolio image'}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title && (
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                  )}
                  {image.categories && image.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="px-2 py-1 bg-orange-500 text-white text-xs rounded"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No images found in this category.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Portfolio

