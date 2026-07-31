import React, { useState, useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Star, ShieldCheck, Truck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const words = [
  'Luxury Fashion',
  'Urban Streetwear',
  'Timeless Elegance',
  'Signature Styles',
  'Seasonal Trends'
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className='relative my-6 rounded-3xl overflow-hidden glass-card border border-gray-200/80 dark:border-gray-800/80 flex flex-col lg:flex-row shadow-2xl bg-gradient-to-br from-white via-amber-50/20 to-orange-50/40 dark:from-[#0b0f19] dark:via-gray-900 dark:to-gray-950'
    >
      {/* Background Glow Accents */}
      <div className='absolute -top-32 -left-32 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none' />

      {/* Hero Left Content */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8 lg:p-8 xl:p-10 z-10'>
        <div className='text-gray-800 dark:text-gray-100 max-w-lg'>
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-[11px] font-semibold tracking-wider uppercase mb-2 border border-orange-200 dark:border-orange-900/50 shadow-sm'
          >
            <Sparkles className='w-3 h-3 text-orange-500 animate-pulse' />
            <span>EXCLUSIVELY CURATED FOR YOU</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='prata-regular text-2xl sm:text-3xl lg:text-3xl xl:text-4xl leading-[1.2] font-medium my-1.5 tracking-tight text-gray-900 dark:text-white'
          >
            Redefining Modern <br />
            <span className="inline-block relative h-[1.25em] overflow-hidden align-bottom min-w-[220px] sm:min-w-[280px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 25, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -25, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className='bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent italic font-serif block'
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 my-2 sm:my-3 leading-relaxed font-light'
          >
            Discover our flagship seasonal wardrobe crafted with premium sustainable fabrics, minimalist tailoring, and timeless streetwear aesthetics.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className='flex flex-wrap items-center gap-2.5 pt-1 mb-4 lg:mb-5'
          >
            <Link
              to='/collection'
              className='inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-xs sm:text-sm shadow-xl hover:shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all duration-300 group'
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className='w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5' />
            </Link>

            <a
              href='#bestsellers'
              className='inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 font-medium text-xs sm:text-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300'
            >
              <TrendingUp className='w-3.5 h-3.5 text-orange-500' />
              <span>View Bestsellers</span>
            </a>
          </motion.div>

          {/* Trust Highlights Counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className='grid grid-cols-3 gap-2 pt-3 border-t border-gray-200/80 dark:border-gray-800'
          >
            <div>
              <div className='text-base sm:text-lg lg:text-xl font-bold font-serif text-gray-900 dark:text-white'>50k+</div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400 font-light mt-0.5'>Happy Clients</div>
            </div>
            <div>
              <div className='text-base sm:text-lg lg:text-xl font-bold font-serif text-gray-900 dark:text-white flex items-center gap-1'>
                4.9 <Star className='w-3 h-3 fill-amber-400 text-amber-400 inline' />
              </div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400 font-light mt-0.5'>Verified Reviews</div>
            </div>
            <div>
              <div className='text-base sm:text-lg lg:text-xl font-bold font-serif text-gray-900 dark:text-white'>100%</div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400 font-light mt-0.5'>Authentic Quality</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Right Visual Banner */}
      <div className='w-full lg:w-1/2 relative overflow-hidden flex items-center justify-center p-2 lg:p-0 min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] xl:min-h-[440px]'>
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
          className='w-full h-full object-cover rounded-2xl lg:rounded-none transition-transform duration-700 ease-out'
          src={assets.hero_img}
          alt="Hero Luxury Banner"
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none' />
      </div>
    </motion.div>
  );
};

export default Hero;
