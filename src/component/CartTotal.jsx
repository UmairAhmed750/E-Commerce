import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Title';
import { Tag, Check, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CartTotal = () => {
  const {
    currency,
    getCartAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getFinalShippingFee,
    getFinalTotal
  } = useContext(ShopContext);

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  const subtotal = getCartAmount();
  const discount = getDiscountAmount();
  const shipping = getFinalShippingFee();
  const finalTotal = getFinalTotal();

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Tittle text1={'CART'} text2={'TOTAL'} />
      </div>

      {/* Coupon Code Section */}
      <div className='mt-4 mb-5 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80'>
        <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2.5'>
          <Tag className='w-4 h-4 text-orange-500' />
          <span>Have a Promo Code?</span>
        </div>

        {appliedCoupon ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-xs'
          >
            <div className='flex items-center gap-2'>
              <Sparkles className='w-4 h-4 text-orange-600 dark:text-orange-400' />
              <div>
                <span className='font-bold text-orange-900 dark:text-orange-200 uppercase'>{appliedCoupon.code}</span>
                <span className='text-gray-600 dark:text-gray-400 ml-1.5'>({appliedCoupon.title})</span>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className='p-1 rounded-md text-gray-500 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800 transition-colors'
              title='Remove coupon'
            >
              <X className='w-4 h-4' />
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleApplyCoupon} className='flex gap-2'>
            <input
              type='text'
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder='Enter SAVE10, FLAT20...'
              className='flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 uppercase font-medium placeholder:normal-case'
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type='submit'
              className='px-4 py-2 text-xs font-semibold rounded-xl bg-gray-900 hover:bg-black dark:bg-orange-600 dark:hover:bg-orange-700 text-white shadow-sm transition-all'
            >
              Apply
            </motion.button>
          </form>
        )}

        {/* Available Coupons Helper Pills */}
        <div className='flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-gray-200/50 dark:border-gray-800/50'>
          <span className='text-[10px] text-gray-400 dark:text-gray-500 font-medium'>Try:</span>
          {['SAVE10', 'FLAT20', 'FREESHIP'].map((code) => (
            <button
              key={code}
              type='button'
              onClick={() => applyCoupon(code)}
              className='px-2 py-0.5 text-[10px] font-bold rounded-md bg-gray-200/70 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-950 dark:hover:text-orange-300 transition-colors'
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Totals Breakdown */}
      <div className='flex flex-col gap-2.5 text-sm text-gray-700 dark:text-gray-300'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>

        <hr className='dark:border-gray-800' />

        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{shipping === 0 ? <span className='text-emerald-600 dark:text-emerald-400 font-semibold'>FREE</span> : `${currency}${shipping}.00`}</p>
        </div>

        {discount > 0 && (
          <>
            <hr className='dark:border-gray-800' />
            <div className='flex justify-between text-emerald-600 dark:text-emerald-400 font-medium'>
              <p>Promo Discount</p>
              <p>-{currency}{discount}.00</p>
            </div>
          </>
        )}

        <hr className='dark:border-gray-800' />

        <div className='flex justify-between text-base text-gray-900 dark:text-gray-100 pt-1'>
          <b>Total Amount</b>
          <b className='text-lg text-orange-600 dark:text-orange-400'>{currency}{finalTotal}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

