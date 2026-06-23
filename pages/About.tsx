import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#111] text-white flex items-center justify-center p-8"
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tight">EXPERIENCE DESIGNER</h1>
        <p className="text-gray-400 text-xl leading-relaxed font-sans">
          Serkan Arslan is a multifaceted creative professional bridging the gap between technical production and aesthetic narrative. With over a decade of experience in video production, motion design, and creative direction, he crafts visual artifacts that resonate on a visceral level.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
