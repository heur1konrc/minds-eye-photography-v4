import React from 'react'
import { motion } from 'framer-motion'
import SimpleContactForm from '../components/SimpleContactForm'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Let's Create Something Beautiful
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ready to capture your special moments?
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <SimpleContactForm />
      </motion.div>

      {/* Additional Info Section */}
      <motion.div 
        className="bg-gray-900 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Why Choose Mind's Eye Photography?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
              <p className="text-gray-300">Years of experience capturing life's most precious moments with artistic vision and technical expertise.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Personalized Service</h3>
              <p className="text-gray-300">Every client receives personalized attention to ensure your unique story is told through stunning imagery.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Wisconsin Coverage</h3>
              <p className="text-gray-300">Based in Madison but available to travel throughout Wisconsin for your special events and sessions.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactPage

