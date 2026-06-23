import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#111] text-white flex items-center justify-center p-8"
    >
      <div className="max-w-xl text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">GET IN TOUCH</h1>
        <p className="text-[#8075ff] font-heading text-xl mb-12 tracking-widest uppercase italic">Available for select projects worldwide.</p>
        <div className="space-y-4">
          <p className="text-2xl font-sans hover:text-[#8075ff] transition-colors cursor-pointer">hello@serkanarslan.com</p>
          <div className="flex justify-center gap-8 pt-8">
            <span className="text-gray-500 font-heading text-xs tracking-widest uppercase hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span className="text-gray-500 font-heading text-xs tracking-widest uppercase hover:text-white cursor-pointer transition-colors">LinkedIn</span>
            <span className="text-gray-500 font-heading text-xs tracking-widest uppercase hover:text-white cursor-pointer transition-colors">Vimeo</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
