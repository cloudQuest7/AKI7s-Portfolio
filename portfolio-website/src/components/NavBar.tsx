// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    ['About', '/#about'],
    ['Skills', '/#skills'],
    ['Projects', '/#projects'],
    ['Events', '/#events'],
    ['Contact', '/#contact'],
  ];

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
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
              AKI7
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(([title, url]) => (
              <Link 
                key={title}
                href={url}
                className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white rounded-md group"
              >
                <span className="relative z-10">{title}</span>
                <div className="absolute inset-0 bg-[#2D1141] opacity-0 group-hover:opacity-100 rounded-md transition-all duration-200" />
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-fuchsia-500/10" />
                  <div className="absolute inset-0 rounded-md blur-sm bg-gradient-to-r from-purple-400/5 to-fuchsia-500/5" />
                </div>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
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
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-400/40 via-fuchsia-500/30 to-purple-400/40"
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
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-fuchsia-500/20 to-purple-400/30" />
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-400/20 via-fuchsia-500/10 to-purple-400/20" />
              </div>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden group relative p-2 rounded-lg border border-[#6E40C9]/30 bg-[#2D1141]/20 z-50"
            aria-label="Toggle mobile menu"
            title="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <div className="space-y-2">
              <span className={`block w-6 h-0.5 bg-[#B392F0] group-hover:bg-white transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#B392F0] group-hover:bg-white transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#B392F0] group-hover:bg-white transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-lg blur-sm bg-[#6E40C9]/10" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mobile-menu-container fixed top-16 left-0 right-0 z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#13001A]/95 backdrop-blur-xl border-b border-[#6E40C9]/20">
              {navLinks.map(([title, url]) => (
                <Link
                  key={title}
                  href={url}
                  onClick={closeMenu}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white rounded-md hover:bg-[#2D1141] transition-all duration-200"
                >
                  {title}
                </Link>
              ))}
              <motion.a
                href="https://github.com/cloudQuest7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-[#B392F0] hover:text-white rounded-md hover:bg-[#2D1141] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGithub className="w-5 h-5" />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;