import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await fetch('https://minds-eye-master-production.up.railway.app/api/background');
        const data = await response.json();
        
        console.log('Background API response:', data);
        
        if (data.background_url) {
          setBackgroundImage(data.background_url);
          console.log('✅ Background set to:', data.background_url);
        } else if (data.background_image) {
          // Handle different API response format
          const fullUrl = `https://minds-eye-master-production.up.railway.app/static/assets/${data.background_image}`;
          setBackgroundImage(fullUrl);
          console.log('✅ Background set to:', fullUrl);
        } else {
          console.error('❌ No background image available from database');
        }
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching background:', error);
        setLoading(false);
      }
    };

    fetchBackground();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading background...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background from Background Manager - NO OVERLAY */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Debug info */}
      {!backgroundImage && (
        <div className="absolute top-4 left-4 bg-red-600 text-white p-2 rounded text-sm z-50">
          ❌ No background image loaded
        </div>
      )}
      
      {/* Hero Content - LOGO + TAGLINE */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* MIND'S EYE LOGO - NO ANIMATION */}
        <div className="mb-2">
          <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
            <Logo size="massive" className="w-full h-full" />
          </div>
        </div>
        
        {/* TAGLINE - SIZED TO MATCH LOGO TEXT */}
        <h3 
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-bold mb-16 tracking-wide max-w-4xl drop-shadow-lg"
          style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
        >
          Where Moments Meet Imagination
        </h3>
        
        {/* VIEW PORTFOLIO BUTTON */}
        <div>
          <Link to="/portfolio">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm md:text-base lg:text-lg font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-400">
              View Portfolio
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage

