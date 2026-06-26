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

  const getHoverColor = (path?: string) => {
    const currentPath = path || location.pathname;
    if (currentPath === '/producer') return 'hover:text-[#2EBD8E]';
    if (currentPath === '/motion-designer') return 'hover:text-[#E63946]';
    if (currentPath === '/video-editor') return 'hover:text-[#0EA5E9]';
    return 'hover:text-[#0EA5E9]'; // Default
  };

  const getBgColor = (path: string) => {
    if (path === '/producer') return 'hover:bg-[#2EBD8E]';
    if (path === '/motion-designer') return 'hover:bg-[#E63946]';
    if (path === '/video-editor') return 'hover:bg-[#0EA5E9]';
    return 'hover:bg-[#0EA5E9]';
  };

  const getTextColor = (path: string) => {
    if (path === '/producer') return 'text-[#2EBD8E]';
    if (path === '/motion-designer') return 'text-[#E63946]';
    if (path === '/video-editor') return 'text-[#0EA5E9]';
    return 'text-[#0EA5E9]';
  };

  const getHoverTextColor = (path: string) => {
    if (path === '/producer') return 'hover:text-black';
    return 'hover:text-white';
  };

  const getBorderColor = () => {
    if (location.pathname === '/producer') return 'border-[#2EBD8E]';
    if (location.pathname === '/motion-designer') return 'border-[#E63946]';
    if (location.pathname === '/video-editor') return 'border-[#0EA5E9]';
    return 'border-[#0EA5E9]';
  };

  const activeHoverClass = getHoverColor();

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
        <Link to="/" className={`text-white font-heading font-black tracking-tighter text-2xl ${activeHoverClass} transition-colors pointer-events-auto mix-blend-difference`}>
          SERKAN ARSLAN
        </Link>

        <nav className="flex gap-8 items-center text-white font-heading text-xs tracking-[0.2em] uppercase pointer-events-auto">
          {!isHome && (
            <div 
              className="relative group pr-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className={`flex items-center gap-2 ${activeHoverClass} transition-colors cursor-pointer py-2 mix-blend-difference`}>
                I WANT... <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full right-0 mt-2 w-48 bg-[#111] border ${getBorderColor()} rounded-none overflow-hidden`}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className={`block px-6 py-4 ${getTextColor(service.path)} ${getBgColor(service.path)} ${getHoverTextColor(service.path)} transition-colors`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link to="/about" className={`${activeHoverClass} transition-colors mix-blend-difference`}>ABOUT</Link>
          <Link to="/contact" className={`${activeHoverClass} transition-colors mix-blend-difference`}>CONTACT</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
