/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Producer from './pages/Producer';
import VideoEditor from './pages/VideoEditor';
import MotionDesigner from './pages/MotionDesigner';
import About from './pages/About';
import Contact from './pages/Contact';

const ThemeController = () => {
  const location = useLocation();
  useEffect(() => {
    let accent = '#0EA5E9'; // Sapphire default
    let glow = 'rgba(14,165,233,0.18)';
    
    if (location.pathname === '/producer') {
      accent = '#2EBD8E'; // Emerald
      glow = 'rgba(46,189,142,0.18)';
    } else if (location.pathname === '/motion-designer') {
      accent = '#E63946'; // Cinema Red
      glow = 'rgba(230,57,70,0.18)';
    } else if (location.pathname === '/video-editor') {
      accent = '#0EA5E9'; // Sapphire
      glow = 'rgba(14,165,233,0.18)';
    }
    
    document.documentElement.style.setProperty('--theme-accent', accent);
    document.documentElement.style.setProperty('--theme-glow', glow);
  }, [location.pathname]);
  
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="w-full">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/producer" element={<Producer />} />
          <Route path="/video-editor" element={<VideoEditor />} />
          <Route path="/motion-designer" element={<MotionDesigner />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeController />
      <div className="relative min-h-screen bg-[#111] overflow-x-hidden">
        <Header />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
