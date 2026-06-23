import React from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111] text-white py-24 mb-0 border-t border-white/5 flex flex-col items-center snap-end relative z-10 w-full">
      <div className="flex gap-8 mb-8">
        <a href="#" className="hover:text-[#8075ff] transition-colors" data-hover="true"><Instagram size={28} strokeWidth={1.5} /></a>
        <a href="#" className="hover:text-[#8075ff] transition-colors" data-hover="true"><Twitter size={28} strokeWidth={1.5} /></a>
        <a href="#" className="hover:text-[#8075ff] transition-colors" data-hover="true"><Linkedin size={28} strokeWidth={1.5} /></a>
        <a href="#" className="hover:text-[#8075ff] transition-colors" data-hover="true"><Github size={28} strokeWidth={1.5} /></a>
      </div>
      <p className="text-xs tracking-widest text-gray-500 uppercase font-heading">
        © {new Date().getFullYear()} Serkan Arslan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
