import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../component/Title';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageCheck, Truck, X, FileText, CheckCircle2, Clock, MapPin, Printer } from 'lucide-react';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null);

  const trackingSteps = [
    { label: 'Order Placed', time: 'July 30, 2026 - 10:14 AM', completed: true },
    { label: 'Processing & Packed', time: 'July 31, 2026 - 02:30 PM', completed: true },
    { label: 'Shipped (TCS Express)', time: 'Aug 01, 2026 - 09:00 AM', completed: true, current: true },
    { label: 'Out for Delivery', time: 'Estimated: Aug 04', completed: false },
    { label: 'Delivered', time: 'Pending', completed: false }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='border-t border-gray-200/80 dark:border-gray-800/80 pt-10 min-h-[60vh] relative'
    >
      <div className='text-2xl mb-6'>
        <Tittle text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='flex flex-col gap-4'>
        {products.slice(1, 4).map((item, index) => {
          const orderId = `ORD-982${index + 1}4`;
          return (
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
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400'>
                      {orderId}
                    </span>
                  </div>
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

              <div className='md:w-1/2 flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-gray-800 flex-wrap'>
                <div className='flex items-center gap-2.5 mr-auto md:mr-4'>
                  <span className='relative flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                  </span>
                  <p className='text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200'>In Transit</p>
                </div>

                <div className='flex items-center gap-2'>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveInvoiceOrder({ ...item, orderId })}
                    className='border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3.5 py-2 text-xs font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer'
                  >
                    <FileText className='w-3.5 h-3.5 text-blue-500' />
                    <span>Receipt</span>
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTrackingOrder({ ...item, orderId })}
                    className='border border-orange-500 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-orange-500/20 transition-colors flex items-center gap-2 cursor-pointer'
                  >
                    <Truck className='w-4 h-4' />
                    <span>Track Order</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TRACK ORDER MODAL */}
      <AnimatePresence>
        {activeTrackingOrder && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTrackingOrder(null)}
              className='fixed inset-0 bg-black/60 backdrop-blur-xs'
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className='relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg z-10 p-6 sm:p-8'
            >
              <button
                onClick={() => setActiveTrackingOrder(null)}
                className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              >
                <X className='w-5 h-5' />
              </button>

              <div className='flex items-center gap-3 mb-4'>
                <div className='p-3 rounded-2xl bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400'>
                  <Truck className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-gray-900 dark:text-white'>Order Tracking Timeline</h3>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>Tracking ID: <span className='font-mono font-bold text-gray-800 dark:text-gray-200'>TCS-908123719</span></p>
                </div>
              </div>

              <div className='p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-800/60 mb-6 flex items-center justify-between text-xs'>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 font-medium'>Estimated Delivery</p>
                  <p className='text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5'>Aug 04, 2026</p>
                </div>
                <div className='text-right'>
                  <p className='text-gray-500 dark:text-gray-400 font-medium'>Shipping Carrier</p>
                  <p className='text-sm font-bold text-gray-800 dark:text-gray-200 mt-0.5'>TCS Express Courier</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className='flex flex-col gap-6 relative pl-6 border-l-2 border-orange-500/30 my-4 ml-3'>
                {trackingSteps.map((step, idx) => (
                  <div key={idx} className='relative'>
                    {/* Node Dot */}
                    <div className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      step.current
                        ? 'bg-orange-500 text-white ring-4 ring-orange-500/20 animate-pulse'
                        : step.completed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                    }`}>
                      {step.completed ? <CheckCircle2 className='w-3.5 h-3.5' /> : <Clock className='w-3 h-3' />}
                    </div>

                    <div>
                      <p className={`text-sm font-bold ${step.current ? 'text-orange-600 dark:text-orange-400' : step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                        {step.label}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5'>
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECEIPT / INVOICE MODAL */}
      <AnimatePresence>
        {activeInvoiceOrder && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInvoiceOrder(null)}
              className='fixed inset-0 bg-black/60 backdrop-blur-xs'
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className='relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg z-10 p-6 sm:p-8'
            >
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              >
                <X className='w-5 h-5' />
              </button>

              <div className='border-b border-gray-200 dark:border-gray-800 pb-4 mb-4 flex items-center justify-between'>
                <div>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider'>Forever Official Invoice</h2>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Receipt ID: #{activeInvoiceOrder.orderId}</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-orange-100 hover:text-orange-600 transition-colors flex items-center gap-1.5 text-xs font-semibold'
                >
                  <Printer className='w-4 h-4' />
                  <span>Print</span>
                </button>
              </div>

              {/* Order Info Details */}
              <div className='text-xs text-gray-600 dark:text-gray-300 flex flex-col gap-3 mb-6'>
                <div className='flex justify-between'>
                  <span className='font-medium text-gray-400'>Customer:</span>
                  <span className='font-semibold text-gray-900 dark:text-white'>Mahad (Verified Customer)</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium text-gray-400'>Payment Method:</span>
                  <span className='font-semibold text-gray-900 dark:text-white'>Cash on Delivery</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium text-gray-400'>Order Date:</span>
                  <span className='font-semibold text-gray-900 dark:text-white'>July 30, 2026</span>
                </div>
              </div>

              {/* Item Card */}
              <div className='p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-800/60 flex items-center justify-between gap-4 mb-6'>
                <div className='flex items-center gap-3'>
                  <img src={activeInvoiceOrder.image[0]} alt="" className='w-12 h-12 rounded-xl object-cover' />
                  <div>
                    <p className='text-xs font-bold text-gray-900 dark:text-white'>{activeInvoiceOrder.name}</p>
                    <p className='text-[10px] text-gray-500'>Size: M | Qty: 1</p>
                  </div>
                </div>
                <p className='text-sm font-extrabold text-gray-900 dark:text-white'>{currency}{activeInvoiceOrder.price}.00</p>
              </div>

              {/* Summary Breakdown */}
              <div className='text-xs flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 pt-4'>
                <div className='flex justify-between text-gray-500 dark:text-gray-400'>
                  <span>Item Subtotal</span>
                  <span>{currency}{activeInvoiceOrder.price}.00</span>
                </div>
                <div className='flex justify-between text-gray-500 dark:text-gray-400'>
                  <span>Shipping Fee</span>
                  <span>{currency}10.00</span>
                </div>
                <div className='flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800'>
                  <span>Paid Total</span>
                  <span className='text-orange-600 dark:text-orange-400'>{currency}{activeInvoiceOrder.price + 10}.00</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Orders;

