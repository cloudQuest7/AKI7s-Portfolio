'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  SiSharp, SiUnity, SiGamemaker, 
  SiJavascript, SiPython, SiCplusplus,
  SiReact, SiNextdotjs, SiHtml5, 
  SiCss3, SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiPostgresql,
  SiGit, SiFirebase
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

interface Skill {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

const skills: Skill[] = [
  // Programming & Game Development
  { name: 'C#', icon: SiSharp, category: 'Languages', level: 'Expert' },
  { name: 'Unity', icon: SiUnity, category: 'Game Dev', level: 'Expert' },
  { name: 'GameMaker', icon: SiGamemaker, category: 'Game Dev', level: 'Advanced' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Languages', level: 'Expert' },
  { name: 'Python', icon: SiPython, category: 'Languages', level: 'Advanced' },
  { name: 'C++', icon: SiCplusplus, category: 'Languages', level: 'Intermediate' },
  
  // Web Development
  { name: 'React', icon: SiReact, category: 'Frontend', level: 'Expert' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend', level: 'Advanced' },
  { name: 'HTML5', icon: SiHtml5, category: 'Frontend', level: 'Expert' },
  { name: 'CSS3', icon: SiCss3, category: 'Frontend', level: 'Expert' },
  { name: 'Tailwind', icon: SiTailwindcss, category: 'Frontend', level: 'Advanced' },
  
  // Backend & Database
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', level: 'Advanced' },
  { name: 'Express', icon: SiExpress, category: 'Backend', level: 'Advanced' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Backend', level: 'Intermediate' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Backend', level: 'Intermediate' },
  
  // Tools
  { name: 'Git', icon: SiGit, category: 'Tools', level: 'Expert' },
  { name: 'VS Code', icon: VscCode, category: 'Tools', level: 'Expert' },
  { name: 'Firebase', icon: SiFirebase, category: 'Tools', level: 'Advanced' },
];

const SkillCard = ({ category, skills }: { category: string; skills: Skill[] }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const perspective = 1000;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const rotateXValue = ((mouseY - centerY) / rect.height) * 10;
    const rotateYValue = ((mouseX - centerX) / rect.width) * 10;

    rotateX.set(-rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="relative p-6 rounded-xl bg-[#161b22]/80 border border-[#30363d] overflow-hidden transition-all duration-300
                 backdrop-blur-lg hover:border-[#1f6feb]/40 group"
      style={{
        perspective,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-blue-500/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Prismatic edge effect */}
      <div className="absolute inset-[-1px] bg-gradient-to-r from-[#1f6feb]/0 via-[#1f6feb]/20 to-[#6e40c9]/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-6 text-gray-100 flex items-center gap-3">
          <span className="relative">
            {category}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#1f6feb] to-[#6e40c9]"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <motion.div
                className={`flex items-center gap-2 p-2 rounded-lg 
                         bg-[#21262d]/80 border border-[#30363d] transition-all duration-300
                         hover:border-[#1f6feb]/40 hover:bg-[#1f6feb]/10 relative group/skill`}
                whileHover={{ scale: 1.05, z: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Skill icon with 3D transform and glow */}
                <motion.div
                  className="relative"
                  animate={{
                    rotateY: hoveredSkill === skill.name ? [0, 360] : 0,
                    z: hoveredSkill === skill.name ? 20 : 0
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <skill.icon className={`w-5 h-5 transition-all duration-300
                    ${hoveredSkill === skill.name ? 'text-[#1f6feb]' : 'text-gray-400'}`} />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 blur-xl bg-[#1f6feb]"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredSkill === skill.name ? [0, 0.4, 0] : 0
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <span className="text-sm text-gray-200 font-medium">{skill.name}</span>

                {/* Skill level indicators */}
                <div className="ml-auto flex gap-1">
                  {[...Array(skill.level === 'Expert' ? 3 : skill.level === 'Advanced' ? 2 : 1)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#1f6feb]"
                      initial={{ opacity: 0.4 }}
                      animate={hoveredSkill === skill.name ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4]
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: hoveredSkill === skill.name ? Infinity : 0,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive particles */}
      <AnimatePresence>
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#1f6feb]/30 blur-sm"
            initial={{ 
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: [0, 1, 0]
            }}
            exit={{ scale: 0 }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const MovingBanner = () => {
  return (
    <div className="w-full overflow-hidden backdrop-blur-sm py-8 mt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-gradient-xy opacity-30" />
      
      <div className="relative">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <motion.div
              key={index}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md
                ${skill.level === 'Expert'
                  ? 'bg-gradient-to-r from-[#1f6feb]/20 via-[#6e40c9]/20 to-[#1f6feb]/20 text-white border border-white/10'
                  : skill.level === 'Advanced'
                  ? 'bg-gradient-to-r from-[#1f6feb]/10 via-[#6e40c9]/10 to-[#1f6feb]/10 text-gray-200 border border-white/5'
                  : 'bg-white/5 text-gray-300 border border-white/5'
                }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(31, 111, 235, 0.3)"
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <skill.icon className="w-4 h-4" />
              </motion.div>
              <span className="relative z-10">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function SkillsSection() {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section 
      id="skills" 
      className="py-20 px-4 relative overflow-hidden min-h-screen"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#1f6feb] via-[#6e40c9] to-[#1f6feb] bg-clip-text text-transparent">
              Technical Universe
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exploring different galaxies of technology with an ever-expanding skillset
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <SkillCard
              key={category}
              category={category}
              skills={skills.filter(skill => skill.category === category)}
            />
          ))}
        </div>

        <MovingBanner />
      </div>

      {/* Cosmic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1f6feb]/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,111,235,0.1),transparent_50%)]" />
      </div>
    </section>
  );
}