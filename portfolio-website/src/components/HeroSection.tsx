// components/HeroSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaCode, FaLaptop, FaGithub, FaLinkedin } from 'react-icons/fa';
import { GiRetroController, GiArtificialIntelligence } from 'react-icons/gi';
import Image from 'next/image';

// Left Floating Tech Element
const LeftFloatingElement = () => {
  return (
    <motion.div
      className="absolute left-[10%] top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-10"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.1, 1],
        y: ["-45%", "-55%", "-45%"]
      }}
      transition={{
        opacity: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: [0, -360] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <GiArtificialIntelligence className="w-full h-full text-purple-500/80" />
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl" />
      </motion.div>
    </motion.div>
  );
};

// Single Game Element Component (Right Side)
const FloatingGameElement = () => {
  return (
    <motion.div
      className="absolute right-[15%] top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-10"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.1, 1],
        y: ["-50%", "-55%", "-50%"]
      }}
      transition={{
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <GiRetroController className="w-full h-full text-purple-500/80" />
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl" />
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = 'System.out.println("Hello, world!");';
  const typingSpeed = 50;
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const characters = [
    { role: "Game Developer", icon: <FaGamepad className="w-6 h-6" /> },
    { role: "Web Developer", icon: <FaCode className="w-6 h-6" /> },
    { role: "Tech Enthusiast", icon: <FaLaptop className="w-6 h-6" /> }
  ];

  useEffect(() => {
    const startSequence = async () => {
      await controls.start({ opacity: 1 });
      // Start typing animation
      const characters = fullText.split('');
      let currentText = '';

      const typingInterval = setInterval(() => {
        if (currentText.length < fullText.length) {
          currentText += characters[currentText.length];
          setTypedText(currentText);
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    };

    startSequence();

    const interval = setInterval(() => {
      setSelectedCharacter((prev) => (prev + 1) % characters.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen relative flex flex-col justify-center px-6 sm:px-8 py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-purple-600/5" />
        
        {/* Floating Tech Element */}
        <LeftFloatingElement />
        <FloatingGameElement />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left side - Main content */}
          <motion.div
            className="space-y-6 text-center md:text-left px-4 md:px-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div className="mb-2">
              <span className="text-purple-400 font-mono text-sm md:text-base inline-block">
                {typedText}
                <motion.span
                  className="inline-block w-[2px] h-[14px] bg-purple-400 ml-[2px]"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent"
            >
              Anjali Jayakumar
            </motion.h1>

            {/* Role switcher */}
            <motion.div className="relative h-16 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCharacter}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center md:justify-start gap-3 text-xl text-purple-300"
                >
                  {characters[selectedCharacter].icon}
                  <span>{characters[selectedCharacter].role}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <motion.a
                    href="#projects"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 
                             text-white font-semibold hover:from-purple-500 hover:to-fuchsia-500
                             shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
                             transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    href="https://drive.google.com/file/d/1X-IGSdXYlviSUs2u3vq2o0ANiXefuVPW/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
                             text-white font-semibold hover:from-blue-500 hover:to-purple-500
                             shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
                             transition-all duration-300
                             flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View CV
                  </motion.a>
                </div>

                {/* Social Links */}
                <motion.div className="flex gap-4 justify-center md:justify-start">
                  <SocialButton icon={<FaGithub />} href="https://github.com/cloudQuest7" />
                  <SocialButton icon={<FaLinkedin />} href="www.linkedin.com/in/anjali-jayakumar-145902320" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Pixel Art Profile Card */}
          <motion.div
            className="relative max-w-md mx-auto w-full"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Card Background with pixel art style border */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-purple-800/40
                            backdrop-blur-sm border-4 border-purple-500/30 rounded-2xl
                            shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                {/* Pixel corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-purple-400/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-purple-400/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-purple-400/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-purple-400/60" />
              </div>

              {/* Profile Image Container */}
              <div className="relative aspect-square p-6">
                <div className="relative w-full h-full rounded-xl overflow-hidden 
                              border-2 border-purple-500/30 bg-purple-950/30">
                  <Image
                    src="/images/aki.jpg"
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Scanline effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/5 to-transparent
                            pointer-events-none"
                  animate={{
                    y: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialButton = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-400
             hover:text-purple-300 hover:border-purple-500/60 transition-all duration-300
             hover:shadow-[0_0_1rem_0_rgba(168,85,247,0.3)]"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

export default HeroSection;