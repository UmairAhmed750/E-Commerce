import React, { useState } from 'react';
import Title from '../component/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../component/NewsLetterBox';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  ArrowUpRight, 
  Clock, 
  Send, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitted(true);
    toast.success('✨ Message sent successfully! Our team will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='pt-6 space-y-16'
    >
      {/* Header Banner */}
      <div className='text-center py-6 max-w-2xl mx-auto space-y-3'>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-950/50 dark:to-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider border border-orange-200/80 dark:border-orange-900/50 shadow-sm'
        >
          <Sparkles className='w-3.5 h-3.5 text-orange-500 animate-pulse' />
          <span>WE ARE HERE FOR YOU 24/7</span>
        </motion.div>
        
        <div className='pt-1'>
          <Title text1={'GET IN'} text2={'TOUCH WITH US'} />
        </div>

        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-lg mx-auto'>
          Have a question about an order, custom styling request, or global partnership? We'd love to hear from you.
        </p>
      </div>

      {/* 4 Pillar Quick Info Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Store Address */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className='group p-7 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-b from-white/90 via-gray-50/60 to-orange-50/20 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-950 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between'
        >
          <div>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'>
              <MapPin className='w-6 h-6' />
            </div>
            <h4 className='font-bold text-lg text-gray-900 dark:text-white font-serif mb-2 group-hover:text-orange-500 transition-colors'>Flagship Store</h4>
            <p className='text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed'>
              Site Area, Muhammad Aqeel Shaheed Fire Station, Karachi, Pakistan
            </p>
          </div>

          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-500 mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 group/link"
          >
            <span>Get Directions</span> 
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"/>
          </a>
        </motion.div>

        {/* Customer Helpline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className='group p-7 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-b from-white/90 via-gray-50/60 to-orange-50/20 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-950 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between'
        >
          <div>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'>
              <Phone className='w-6 h-6' />
            </div>
            <h4 className='font-bold text-lg text-gray-900 dark:text-white font-serif mb-2 group-hover:text-orange-500 transition-colors'>Direct Phone Line</h4>
            <p className='text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed'>
              +92 311 8953057 <br />
              +1-212-456-7890
            </p>
          </div>

          <a 
            href="tel:+923118953057"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-500 mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 group/link"
          >
            <span>Call Customer Support</span> 
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"/>
          </a>
        </motion.div>

        {/* Official Email */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className='group p-7 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-b from-white/90 via-gray-50/60 to-orange-50/20 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-950 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between'
        >
          <div>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'>
              <Mail className='w-6 h-6' />
            </div>
            <h4 className='font-bold text-lg text-gray-900 dark:text-white font-serif mb-2 group-hover:text-orange-500 transition-colors'>Official Support</h4>
            <p className='text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed'>
              contact@forever.com <br />
              support@forever.com
            </p>
          </div>

          <a 
            href="mailto:contact@forever.com"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-500 mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 group/link"
          >
            <span>Send An Email</span> 
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"/>
          </a>
        </motion.div>

        {/* Store Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className='group p-7 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-b from-white/90 via-gray-50/60 to-orange-50/20 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-950 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between'
        >
          <div>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'>
              <Clock className='w-6 h-6' />
            </div>
            <div className='flex items-center gap-2 mb-2'>
              <h4 className='font-bold text-lg text-gray-900 dark:text-white font-serif group-hover:text-orange-500 transition-colors'>Opening Hours</h4>
              <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-semibold border border-green-500/20'>
                <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-ping' />
                <span>Open</span>
              </span>
            </div>
            <p className='text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed'>
              Mon - Sat: 9:00 AM - 8:00 PM PKT <br />
              Sunday: Closed
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80">
            <span>Online 24/7 Worldwide</span>
          </span>
        </motion.div>
      </div>

      {/* Main Interactive Contact Section */}
      <div className='flex flex-col lg:flex-row gap-12 items-start'>
        {/* Left Side Visual Banner & Careers Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='w-full lg:w-5/12 space-y-6'
        >
          <div className='overflow-hidden rounded-3xl shadow-2xl glass-card border border-gray-200/80 dark:border-gray-800 relative group'>
            <img className='w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700' src={assets.contact_img} alt="Contact Store" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none' />
            <div className='absolute bottom-6 left-6 right-6 text-white'>
              <span className='text-xs font-semibold text-orange-400 uppercase tracking-wider block mb-1'>Visit Us Today</span>
              <h4 className='text-lg font-bold font-serif'>Experience Personal Styling In Person</h4>
            </div>
          </div>

          {/* Careers Callout Box */}
          <div className='p-8 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-lg space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md'>
                <Briefcase className='w-6 h-6' />
              </div>
              <div>
                <h4 className='font-bold text-lg text-gray-900 dark:text-white font-serif'>Careers at Forever</h4>
                <p className='text-xs text-gray-500 dark:text-gray-400 font-light'>Join our international team of creators.</p>
              </div>
            </div>

            <p className='text-xs text-gray-600 dark:text-gray-300 font-light leading-relaxed'>
              We are always on the lookout for creative designers, tech innovators, and passionate brand ambassadors to join our fast-growing global team.
            </p>

            <button 
              onClick={() => toast.info('💼 We are currently accepting applications for Design & Support roles at careers@forever.com')}
              className='w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300'
            >
              <span>Explore Open Positions</span>
              <ArrowUpRight className='w-4 h-4' />
            </button>
          </div>
        </motion.div>

        {/* Right Side Interactive Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='w-full lg:w-7/12 p-8 sm:p-10 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-2xl space-y-6'
        >
          <div>
            <div className='inline-flex items-center gap-2 text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1'>
              <MessageSquare className='w-4 h-4' />
              <span>SEND A MESSAGE</span>
            </div>
            <h3 className='text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white'>
              How Can We Help You?
            </h3>
            <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light mt-1'>
              Fill out the form below and a customer experience specialist will respond within 24 hours.
            </p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='p-8 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-center space-y-3'
            >
              <CheckCircle2 className='w-12 h-12 text-orange-500 mx-auto' />
              <h4 className='text-xl font-bold text-gray-900 dark:text-white font-serif'>Thank You For Reaching Out!</h4>
              <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light max-w-md mx-auto leading-relaxed'>
                We have received your message. Our style consultants are already on it and will reply to your email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className='px-6 py-2.5 rounded-xl bg-orange-500 text-white font-medium text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors mt-2'
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div>
                  <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                    Full Name *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder='John Doe'
                    className='w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all'
                  />
                </div>

                <div>
                  <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                    Email Address *
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='john@example.com'
                    className='w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div>
                  <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='+92 311 0000000'
                    className='w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all'
                  />
                </div>

                <div>
                  <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                    Subject
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder='Order Status / Custom Inquiry'
                    className='w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                  Your Message *
                </label>
                <textarea
                  name='message'
                  rows='4'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder='Write your inquiry or question here...'
                  className='w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none'
                />
              </div>

              <button
                type='submit'
                className='w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 group'
              >
                <Send className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <NewsLetterBox />
    </motion.div>
  );
};

export default Contact;
