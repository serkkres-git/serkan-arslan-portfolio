/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Producer from './pages/Producer';
import VideoEditor from './pages/VideoEditor';
import MotionDesigner from './pages/MotionDesigner';
import About from './pages/About';
import Contact from './pages/Contact';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/motion-designer" element={<MotionDesigner />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#111] overflow-x-hidden selection:bg-[#8075ff] selection:text-white">
        <Header />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
