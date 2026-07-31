import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  Heart 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-32 pt-16 border-t border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-100/80 dark:via-gray-950/40 dark:to-gray-950 text-gray-600 dark:text-gray-400">
      {/* Decorative Top Glow Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className="inline-block">
              <img 
                src={assets.logo} 
                className="w-36 dark:invert transition-all duration-300 hover:opacity-90" 
                alt="Forever Logo" 
              />
            </Link>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Forever Living Products is committed to delivering exceptional quality apparel crafted with sustainable practices, modern streetwear design, and timeless luxury elegance.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p className="text-sm font-bold tracking-wider text-gray-900 dark:text-white mb-5 uppercase font-serif">
              Quick Links
            </p>
            <ul className="space-y-3 font-light text-xs sm:text-sm">
              <li>
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-300 w-max"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/collection" 
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-300 w-max"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Shop Collection</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-300 w-max"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/orders" 
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-300 w-max"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Delivery & Returns</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-300 w-max"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <p className="text-sm font-bold tracking-wider text-gray-900 dark:text-white mb-5 uppercase font-serif">
              Get In Touch
            </p>
            <ul className="space-y-3.5 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <a href="tel:+12124567890" className="hover:text-orange-500 transition-colors">
                  +1-212-456-7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <a href="mailto:contact@forever.com" className="hover:text-orange-500 transition-colors">
                  contact@forever.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Karachi, Pakistan</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods & Security */}
          <div>
            <p className="text-sm font-bold tracking-wider text-gray-900 dark:text-white mb-5 uppercase font-serif">
              Secure Checkout
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-light mb-4 leading-relaxed">
              We process encrypted, highly secure payments guaranteed by trusted global partners.
            </p>

            {/* Payment Logos */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
                <img src={assets.stripe_logo} alt="Stripe" className="h-4 object-contain" />
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
                <img src={assets.razorpay_logo} alt="Razorpay" className="h-4 object-contain" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Scroll to Top Bar */}
        <div className="py-6 border-t border-gray-200/80 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400 font-light">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>Copyright 2026 @ forever.com - All Rights Reserved. Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline" />
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 shadow-sm group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
