import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const services = [
    { name: 'Producer', path: '/producer' },
    { name: 'Video Editor', path: '/video-editor' },
    { name: 'Motion Designer', path: '/motion-designer' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-[200px] z-40 pointer-events-none backdrop-blur-xl bg-[#111]/90"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)'
        }}
      />
      <header className="fixed top-0 left-0 w-full z-[100001] p-8 flex justify-between items-center pointer-events-none">
        <Link to="/" className="text-white font-heading font-black tracking-tighter text-2xl hover:text-[#8075ff] transition-colors pointer-events-auto mix-blend-difference">
          SERKAN ARSLAN
        </Link>

        <nav className="flex gap-8 items-center text-white font-heading text-xs tracking-[0.2em] uppercase pointer-events-auto">
          {!isHome && (
            <div 
              className="relative group pr-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 hover:text-[#8075ff] transition-colors cursor-pointer py-2 mix-blend-difference">
                I WANT... <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-[#111] border border-[#8075ff] rounded-none overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-6 py-4 hover:bg-[#8075ff] hover:text-white transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link to="/about" className="hover:text-[#8075ff] transition-colors mix-blend-difference">ABOUT</Link>
          <Link to="/contact" className="hover:text-[#8075ff] transition-colors mix-blend-difference">CONTACT</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
