import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='py-6 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 text-center flex items-center justify-center gap-3'
        >
          <div className='inline-flex items-center justify-center border border-gray-300 dark:border-gray-700 px-5 py-2.5 rounded-full w-11/12 sm:w-1/2 bg-white dark:bg-gray-900 shadow-md focus-within:border-orange-500/80 transition-all'>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 font-light'
              type='text'
              placeholder='Search products by name or category...'
              autoFocus
            />
            <Search className='w-4 h-4 text-gray-500 dark:text-gray-400' />
          </div>
          
          <button 
            onClick={() => setShowSearch(false)}
            className='p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition-colors text-gray-500 dark:text-gray-400'
            title="Close Search"
          >
            <X className='w-5 h-5' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
