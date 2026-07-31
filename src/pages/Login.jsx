import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign up') {
        const response = await axios.post(`${backendUrl}api/user/register`, {
          name,
          email,
          password,
        });
        console.log(response.data);
        alert("Account created. Please login.");
        setCurrentState('Login');
      } else {
        const response = await axios.post(`${backendUrl}api/user/login`, {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error during auth:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-[70vh] flex items-center justify-center py-10'
    >
      <form 
        onSubmit={onSumbitHandler} 
        className='flex flex-col items-center w-[92%] sm:max-w-md p-8 sm:p-10 rounded-3xl glass-panel border border-gray-200/80 dark:border-gray-800/80 shadow-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl text-gray-800 dark:text-gray-100 relative overflow-hidden'
      >
        <div className='absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none' />

        <div className='inline-flex items-center gap-3 mb-6'>
          <h2 className='prata-regular text-3xl font-semibold text-gray-900 dark:text-white tracking-wide'>{currentState}</h2>
          <hr className='border-none h-[2px] w-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full' />
        </div>

        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentState}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='w-full flex flex-col gap-4'
          >
            {currentState !== 'Login' && (
              <div className='relative w-full'>
                <User className='absolute left-3.5 top-3.5 w-4 h-4 text-gray-400' />
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-orange-500 transition-colors font-light' 
                  placeholder='Full Name'
                  required
                />
              </div>
            )}

            <div className='relative w-full'>
              <Mail className='absolute left-3.5 top-3.5 w-4 h-4 text-gray-400' />
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-orange-500 transition-colors font-light' 
                placeholder='Email Address' 
                required
              />
            </div>

            <div className='relative w-full'>
              <Lock className='absolute left-3.5 top-3.5 w-4 h-4 text-gray-400' />
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-orange-500 transition-colors font-light' 
                placeholder='Password' 
                required
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className='w-full flex justify-between text-xs text-gray-500 dark:text-gray-400 my-4 font-light'>
          <p className='cursor-pointer hover:text-orange-500 transition-colors'>Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer hover:text-orange-500 font-medium transition-colors'>Create account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-orange-500 font-medium transition-colors'>Sign in instead</p>
          )}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 tracking-wider uppercase transition-all mt-2'
        >
          <span>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</span>
          <ArrowRight className='w-4 h-4' />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Login;
