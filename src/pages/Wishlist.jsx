import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../component/Title';
import ProductItem from '../component/ProductItem';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, products, removeFromWishlist, addToCart, currency } = useContext(ShopContext);

  const wishlistProducts = products.filter(item => wishlist.includes(item._id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='border-t border-gray-200/80 dark:border-gray-800/80 pt-10 min-h-[65vh]'
    >
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
        <div className='text-2xl'>
          <Tittle text1={'MY'} text2={'WISHLIST'} />
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'} Saved
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='flex flex-col items-center justify-center py-16 text-center glass-card rounded-3xl border border-gray-200/60 dark:border-gray-800/60 p-8'
        >
          <div className='p-5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 mb-4 shadow-inner'>
            <Heart className='w-12 h-12 stroke-[1.5]' />
          </div>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
            Your Wishlist is Empty
          </h3>
          <p className='text-gray-600 dark:text-gray-400 max-w-md text-sm mb-6'>
            Save your favorite items here so you can easily find them later and add them to your bag!
          </p>
          <Link
            to='/collection'
            className='px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 transition-all'
          >
            Explore Collection
          </Link>
        </motion.div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
          {wishlistProducts.map((product) => (
            <div key={product._id} className='relative group flex flex-col justify-between'>
              <ProductItem
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
              
              <div className='flex gap-2 mt-2'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
                    addToCart(product._id, firstSize);
                  }}
                  className='flex-1 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all'
                >
                  <ShoppingBag className='w-3.5 h-3.5' />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeFromWishlist(product._id)}
                  className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors'
                  title="Remove from wishlist"
                >
                  <Trash2 className='w-4 h-4' />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
