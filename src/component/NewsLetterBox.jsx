import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!email) return;

    setSubscribed(true);
    toast.success('🎉 Welcome to the VIP Club! Your 20% discount code is: LUXE20');
    setEmail('');
  };

  return (
    <section className="my-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-orange-950 p-8 sm:p-14 text-center text-white border border-gray-800 shadow-2xl"
      >
        {/* Glow Spheres */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* VIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>JOIN THE VIP INSIDERS CLUB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4">
            Unlock <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">20% Off</span> Your First Order
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-8">
            Subscribe to get early private access to limited drops, seasonal sales, secret lookbooks, and luxury lifestyle updates directly to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-center max-w-md mx-auto"
            >
              <CheckCircle2 className="w-10 h-10 text-orange-400 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-white">You're On The List!</h4>
              <p className="text-xs text-gray-300 mt-1">Use promo code <span className="font-mono text-orange-400 font-bold">LUXE20</span> at checkout.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 group"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-gray-400 font-light mt-4">
            🔒 We respect your privacy. Unsubscribe at any time with 1-click.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsLetterBox;
