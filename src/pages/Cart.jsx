import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../component/Title';
import CartTotal from '../component/CartTotal';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { products, currency, cartItems, ubdateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='border-t border-gray-200/80 dark:border-gray-800/80 pt-10 min-h-[60vh]'
    >
      <div className='text-2xl mb-6'>
        <Tittle text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='flex flex-col gap-4'>
        <AnimatePresence>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              if (!productData) return null;

              return (
                <motion.div 
                  key={`${item._id}-${item.size}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='p-4 rounded-2xl glass-card grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 border border-gray-200/60 dark:border-gray-800/60 shadow-sm'
                >
                  <div className='flex items-center gap-4 sm:gap-6'>
                    <img className='w-16 sm:w-20 aspect-square object-cover rounded-xl bg-gray-100 dark:bg-gray-800' src={productData.image[0]} alt={productData.name} />
                    <div>
                      <p className='text-xs sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-1'>{productData.name}</p>
                      <div className='flex items-center gap-4 mt-2'>
                        <p className='text-sm font-bold text-gray-900 dark:text-gray-100'>{currency}{productData.price}</p>
                        <span className='px-2.5 py-0.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300'>
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  <input 
                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : ubdateQuantity(item._id, item.size, Number(e.target.value))} 
                    className='border border-gray-300 dark:border-gray-700 rounded-xl max-w-12 sm:max-w-20 px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-center outline-none text-sm focus:border-orange-500 font-medium' 
                    type="number" 
                    min={1} 
                    defaultValue={item.quantity} 
                  />

                  <motion.button 
                    whileHover={{ scale: 1.1, color: '#ef4444' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => ubdateQuantity(item._id, item.size, 0)} 
                    className='p-2 rounded-full text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors justify-self-end'
                    title="Remove item"
                  >
                    <Trash2 className='w-5 h-5' />
                  </motion.button>
                </motion.div>
              );
            })
          ) : (
            <div className='text-center py-20 glass-card rounded-2xl border border-gray-200/60 dark:border-gray-800/60'>
              <ShoppingBag className='w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3' />
              <p className='text-gray-500 dark:text-gray-400 font-light text-base'>Your shopping cart is currently empty.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-end my-16'>
          <div className='w-full sm:w-[450px] p-6 rounded-2xl glass-panel border border-gray-200/80 dark:border-gray-800/80 shadow-xl'>
            <CartTotal />
            <div className='w-full mt-8'>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/place-order')} 
                className='w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold text-sm py-4 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 uppercase tracking-wider transition-all'
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className='w-4 h-4' />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
