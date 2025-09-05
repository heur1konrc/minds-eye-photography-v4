import React, { useState, useEffect } from 'react'

const Info = () => {
  const [aboutContent, setAboutContent] = useState(null)
  const [aboutImage, setAboutImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Fetch about content
        const contentResponse = await fetch('/api/about-content')
        if (!contentResponse.ok) {
          throw new Error('Failed to fetch about content')
        }
        const contentData = await contentResponse.json()
        setAboutContent(contentData)

        // Fetch about image
        const imageResponse = await fetch('/api/about-image')
        if (!imageResponse.ok) {
          throw new Error('Failed to fetch about image')
        }
        const imageData = await imageResponse.json()
        setAboutImage(imageData)
        
      } catch (err) {
        setError(err.message)
        console.error('Error fetching about data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Mind's Eye Photography</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* About Image */}
        {aboutImage && (
          <div className="order-2 md:order-1">
            <img
              src={`/data/${aboutImage.filename}`}
              alt="About Mind's Eye Photography"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* About Content */}
        <div className="order-1 md:order-2">
          {aboutContent ? (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {aboutContent.title || 'Our Story'}
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {aboutContent.content ? (
                  aboutContent.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    )
                  ))
                ) : (
                  <p>
                    Welcome to Mind's Eye Photography, where we capture the world through a unique perspective. 
                    Our passion for photography drives us to create stunning visual stories that resonate with viewers 
                    and preserve precious moments in time.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Welcome to Mind's Eye Photography, where we capture the world through a unique perspective. 
                  Our passion for photography drives us to create stunning visual stories that resonate with viewers 
                  and preserve precious moments in time.
                </p>
                <p>
                  With years of experience in various photography disciplines, we specialize in creating 
                  compelling images that tell stories and evoke emotions. From landscapes to portraits, 
                  each photograph is crafted with attention to detail and artistic vision.
                </p>
                <p>
                  We believe that photography is more than just capturing images – it's about preserving 
                  memories, telling stories, and sharing perspectives that might otherwise go unseen.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-gray-700 mb-4">
            Interested in working together or have questions about our services?
          </p>
          <p className="text-gray-700">
            We'd love to hear from you and discuss how we can capture your vision.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Info

