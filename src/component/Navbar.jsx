import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search, User, ShoppingBag, Menu, ChevronLeft, X } from 'lucide-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCounts, theme, toggleTheme } = useContext(ShopContext);
  const location = useLocation();
  const isCollectionPage = location.pathname.includes('collection');

  const navItemVariants = {
    hover: { scale: 1.08 },
    tap: { scale: 0.92 }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='sticky top-0 z-40 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-xl flex items-center justify-between py-3 sm:py-4 px-2 sm:px-4 font-medium border-b border-gray-200/60 dark:border-gray-800/80 transition-all duration-300'
    >
      {/* Brand Logo */}
      <Link to='/' className='relative group flex-shrink-0'>
        <img
          src={assets.logo}
          className='w-28 sm:w-36 dark:invert transition-transform duration-300 group-hover:scale-105'
          alt="Forever Logo"
        />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className='hidden sm:flex gap-6 text-sm text-gray-700 dark:text-gray-200 tracking-wide'>
        {[
          { name: 'Home', path: '/' },
          { name: 'Collection', path: '/collection' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' }
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 py-1 px-2 rounded-md transition-colors duration-200 ${isActive ? 'text-black dark:text-white font-semibold' : 'hover:text-black dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p>{item.name}</p>
                {isActive && (
                  <motion.hr
                    layoutId='activeNavTab'
                    className='w-3/4 border-none h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full'
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Action Icons Right Section */}
      <div className='flex items-center gap-2 sm:gap-5'>
        {/* Dark / Light Theme Toggle */}
        <motion.button
          variants={navItemVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={toggleTheme}
          className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors cursor-pointer text-gray-700 dark:text-yellow-400 focus:outline-none flex items-center justify-center'
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label='Toggle Theme'
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400 fill-current" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800 fill-none stroke-[2.2]" />
          )}
        </motion.button>

        {/* Search Icon (Only visible on /collection page) */}
        {isCollectionPage && (
          <motion.button
            variants={navItemVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setShowSearch(true)}
            className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors text-gray-700 dark:text-gray-200'
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </motion.button>
        )}

        {/* Profile Icon with Dropdown */}
        <div className='group relative'>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to={'/login'} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors text-gray-700 dark:text-gray-200 block'>
              <User className="w-5 h-5 stroke-[2]" />
            </Link>
          </motion.div>

          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-50'>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className='flex flex-col gap-2 w-40 py-3 px-5 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800'
            >
              <p className='cursor-pointer hover:text-black dark:hover:text-white transition-colors py-1 text-sm font-medium'>My Profile</p>
              <p className='cursor-pointer hover:text-black dark:hover:text-white transition-colors py-1 text-sm font-medium'>Orders</p>
              <p className='cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition-colors py-1 text-sm font-medium text-red-500'>Logout</p>
            </motion.div>
          </div>
        </div>

        {/* Cart Icon */}
        <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
          <Link to='/cart' className='relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors text-gray-700 dark:text-gray-200 block'>
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            <motion.p
              key={getCartCounts()}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className='absolute right-0.5 bottom-0.5 w-4 text-center leading-4 bg-orange-600 text-white font-bold aspect-square rounded-full text-[9px] shadow-sm'
            >
              {getCartCounts()}
            </motion.p>
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setVisible(true)}
          className='p-2 rounded-lg sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors text-gray-800 dark:text-gray-200'
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6 stroke-[2]" />
        </motion.button>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      <AnimatePresence>
        {visible && (
          <>
            {/* Backdrop Dim Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVisible(false)}
              className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 sm:hidden'
            />

            {/* Solid Opaque Drawer */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className='fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-white dark:bg-[#0b0f19] z-50 shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-800 sm:hidden'
            >
              <div className='flex flex-col text-gray-800 dark:text-gray-100 h-full bg-white dark:bg-[#0b0f19]'>
                {/* Back / Close Header */}
                <div
                  onClick={() => setVisible(false)}
                  className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors'
                >
                  <div className='flex items-center gap-2'>
                    <ChevronLeft className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                    <p className='font-semibold text-sm tracking-wider uppercase text-gray-900 dark:text-white'>Back</p>
                  </div>
                  <X className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                </div>

                {/* Navigation Links */}
                <div className='flex flex-col py-2 divide-y divide-gray-100 dark:divide-gray-800/80 bg-white dark:bg-[#0b0f19]'>
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Collection', path: '/collection' },
                    { name: 'About', path: '/about' },
                    { name: 'Contact', path: '/contact' }
                  ].map((link) => (
                    <NavLink
                      key={link.name}
                      onClick={() => setVisible(false)}
                      className={({ isActive }) =>
                        `py-4 px-6 text-base font-medium transition-colors flex items-center justify-between ${isActive
                          ? 'text-orange-600 dark:text-orange-400 bg-orange-50/80 dark:bg-orange-950/40 font-semibold'
                          : 'text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'
                        }`
                      }
                      to={link.path}
                    >
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
