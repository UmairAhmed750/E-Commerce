import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Zap, ShoppingBag } from 'lucide-react';
import { assets } from '../assets/frontend_assets/assets';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section className="my-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-950 to-orange-950 text-white p-8 sm:p-12 border border-gray-800 shadow-2xl"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text & Timer */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <span>Limited Time Offer • Up to 50% OFF</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight">
              Midnight Luxury <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Flash Sale Event
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base mb-8 font-light leading-relaxed">
              Grab premium seasonal outerwear and iconic designer staples at unprecedented prices. Stock is strictly limited.
            </p>

            {/* Countdown Box */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md min-w-[70px] sm:min-w-[80px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-orange-400">
                  {formatNum(timeLeft.hours)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Hours</span>
              </div>
              <span className="text-2xl font-bold text-orange-400 animate-pulse">:</span>

              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md min-w-[70px] sm:min-w-[80px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-orange-400">
                  {formatNum(timeLeft.minutes)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Mins</span>
              </div>
              <span className="text-2xl font-bold text-orange-400 animate-pulse">:</span>

              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md min-w-[70px] sm:min-w-[80px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-orange-400">
                  {formatNum(timeLeft.seconds)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Secs</span>
              </div>
            </div>

            <Link
              to="/collection"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>SHOP FLASH DEALS NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Featured Product Showcase Card */}
          <div className="relative group">
            <div className="w-72 sm:w-80 h-96 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-gray-900">
              <img
                src={assets.p_img10}
                alt="Flash Sale Featured Item"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Discount Tag */}
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <span>SAVE 45%</span>
              </div>

              {/* Bottom Card Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-xs uppercase text-orange-400 font-semibold tracking-wider">Spotlight Deal</p>
                <h4 className="text-lg font-bold">Men Ultra Light Down Jacket</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xl font-bold text-white">$79.00</span>
                  <span className="text-sm text-gray-400 line-through">$149.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FlashSale;
