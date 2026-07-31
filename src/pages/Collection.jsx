import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Tittle from '../component/Title';
import ProductItem from '../component/ProductItem';
import { motion } from 'framer-motion';
import { Filter, ChevronRight } from 'lucide-react';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 border-t border-gray-200/80 dark:border-gray-800/80 min-h-screen'
    >
      {/* Filter Options Sidebar */}
      <div className='min-w-60'>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl font-semibold flex items-center cursor-pointer gap-2 tracking-wide text-gray-900 dark:text-white'
        >
          <Filter className='w-5 h-5 text-orange-500' />
          <span>FILTERS</span>
          <ChevronRight className={`w-5 h-5 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} />
        </button>

        {/* Category Filter */}
        <div className={`p-5 rounded-2xl glass-card my-4 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-xs font-bold tracking-wider uppercase text-gray-900 dark:text-white'>CATEGORIES</p>
          <div className='flex flex-col gap-2.5 text-sm font-light text-gray-700 dark:text-gray-300'>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className='flex items-center gap-2.5 cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors'>
                <input 
                  className='w-4 h-4 accent-orange-500 rounded cursor-pointer' 
                  type="checkbox" 
                  value={cat} 
                  onChange={toggleCategory} 
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`p-5 rounded-2xl glass-card my-4 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-xs font-bold tracking-wider uppercase text-gray-900 dark:text-white'>TYPE</p>
          <div className='flex flex-col gap-2.5 text-sm font-light text-gray-700 dark:text-gray-300'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
              <label key={sub} className='flex items-center gap-2.5 cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors'>
                <input 
                  className='w-4 h-4 accent-orange-500 rounded cursor-pointer' 
                  type="checkbox" 
                  value={sub} 
                  onChange={toggleSubCategory} 
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Product Grid */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-6'>
          <Tittle text1={'ALL'} text2={'COLLECTIONS'} />
          
          {/* Product Sort Dropdown */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xs sm:text-sm px-3 py-2 rounded-xl outline-none shadow-sm focus:border-orange-500 transition-all cursor-pointer font-medium'
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem 
                key={item._id || index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                image={item.image} 
              />
            ))
          ) : (
            <div className='col-span-full text-center py-20 text-gray-400 font-light'>
              No products match your selected filters.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Collection;
