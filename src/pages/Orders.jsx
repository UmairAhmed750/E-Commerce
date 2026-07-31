import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../component/Title';
import { motion } from 'framer-motion';
import { PackageCheck, Truck } from 'lucide-react';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='border-t border-gray-200/80 dark:border-gray-800/80 pt-10 min-h-[60vh]'
    >
      <div className='text-2xl mb-6'>
        <Tittle text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='flex flex-col gap-4'>
        {products.slice(1, 4).map((item, index) => (
          <motion.div 
            key={item._id || index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className='p-5 rounded-2xl glass-card border border-gray-200/60 dark:border-gray-800/60 text-gray-700 dark:text-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm'
          >
            <div className='flex items-start gap-5 text-sm'>
              <img className='w-16 sm:w-20 aspect-square object-cover rounded-xl bg-gray-100 dark:bg-gray-800' src={item.image[0]} alt={item.name} />
              <div>
                <p className='sm:text-base font-semibold text-gray-900 dark:text-white'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  <p className='text-base font-bold text-gray-900 dark:text-gray-100'>{currency}{item.price}</p>
                  <span className='px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium'>Qty: 1</span>
                  <span className='px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium'>Size: M</span>
                </div>
                <p className='mt-2 text-xs text-gray-500 dark:text-gray-400 font-light'>
                  Ordered Date: <span className='text-gray-700 dark:text-gray-300 font-normal'>July 30, 2026</span>
                </p>
              </div>
            </div>

            <div className='md:w-1/2 flex items-center justify-between gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-gray-800'>
              <div className='flex items-center gap-2.5'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                </span>
                <p className='text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200'>Ready to Ship</p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2'
              >
                <Truck className='w-4 h-4 text-orange-500' />
                <span>Track Order</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
