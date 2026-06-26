import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Film } from 'lucide-react';

const VideoEditor: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#111] text-white"
    >
      <main className="max-w-7xl mx-auto px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-16"
        >
          <div className="max-w-3xl">
            <span className="text-[#0EA5E9] font-heading text-xs tracking-[0.3em] uppercase block mb-4">Narrative Sculpting</span>
            <h1 className="text-5xl md:text-8xl font-heading font-bold mb-8 tracking-tighter">VIDEO EDITOR</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Cutting to the core of the human experience. I transform raw footage into cohesive, emotionally resonant stories using timing, rhythm, and structural precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
            <div className="relative overflow-hidden bg-white/5 border border-white/10 group h-full">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/69bdbd29a49f665fb2f0dbac/263b3b57-bb11-461b-8310-d79ba19d7241/VideoEditorHeaderImage.webp?format=2500w"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-1000"
                alt="Editor desk"
              />
              <div className="absolute inset-0 bg-[#0EA5E9]/0 group-hover:bg-[#0EA5E9]/10 transition-colors duration-1000 pointer-events-none" />
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <Scissors className="text-[#0EA5E9]" size={32} />
                <div>
                   <h3 className="font-heading text-2xl mb-2">COMMERCIALS</h3>
                   <p className="text-gray-500 font-sans text-sm">30 seconds to define a world.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-4 h-full">
               <div className="bg-[#0EA5E9] p-12 flex flex-col justify-between text-black shadow-[0_0_30px_rgba(14,165,233,0.18)]">
                  <Film size={32} />
                  <div>
                    <h3 className="font-heading text-2xl mb-2">DOCUMENTARY</h3>
                    <p className="font-sans font-medium text-sm">Finding truth in the assembly.</p>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 p-12 flex flex-col justify-center items-center text-center">
                  <h3 className="font-heading text-4xl mb-2">0.01s</h3>
                  <p className="text-gray-500 font-sans text-xs uppercase tracking-widest">Precision is everything</p>
               </div>
            </div>
          </div>
        </motion.div>

        <section className="mt-32">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-heading text-2xl tracking-wide uppercase italic">The Vault</h2>
            <p className="text-gray-500 text-xs">ARCHIVE 2020-2025</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="aspect-[16/9] bg-white/5 border border-white/10 hover:bg-[#0EA5E9]/10 hover:border-[#0EA5E9] transition-all flex items-center justify-center text-center p-4 cursor-pointer" data-hover="true">
                 <span className="font-heading text-[10px] tracking-widest">REEL ITEM {i + 1}</span>
               </div>
             ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default VideoEditor;
