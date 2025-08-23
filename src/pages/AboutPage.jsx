import React from 'react'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-orange-500 mb-6"
          >
            About Mind's Eye Photography
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-300"
          >
            Where Moments Meet Imagination
          </motion.p>
        </div>
      </div>

      {/* Rick Corey's Bio Section */}
      <div className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-800 rounded-lg p-8 md:p-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-6">
                Born and raised right here in Madison, Wisconsin, I'm a creative spirit with a passion for bringing visions to life. My journey has woven through various rewarding paths – as a musician, a teacher, a REALTOR, and a small business owner. Each of these roles has fueled my inspired, creative, and driven approach to everything I do, especially when it comes to photography.
              </p>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                At the heart of Mind's Eye Photography: Where Moments Meet Imagination is my dedication to you. While I cherish the fulfillment of capturing moments that spark my own imagination, my true passion lies in doing the same for my clients. Based in Madison, I frequently travel across the state, always on the lookout for that next inspiring scene.
              </p>
              
              <p className="text-slate-300 leading-relaxed mb-8">
                For me, client satisfaction isn't just a goal – it's the foundation of every interaction. I pour my energy into ensuring you not only love your photos but also enjoy the entire experience. It's truly rewarding to see clients transform into lifelong friends, and that's the kind of connection I strive to build with everyone I work with.
              </p>
              
              <div className="text-right">
                <p className="text-orange-500 font-semibold text-lg">
                  Rick Corey
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

