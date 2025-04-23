'use client';

import { motion } from 'framer-motion';

const Divider = () => {
  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
  
  return (
    <div className="w-full h-32 relative overflow-hidden bg-[#0d1117]">
      {/* Digital rain columns */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-full w-4 text-center"
            style={{
              left: `${(i * 3.33)}%`,
              fontSize: '10px',
              writingMode: 'vertical-rl'
            }}
            animate={{
              y: ['0%', '200%']
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          >
            {[...Array(8)].map((_, j) => (
              <motion.div
                key={j}
                animate={{
                  opacity: [0, 1, 0],
                  color: ['#8b5cf6', '#6366f1', '#8b5cf6']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: j * 0.1
                }}
              >
                {characters[Math.floor(Math.random() * characters.length)]}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Central energy bar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent relative"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 blur-sm" />
        </motion.div>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/10 to-transparent"
        animate={{
          y: ['-100%', '200%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-transparent to-[#0d1117]" />
    </div>
  );
};

export default Divider;