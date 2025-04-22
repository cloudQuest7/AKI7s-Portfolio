'use client';

import { motion } from 'framer-motion';

const Divider = () => {
  return (
    <div className="w-full h-24 relative overflow-hidden">
      {/* Glowing line */}
      <motion.div 
        className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          backgroundSize: ['100% 1px', '200% 1px', '100% 1px']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/50"
            initial={{ 
              x: -10,
              y: Math.random() * 100 - 50,
              scale: 0
            }}
            animate={{ 
              x: '105%',
              y: Math.random() * 100 - 50,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      {/* Center star */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.7, 0.3],
          rotate: 360
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-[2px]" />
      </motion.div>
    </div>
  );
};

export default Divider;