'use client';

import { motion } from 'framer-motion';
import { FaGamepad, FaCode, FaDiceD20, FaLaptopCode } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#9C6ADE] to-[#B98EFF] bg-clip-text text-transparent">
            Player Profile: Web Developer | Game Dev
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9C6ADE] to-[#B98EFF] mx-auto rounded-full" />
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#2D1141] backdrop-blur-sm border border-[#B98EFF]/20 rounded-lg p-8 mb-12 hover:shadow-[0_0_2rem_0_rgba(185,142,255,0.2)] transition-all duration-300"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsItem
              icon={<FaGamepad className="w-8 h-8" />}
              title="Games Prototyped"
              value="5+"
            />
            <StatsItem
              icon={<FaCode className="w-8 h-8" />}
              title="Backend | Frontend"
              value="7+"
            />
            <StatsItem
              icon={<FaDiceD20 className="w-8 h-8" />}
              title="Hackathons"
              value="8+"
            />
            <StatsItem
              icon={<FaLaptopCode className="w-8 h-8" />}
              title="Dev Level"
              value="Apprentice"
            />
          </div>
        </motion.div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#9C6ADE] to-[#B98EFF] bg-clip-text text-transparent">
              Quest Log: The Journey So Far
            </h3>
            <p className="text-gray-300 leading-relaxed">
            Greetings, fellow adventurer! I'm a Apprentice Game Developer and Web Sorcerer, wielding the mighty powers of the Unity Engine and the enchanted MERN stack.

My journey began in the pixelated realms of Unity, where I forged my skills in C# and brought interactive 2D and 3D worlds to life. Along the way, I delved into the arcane arts of web development, mastering MongoDB, Express.js, React, and Node.js to build dynamic, full-stack applications with seamless user experiences.
            </p>
            <p className="text-gray-300 leading-relaxed">
            From crafting addictive gameplay loops and interactive UIs to conjuring responsive web dashboards and real-time features, I thrive on creating immersive digital realms. My specialties include Programming, Game Dev, intuitive UX and Backend. I’m always ready for the next epic dev quest.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <SkillCard title="Main Class" items={["Game Developer", "Full Stack Dev", "UX"]} />
            <SkillCard title="Skill Tree" items={["Unity", "GameMaker", "C++", "C#"]} />
            <SkillCard title="Side Quests" items={["WebGL", "Website", "VR Development"]} />
            <SkillCard title="Party Skills" items={["Quick Learner", "Agile", "Git Mastery"]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsItem = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="text-center">
    <div className="flex justify-center text-[#B98EFF] mb-2">{icon}</div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{title}</div>
  </div>
);

const SkillCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="bg-[#2D1141] backdrop-blur-sm border border-[#B98EFF]/20 rounded-lg p-4 hover:border-[#B98EFF]/40 transition-all duration-300">
    <h4 className="text-lg font-semibold text-[#B98EFF] mb-2">{title}</h4>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-gray-300 text-sm">
          ⭐ {item}
        </li>
      ))}
    </ul>
  </div>
);

export default AboutSection;