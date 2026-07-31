import React from 'react';
import { motion } from 'framer-motion';

const Tittle = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2.5 items-center my-4 group'>
      <p className='text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-light tracking-widest uppercase'>
        {text1} <span className='text-gray-900 dark:text-gray-100 font-semibold tracking-wider'>{text2}</span>
      </p>
      <motion.p 
        initial={{ width: 10 }}
        whileInView={{ width: 48 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='w-8 sm:w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-sm'
      />
    </div>
  );
};

export default Tittle;
