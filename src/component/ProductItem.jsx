import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link className='group text-gray-700 dark:text-gray-200 cursor-pointer block' to={`/product/${id}`}>
        <div className='overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800/80 relative shadow-sm group-hover:shadow-xl transition-all duration-500 aspect-[3/4]'>
          <img 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' 
            src={Array.isArray(image) ? image[0] : image} 
            alt={name} 
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
          
          <div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
            <span className='px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-semibold backdrop-blur-md shadow-md'>
              View Details
            </span>
          </div>
        </div>

        <div className='pt-3.5 pb-1 px-1'>
          <p className='text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors'>
            {name}
          </p>
          <p className='text-sm font-bold text-gray-900 dark:text-white mt-1'>
            {currency}{price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
