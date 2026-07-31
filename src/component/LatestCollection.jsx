import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className='my-16'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center py-8 text-3xl'
      >
        <Tittle text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2'>
          Discover our newest arrivals designed with precision craftsmanship, blending contemporary streetwear with timeless luxury.
        </p>
      </motion.div>

      {/* Rendering Products Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-8'
      >
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <ProductItem key={item._id || index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        ) : (
          <div className='col-span-full text-center py-10 text-gray-400'>Loading collections...</div>
        )}
      </motion.div>
    </div>
  );
};

export default LatestCollection;