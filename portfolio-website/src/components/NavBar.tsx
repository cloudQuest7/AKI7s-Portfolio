// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-xl bg-[#13001A]/80 border-b border-[#6E40C9]/20 shadow-lg shadow-[#6E40C9]/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="relative group"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-[#8250DF] to-[#6E40C9] bg-clip-text text-transparent">
              Anjali Jayakumar
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#8250DF] to-[#6E40C9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {[
              ['About', '/#about'],
              ['Skills', '/#skills'],
              ['Projects', '/#projects'],
              ['Events', '/#events'],
              ['Contact', '/#contact'],
            ].map(([title, url]) => (
              <Link 
                key={title}
                href={url}
                className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md group"
              >
                <span className="relative z-10">{title}</span>
                <div className="absolute inset-0 bg-[#2D1141] opacity-0 group-hover:opacity-100 rounded-md transition-all duration-200" />
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8250DF]/10 to-[#6E40C9]/10" />
                  <div className="absolute inset-0 rounded-md blur-sm bg-gradient-to-r from-[#8250DF]/5 to-[#6E40C9]/5" />
                </div>
                {/* Restored underline effect */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8250DF] to-[#6E40C9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}

            {/* Enhanced GitHub Button with more vibrant effects */}
            <motion.a
              href="https://github.com/cloudQuest7"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center gap-2 px-4 py-1.5 
                       bg-gradient-to-r from-[#2D1141]/80 to-[#13001A]/80
                       border border-[#6E40C9]/50 rounded-lg text-[#B392F0]
                       transition-all duration-300 
                       hover:border-[#8250DF] hover:text-white
                       hover:shadow-[0_0_2rem_0_rgba(130,80,223,0.5)]
                       overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">GitHub</span>
              
              {/* More vibrant animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#8250DF]/40 via-[#B392F0]/30 to-[#6E40C9]/40"
                animate={{
                  x: ['0%', '100%', '0%'],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Enhanced hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8250DF]/30 via-[#B392F0]/20 to-[#6E40C9]/30" />
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#8250DF]/20 via-[#B392F0]/10 to-[#6E40C9]/20" />
              </div>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden group relative p-2 rounded-lg border border-[#6E40C9]/30 bg-[#2D1141]/20"
            aria-label="Toggle mobile menu"
            title="Toggle mobile menu"
          >
            <div className="space-y-2">
              <span className="block w-6 h-0.5 bg-[#B392F0] group-hover:bg-white transition-colors duration-200" />
              <span className="block w-6 h-0.5 bg-[#B392F0] group-hover:bg-white transition-colors duration-200" />
              <span className="block w-6 h-0.5 bg-[#B392F0] group-hover:bg-white transition-colors duration-200" />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-lg blur-sm bg-[#6E40C9]/10" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;