import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, Headphones, Truck } from 'lucide-react';
import Title from './Title';

const OurPolicy = () => {
  const policies = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      desc: 'Complimentary express shipping on all orders over $150 with end-to-end tracking.'
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free Exchanges',
      desc: 'Instant, no-questions-asked exchange policy on all products within 7 days.'
    },
    {
      icon: ShieldCheck,
      title: '100% Money-Back Guarantee',
      desc: 'Complete buyer security with guaranteed authentic products & full refunds.'
    },
    {
      icon: Headphones,
      title: '24/7 VIP Customer Care',
      desc: 'Our dedicated style consultants & support team are always available round the clock.'
    }
  ];

  return (
    <section className='my-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-6"
      >
        <Title text1="WHY SHOP" text2="WITH US" />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2">
          Experience world-class luxury shopping with unmatched customer guarantees and VIP care.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
        {policies.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='p-8 rounded-2xl glass-card flex flex-col items-center text-center group border border-gray-200/60 dark:border-gray-800/80 hover:border-orange-500/50 transition-all duration-300 shadow-sm hover:shadow-xl bg-white/60 dark:bg-gray-900/50'
            >
              <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md shadow-orange-500/20'>
                <IconComponent className='w-7 h-7 stroke-[2]' />
              </div>
              <h3 className='font-semibold text-base text-gray-900 dark:text-white mb-2 tracking-wide font-serif'>
                {item.title}
              </h3>
              <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed'>
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OurPolicy;
