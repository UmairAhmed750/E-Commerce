import React from 'react';
import Title from '../component/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../component/NewsLetterBox';
import { motion } from 'framer-motion';
import { 
  Award, 
  Zap, 
  Smile, 
  ShieldCheck, 
  Globe2, 
  Users, 
  Leaf, 
  Sparkles, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const milestones = [
  { year: '1978', title: 'Brand Inception', desc: 'Founded with a vision to revolutionize everyday fashion with sustainable, high-grade fabrics.' },
  { year: '2005', title: 'Global Footprint', desc: 'Expanded retail and logistics operations into over 120 countries worldwide.' },
  { year: '2018', title: 'Eco Revolution', desc: 'Committed to 100% organic cotton, zero waste packaging, and carbon-neutral shipping.' },
  { year: '2026', title: 'Modern Luxury Flagship', desc: 'Pioneering contemporary streetwear and luxury fashion for over 500,000 global fashion enthusiasts.' }
];

const values = [
  {
    icon: Award,
    title: 'Uncompromising Quality',
    desc: 'Every garment undergoes 12-point quality checks to ensure flawless stitching, premium texture, and long-lasting durability.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Craftsmanship',
    desc: 'We source 100% ethically grown organic cotton and cashmere blends to minimize environmental impact.'
  },
  {
    icon: Zap,
    title: 'Seamless Convenience',
    desc: 'Intelligent digital shopping, instant size recommendations, and rapid global dispatch within 24 hours.'
  },
  {
    icon: Smile,
    title: 'Customer First Philosophy',
    desc: 'Dedicated 24/7 style advisory and no-questions-asked 7-day exchange policies for total peace of mind.'
  }
];

const team = [
  {
    name: 'Eleanor Vance',
    role: 'Founder & CEO',
    bio: 'Pioneering sustainable fashion vision for 20+ years.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Julian Sterling',
    role: 'Creative Director',
    bio: 'Former Paris Fashion Week designer leading modern streetwear.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Amara Chen',
    role: 'Head of Sustainability',
    bio: 'Driving carbon-neutral logistics and eco-fabric innovation.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300'
  }
];

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='pt-6 space-y-20'
    >
      {/* Header Banner */}
      <div className='text-center py-4'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-orange-200 dark:border-orange-900/40'
        >
          <Sparkles className='w-3.5 h-3.5 text-orange-500 animate-pulse' />
          <span>ESTABLISHED SINCE 1978</span>
        </motion.div>
        <Title text1={'OUR'} text2={'STORY & HERITAGE'} />
        <p className='w-full sm:w-2/3 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2'>
          Discover the passion, craftsmanship, and commitment to luxury fashion that drives everything we create.
        </p>
      </div>

      {/* Main Brand Overview Grid */}
      <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 items-center'>
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className='w-full lg:w-1/2 overflow-hidden rounded-3xl shadow-2xl glass-card relative group border border-gray-200/60 dark:border-gray-800'
        >
          <img className='w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700' src={assets.about_img} alt="About Forever" />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none' />
          <div className='absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border border-white/20 text-gray-900 dark:text-white'>
            <p className='text-xs font-bold uppercase text-orange-500 tracking-wider'>Global Excellence</p>
            <h4 className='text-sm font-semibold mt-0.5'>Crafting Timeless Elegance For Over 4 Decades</h4>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='w-full lg:w-1/2 space-y-6 text-gray-600 dark:text-gray-300 font-light leading-relaxed text-sm sm:text-base'
        >
          <h3 className='text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white leading-tight'>
            Redefining Luxury Through <br />
            <span className='bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent'>
              Sustainable Innovation
            </span>
          </h3>

          <p>
            Forever Living Products is a global luxury house dedicated to sourcing, tailoring, and curating premier apparel. Founded in 1978, we own our supply chain and distribution networks, guaranteeing uncompromised standard across every thread.
          </p>

          <p>
            Operating across more than 160 countries, we focus on luxurious sustainable textiles, precision tailoring, and contemporary silhouettes that elevate your wardrobe for all occasions.
          </p>

          <div className='p-6 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 text-gray-900 dark:text-gray-100'>
            <h4 className='font-semibold text-base font-serif text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-2'>
              <ShieldCheck className='w-5 h-5' />
              Our Core Mission
            </h4>
            <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed'>
              To empower individuals around the globe with timeless fashion, confidence, and supreme comfort while upholding carbon-neutral production practices.
            </p>
          </div>

          <div className='pt-2'>
            <Link 
              to="/collection" 
              className='inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm shadow-lg hover:shadow-orange-500/20 hover:scale-105 transition-all duration-300 group'
            >
              <span>DISCOVER OUR COLLECTIONS</span>
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Live Brand Statistics Counter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-950 to-orange-950 text-white border border-gray-800 shadow-2xl relative overflow-hidden'
      >
        <div className='absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none' />

        <div className='text-center space-y-1 relative z-10'>
          <div className='w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto mb-3'>
            <Globe2 className='w-5 h-5' />
          </div>
          <h3 className='text-3xl sm:text-4xl font-bold font-mono text-orange-400'>160+</h3>
          <p className='text-xs text-gray-400 uppercase tracking-wider font-medium'>Global Markets</p>
        </div>

        <div className='text-center space-y-1 relative z-10'>
          <div className='w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto mb-3'>
            <Users className='w-5 h-5' />
          </div>
          <h3 className='text-3xl sm:text-4xl font-bold font-mono text-orange-400'>500k+</h3>
          <p className='text-xs text-gray-400 uppercase tracking-wider font-medium'>Happy Customers</p>
        </div>

        <div className='text-center space-y-1 relative z-10'>
          <div className='w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto mb-3'>
            <Leaf className='w-5 h-5' />
          </div>
          <h3 className='text-3xl sm:text-4xl font-bold font-mono text-orange-400'>100%</h3>
          <p className='text-xs text-gray-400 uppercase tracking-wider font-medium'>Eco Sustainable</p>
        </div>

        <div className='text-center space-y-1 relative z-10'>
          <div className='w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto mb-3'>
            <Award className='w-5 h-5' />
          </div>
          <h3 className='text-3xl sm:text-4xl font-bold font-mono text-orange-400'>4.9★</h3>
          <p className='text-xs text-gray-400 uppercase tracking-wider font-medium'>Global Rating</p>
        </div>
      </motion.div>

      {/* Brand Milestones Timeline */}
      <section className='space-y-8'>
        <div className='text-center'>
          <Title text1={'OUR JOURNEY &'} text2={'MILESTONES'} />
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light mt-1'>
            Key chapters in our decades-long journey towards perfection.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {milestones.map((ms, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className='p-6 rounded-2xl glass-card border border-gray-200/60 dark:border-gray-800 flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 shadow-sm hover:shadow-lg'
            >
              <div>
                <span className='text-2xl font-bold font-mono text-orange-500 block mb-2'>{ms.year}</span>
                <h4 className='font-semibold text-base text-gray-900 dark:text-white mb-2 font-serif'>{ms.title}</h4>
                <p className='text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed'>{ms.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Values */}
      <section className='space-y-8'>
        <div className='text-center'>
          <Title text1={'WHY CHOOSE'} text2={'FOREVER'} />
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light mt-1'>
            The 4 pillars that define our craftsmanship and service excellence.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {values.map((box, index) => {
            const IconComp = box.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className='p-8 rounded-2xl glass-card border border-gray-200/60 dark:border-gray-800/80 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-gray-900/60'
              >
                <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-orange-500/20'>
                  <IconComp className='w-6 h-6' />
                </div>
                <h3 className='font-semibold text-base text-gray-900 dark:text-white tracking-wide font-serif'>{box.title}</h3>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed'>{box.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Meet Leadership Team */}
      <section className='space-y-8 pb-10'>
        <div className='text-center'>
          <Title text1={'MEET OUR'} text2={'LEADERSHIP'} />
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light mt-1'>
            The visionaries behind our sustainable luxury collections.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {team.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className='rounded-2xl overflow-hidden glass-card border border-gray-200/80 dark:border-gray-800/80 shadow-lg text-center p-6 bg-white/70 dark:bg-gray-900/60'
            >
              <img
                src={person.image}
                alt={person.name}
                className='w-28 h-28 rounded-full object-cover mx-auto mb-4 border-2 border-orange-500/40 shadow-md'
                onError={(e) => { e.target.src = assets.profile_icon; }}
              />
              <h4 className='font-bold text-lg text-gray-900 dark:text-white font-serif'>{person.name}</h4>
              <p className='text-xs text-orange-500 font-semibold uppercase tracking-wider mt-0.5 mb-2'>{person.role}</p>
              <p className='text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed'>{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <NewsLetterBox />
    </motion.div>
  );
};

export default About;
