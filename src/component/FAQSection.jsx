import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Title from './Title';

const faqs = [
  {
    question: 'How long does express shipping take?',
    answer: 'Standard domestic express orders arrive within 2 to 4 business days. International express orders are typically delivered within 5 to 7 business days with end-to-end tracking.'
  },
  {
    question: 'What is your 7-Day return & exchange policy?',
    answer: 'If you are not 100% satisfied with your item size or fit, you can initiate a hassle-free return or exchange within 7 days of receiving your package. Items must be unworn with original tags attached.'
  },
  {
    question: 'Are all products 100% authentic and original?',
    answer: 'Yes! All items in our catalog are designed, ethically manufactured, and rigorously quality-tested before dispatch. We guarantee 100% authenticity on every piece.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit/debit cards (Visa, MasterCard, American Express), Stripe, Razorpay, Cash on Delivery (COD), and Apple Pay/Google Pay.'
  },
  {
    question: 'How do I choose the correct size?',
    answer: 'You can consult our detailed Size Guide on every product page. We provide precise measurements for chest, shoulder, length, and waist along with fit recommendations.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-6"
      >
        <Title text1="FREQUENTLY ASKED" text2="QUESTIONS" />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2">
          Got questions? We have answers. Find everything you need to know about ordering, shipping, returns, and fit.
        </p>
      </motion.div>

      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 overflow-hidden shadow-sm hover:border-orange-500/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-medium text-gray-900 dark:text-white transition-colors"
              >
                <span className="flex items-center gap-3 text-sm sm:text-base font-semibold">
                  <HelpCircle className="w-5 h-5 text-orange-500 shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-orange-500' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light border-t border-gray-100 dark:border-gray-800/60 mt-1 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
