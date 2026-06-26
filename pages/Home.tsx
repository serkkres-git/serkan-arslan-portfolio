import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  title: string;
  subtext: string;
  image: string;
  link: string;
  hoverImage?: string;
  hoverImages?: string[];
}

const CATEGORIES: Category[] = [
  {
    id: 'producer',
    title: 'PRODUCER',
    subtext: 'first spark to the final frame',
    image: 'https://serkanarslan.me/media/images/landingpage/landingpage_producer_bg.png',
    link: '/producer'
  },
  {
    id: 'editor',
    title: 'VIDEO EDITOR',
    subtext: 'narrative sculpting',
    image: 'https://serkanarslan.me/media/images/landingpage/landingpage_editor_bg.png',
    link: '/video-editor'
  },
  {
    id: 'designer',
    title: 'MOTION DESIGNER',
    subtext: 'dynamic visual experiences',
    image: 'https://serkanarslan.me/media/images/landingpage/landingpage_motion_bg.png',
    link: '/motion-designer'
  }
];

const CategoryColumn: React.FC<{ cat: Category }> = ({ cat }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    if (isHovered && cat.id === 'editor' && cat.hoverImages) {
      timeout1 = setTimeout(() => setStage(1), 200);
      timeout2 = setTimeout(() => setStage(2), 350);
      timeout3 = setTimeout(() => setStage(3), 500);
    } else {
      setStage(0);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isHovered, cat.id, cat.hoverImages]);

  return (
    <Link 
      to={cat.link} 
      className="column-link group"
      style={{
        '--theme-glow': cat.id === 'producer' ? 'rgba(46,189,142,0.18)' :
                        cat.id === 'designer' ? 'rgba(230,57,70,0.18)' :
                        'rgba(14,165,233,0.18)'
      } as React.CSSProperties}
      data-hover="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cat.id === 'editor' && cat.hoverImages ? (
        <>
          <div 
            className={`column-bg transition-opacity duration-200 ${stage === 0 ? 'opacity-100' : 'opacity-0'}`} 
            style={{ backgroundImage: `url('${cat.image}')` }} 
          />
          <div 
            className={`column-bg transition-opacity duration-100 ${stage === 1 ? 'opacity-100' : 'opacity-0'}`} 
            style={{ backgroundImage: `url('${cat.hoverImages[0]}')` }} 
          />
          <div 
            className={`column-bg transition-opacity duration-100 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`} 
            style={{ backgroundImage: `url('${cat.hoverImages[1]}')` }} 
          />
          <div 
            className={`column-bg transition-opacity duration-200 ${stage === 3 ? 'opacity-100' : 'opacity-0'}`} 
            style={{ backgroundImage: `url('${cat.hoverImages[2]}')` }} 
          />
        </>
      ) : cat.hoverImage ? (
        <>
          <div 
            className="column-bg transition-opacity duration-500 opacity-100 group-hover:opacity-0" 
            style={{ backgroundImage: `url('${cat.image}')` }} 
          />
          <div 
            className="column-bg transition-opacity duration-500 opacity-0 group-hover:opacity-100" 
            style={{ backgroundImage: `url('${cat.hoverImage}')` }} 
          />
        </>
      ) : (
        <div className="column-bg" style={{ backgroundImage: `url('${cat.image}')` }} />
      )}
      <div className="column-overlay" />
      
      <div className={`relative z-10 flex flex-col justify-center w-full h-full overflow-hidden ${
        cat.id === 'producer' ? 'items-end' : 
        cat.id === 'designer' ? 'items-start' : 
        'items-center'
      }`}>
        <h1 className={`text-[max(1.2rem,min(3vw,2.5rem))] font-heading font-extrabold tracking-[0.2em] transition-all duration-700 group-hover:text-white group-hover:-translate-y-4 group-hover:scale-105 drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] leading-tight px-6 whitespace-nowrap ${
          cat.id === 'producer' ? 'text-[#2EBD8E]' :
          cat.id === 'designer' ? 'text-[#E63946]' :
          'text-[#0EA5E9]'
        } ${
          cat.id === 'producer' ? 'text-right origin-right' : 
          cat.id === 'designer' ? 'text-left origin-left' : 
          'text-center origin-center'
        }`}>
          {cat.id === 'editor' ? (
            <div className="flex flex-col items-center justify-center gap-y-1">
              <span className="flex-shrink-0">VIDEO</span>
              <span className="block flex-shrink-0">EDITOR</span>
            </div>
          ) : cat.id === 'designer' ? (
            <div className="flex flex-col items-start justify-center gap-y-1">
              <span className="flex-shrink-0">MOTION</span>
              <span className="block flex-shrink-0">DESIGNER</span>
            </div>
          ) : (
            cat.title
          )}
        </h1>
      </div>
    </Link>
  );
};

const Home: React.FC = () => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="portfolio-container h-screen w-full"
    >
      {CATEGORIES.map((cat) => (
        <CategoryColumn key={cat.id} cat={cat} />
      ))}
    </motion.main>
  );
};

export default Home;
