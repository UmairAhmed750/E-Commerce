import React from 'react';
import Hero from '../component/Hero';
import CategoryShowcase from '../component/CategoryShowcase';
import LatestCollection from '../component/LatestCollection';
import FlashSale from '../component/FlashSale';
import BestSeller from '../component/BestSeller';
import FeaturedBanners from '../component/FeaturedBanners';
import Testimonials from '../component/Testimonials';
import StyleGallery from '../component/StyleGallery';
import FAQSection from '../component/FAQSection';
import OurPolicy from '../component/OurPolicy';
import NewsLetterBox from '../component/NewsLetterBox';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 overflow-hidden"
    >
      <Hero />
      <CategoryShowcase />
      <LatestCollection />
      <FlashSale />
      <div id="bestsellers">
        <BestSeller />
      </div>
      <FeaturedBanners />
      <Testimonials />
      <StyleGallery />
      <FAQSection />
      <OurPolicy />
      <NewsLetterBox />
    </motion.div>
  );
};

export default Home;
