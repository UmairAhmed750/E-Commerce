import React, { useContext, useState } from 'react';
import Tittle from '../component/Title';
import CartTotal from '../component/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col sm:flex-row justify-between gap-8 pt-8 min-h-[80vh] border-t border-gray-200/80 dark:border-gray-800/80'
    >
      {/* Left Side: Delivery Information Form */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-2'>
          <Tittle text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="text" placeholder='First name'/>
          <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="text" placeholder='Last name'/>
        </div>

        <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="email" placeholder='Email address'/>   
        <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="text" placeholder='Street address'/>   

        <div className='flex gap-3'>
          <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="text" placeholder='City'/>
          <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="text" placeholder='State'/>
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="number" placeholder='Zipcode'/>
          <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="text" placeholder='Country'/>
        </div>

        <input className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none rounded-xl py-2.5 px-4 w-full text-sm focus:border-orange-500 transition-colors font-light' type="number" placeholder='Phone number'/>
      </div>

      {/* Right Side: Order Summary & Payment Method */}
      <div className='mt-6 w-full sm:max-w-[460px]'>
        <div className='p-6 rounded-2xl glass-panel border border-gray-200/80 dark:border-gray-800/80 shadow-xl'>
          <CartTotal />
          
          <div className='mt-10'>
            <Tittle text1={'PAYMENT'} text2={'METHOD'} />
            
            {/* Payment Method Selection Cards */}
            <div className='flex gap-3 flex-col mt-4'>
              {[
                { id: 'stripe', logo: assets.stripe_logo, label: '' },
                { id: 'razorpay', logo: assets.razorpay_logo, label: '' },
                { id: 'cod', logo: null, label: 'CASH ON DELIVERY' }
              ].map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setMethod(item.id)} 
                  className={`flex items-center gap-4 p-3.5 px-4 rounded-xl border cursor-pointer transition-all ${
                    method === item.id 
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 shadow-md' 
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === item.id ? 'border-orange-500 bg-orange-500' : 'border-gray-400'
                  }`}>
                    {method === item.id && <div className='w-1.5 h-1.5 rounded-full bg-white' />}
                  </div>

                  {item.logo ? (
                    <img className='h-5 object-contain' src={item.logo} alt={item.id} />
                  ) : (
                    <p className='text-gray-800 dark:text-gray-200 text-xs font-semibold tracking-wider uppercase'>{item.label}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className='w-full text-end mt-8'>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/orders')} 
                className='w-full bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black font-semibold tracking-wider uppercase px-12 py-4 rounded-xl text-sm shadow-xl transition-all'
              >
                PLACE ORDER
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceOrder;
