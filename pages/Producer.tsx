import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Layout } from 'lucide-react';
import GalleryView from '../components/GalleryView';
import Footer from '../components/Footer';

const Producer: React.FC = () => {
  const { scrollY } = useScroll();
  const [layoutXStart, setLayoutXStart] = useState(0);
  const [layoutXEnd, setLayoutXEnd] = useState(0);
  const [targetScale, setTargetScale] = useState(0.333333);
  const theRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleResize = () => {
      let clientWidth = document.documentElement.clientWidth;
      let left = Math.max(32, (clientWidth - 1280) / 2 + 32);
      
      let scale = clientWidth < 768 ? 0.5 : 0.333333;
      setTargetScale(scale);

      let theWidthScaled = (theRef.current?.offsetWidth || 0) * scale;
      
      setLayoutXStart(left);
      setLayoutXEnd(32 + theWidthScaled);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    document.fonts.ready.then(handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const titleScale = useTransform(scrollY, [0, 192], [1, targetScale], { clamp: true });
  const titleX = useTransform(scrollY, [0, 192], [layoutXStart, layoutXEnd], { clamp: true });
  const titleY = useTransform(scrollY, [0, 192], [256, 64], { clamp: true });
  const theOpacity = useTransform(scrollY, [0, 192], [0, 1], { clamp: true });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#111] text-white"
    >
      {/* Fixed animation layer to avoid sticky context bugs */}
      <div className="fixed top-0 left-0 z-[100001] w-full h-0 pointer-events-none mix-blend-difference">
        <motion.div 
          style={{ x: titleX, y: titleY, scale: titleScale }} 
          className="origin-top-left flex relative w-max text-white"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black uppercase text-white m-0 leading-tight relative">
            <motion.span 
              ref={theRef}
              style={{ opacity: theOpacity, display: 'inline-block' }} 
              className="absolute right-[100%] pr-[0.3em] font-sans font-light text-[#00e58c] text-3xl md:text-5xl -mt-2"
            >
              The
            </motion.span>
            PRODUCER
          </h1>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-8 pt-[256px] pb-0 relative snap-start">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black uppercase opacity-0 pointer-events-none m-0 leading-tight" aria-hidden="true" style={{ userSelect: 'none' }}>
              <span className="absolute right-[100%] pr-[0.3em] font-sans font-light text-[#00e58c] text-3xl md:text-5xl -mt-2">The</span>
              PRODUCER
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mt-6 mb-12 max-w-xl">
              Orchestrating high-impact visual narratives. Specializing in technical production, creative direction, and the architecture of immersive media.
            </p>
          </div>

          <div className="relative aspect-video bg-gray-900 overflow-hidden group">
             <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071" 
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              alt="Producer workflow"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-[#8075ff] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-2xl" data-hover="true">
                <Play fill="white" size={32} className="ml-1" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="font-heading text-[10px] tracking-widest uppercase opacity-50">Showreel 2025</div>
              <Layout size={20} className="text-[#8075ff]" />
            </div>
          </div>
        </motion.div>

        {/* Project Grid / Demo implementation */}
        <section className="w-[100vw] relative left-1/2 -translate-x-1/2 snap-start pt-24 pb-16 min-h-screen flex flex-col justify-start">
          <h2 className="font-heading text-2xl mb-12 tracking-wide text-center">PROJECTS</h2>
          <GalleryView />
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Producer;
