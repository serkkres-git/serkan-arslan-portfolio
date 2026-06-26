import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Box, Move } from 'lucide-react';

const MotionDesigner: React.FC = () => {
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="text-center mb-24 relative z-10">
            <span className="text-[#E63946] font-heading text-xs tracking-[0.5em] uppercase block mb-6 px-4 py-1 border border-[#E63946] inline-block">Dynamic Visual States</span>
            <h1 className="text-6xl md:text-9xl font-heading font-extrabold mb-8 tracking-wide">DESIGNER</h1>
            <p className="text-gray-500 text-xl font-heading tracking-widest max-w-2xl mx-auto">
              BREATHING LIFE INTO STATIC GEOMETRY.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 aspect-video bg-gray-900 border border-white/10 relative overflow-hidden group">
               <img 
                src="https://images.squarespace-cdn.com/content/v1/69bdbd29a49f665fb2f0dbac/92911b12-ba4f-40af-83cf-29a047b84567/MotionDesignHeaderImage.webp?format=2500w"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                alt="Motion design header"
              />
              <div className="absolute inset-0 bg-[#E63946]/0 group-hover:bg-[#E63946]/10 transition-colors duration-[2s] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading text-xl">2D/3D ANIMATION</h3>
                <p className="text-gray-400 text-sm">Keyframe perfectionist.</p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
               <div className="flex-1 bg-white/5 border border-white/10 p-10 flex flex-col items-center justify-center text-center group hover:bg-[#E63946]/5 hover:shadow-[0_0_30px_rgba(230,57,70,0.06)] transition-all">
                  <Box className="text-[#E63946] mb-4 group-hover:rotate-12 transition-transform" size={48} />
                  <h4 className="font-heading text-sm uppercase tracking-widest">Procedural Work</h4>
               </div>
               <div className="flex-1 bg-white/5 border border-white/10 p-10 flex flex-col items-center justify-center text-center group hover:bg-[#E63946]/5 hover:shadow-[0_0_30px_rgba(230,57,70,0.06)] transition-all">
                  <Move className="text-[#E63946] mb-4 group-hover:translate-x-2 transition-transform" size={48} />
                  <h4 className="font-heading text-sm uppercase tracking-widest">Interface Motion</h4>
               </div>
            </div>
          </div>
        </motion.div>

        <section className="mt-32 border-t border-white/5 pt-20">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <h2 className="font-heading text-4xl font-bold mb-8 leading-tight underline decoration-[#E63946] underline-offset-8">PHILOSOPHY</h2>
                <p className="text-gray-400 text-lg leading-relaxed font-sans">
                  Motion isn't just about moving pixels; it's about guiding attention and reinforcing user intent. Every easing curve is a decision, and every transition is a bridge between concepts.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors font-heading text-xs tracking-tighter" data-hover="true">
                      SKILL_SET_0{i}
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
    </motion.div>
  );
};

export default MotionDesigner;
