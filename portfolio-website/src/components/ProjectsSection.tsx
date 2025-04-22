'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaCode, FaGithub, FaExternalLinkAlt, FaTimes, FaTools } from 'react-icons/fa';
import Image from 'next/image';

// Project type definition
interface Project {
  id: number;
  title: string;
  description: string;
  category: 'game' | 'web';
  image: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
  };
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  outcome?: string;
}

// Sample projects data - replace with your own
const projects: Project[] = [
  {
    id: 1,
    title: "Dodge It!",
    description: "A 2D platformer game where 'Guppy the Fish' is ready to dodge all the Bad Fishes out there.",
    longDescription: "A 2D platformer game where 'Guppy the Fish' is ready to dodge all the Bad Fishes out there. The game features a dynamic gravity manipulation system, allowing players to navigate through procedurally generated levels filled with obstacles and enemies. Players can collect power-ups and unlock new abilities as they progress through the game.",
    features: [
      "Dynamic gravity manipulation system",
      "Procedural level generation using custom algorithms",
      "Real-time particle effects and ambient lighting",
      "Original soundtrack that adapts to gameplay"
    ],
    challenges: [
      "Implementing precise physics calculations for gravity effects",
      "Optimizing procedural generation for smooth gameplay",
      "Creating seamless level transitions"
    ],
    outcome: "",
    category: "game",
    image: "/images/game1.jpg",
    technologies: ["Unity", "C#"],
    links: {
      github: "https://github.com/yourusername/cosmic-adventure",
      live: "https://itch.io/yourusername/cosmic-adventure"
    }
  },
  {
    id: 2,
    title: "Steve Jumps",
    description: "A 3D action-adventure game where Steve Dodges each Obstacle.",
    category: "game",
    image: "/images/game2.jpg",
    technologies: ["Unity", "C#"],
    links: {
      github: "https://github.com/yourusername/dragons-quest",
      live: "https://itch.io/yourusername/dragons-quest"
    }
  },
  {
    id: 3,
    title: "Smash the Animals",
    description: "A 3D game where you smash and dodge the animals with a pizza to win.",
    
    category: "game",
    image: "/images/game3.jpg",
    technologies: ["Unity", "C#"],
    links: {
      github: "https://github.com/yourusername/space-shooter-vr",
      live: "https://itch.io/yourusername/space-shooter-vr"
    }
  },
{
    id: 9,
    title: "Trunker - car dash",
    description: "A thrilling puzzle game where players must strategically move blocks to clear the path.",
    longDescription: "Trunker is a challenging puzzle game that tests your strategic thinking and problem-solving skills. Players must move blocks of various shapes and sizes to clear a path and achieve the goal. The game features multiple levels with increasing difficulty, vibrant graphics, and an engaging soundtrack.",
    
    outcome: "Trunker received positive feedback for its challenging gameplay and intuitive controls, making it a favorite among puzzle enthusiasts.",
    category: "game",
    image: "/images/game4.jpg",
    technologies: ["Unity", "C#"],
    links: {
        github: "https://github.com/yourusername/trunker",
        live: "https://itch.io/yourusername/trunker"
    }
},
  {
    id: 4,
    title: "Fitra - Fitness Web App",
    description: "Full-stack Fitness App to track workouts and nutrition with user authentication",
    category: "web",
    image: "/images/web1.jpg",
    technologies: ["Express | Node", "Javascript", "MongoDB"],
    links: {
      github: "https://github.com/cloudQuest7/Fitness",
      live: "https://ecommerce-platform.vercel.app"
    }
  },
  {
    id: 5,
    title: "Web Dev Project Repo",
    description: "I've made several webpages and components using HTML, CSS and JS to practice. ",
    category: "web",
    image: "/images/web2.jpg",
    technologies: ["html", "css", "Javascript"],
    links: {
      github: "https://github.com/cloudQuest7/Web-Dev-Projects",
      live: "https://web-dev-projects.vercel.app"
    }
  },
  {
    id: 6,
    title: "Digital Diary",
    description: "A didgital diary app to keep track of your daily activities and notes",
    category: "web",
    image: "/images/web3.jpg",
    technologies: ["Python", "Custom Tkinter", "MySql"],
    links: {
      github: "https://github.com/yourusername/task-manager",
      live: "https://task-manager.vercel.app"
    }
  },
  {
    id: 7,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my projects and skills",
    category: "web",
    image: "/images/web4.jpg",
    technologies: ["React", "Next.js", "Typescript", "Tailwind CSS", "Framer Motion"],
    links: {
      github: "https://github.com/yourusername/weather-app",
      live: "https://weather-app.vercel.app"
    }
  },

  {
    id: 8,
    title: "WeShareIt - Food-Share-Web App",
    description: "A Web app to share food with people in need. Users can post food items and request food.",
    category: "web",
    image: "/images/web5.jpg",
    technologies: ["Godot", "GDScript", "Aseprite"],
    links: {
      github: "https://github.com/yourusername/pixel-dungeon",
      live: "https://itch.io/yourusername/pixel-dungeon"
    }
  },
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'game' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const categories = [
    { id: 'all', label: 'All Projects', icon: null },
    { id: 'game', label: 'Game Dev', icon: <FaGamepad /> },
    { id: 'web', label: 'Web Dev', icon: <FaCode /> }
  ] as const;

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' ? true : project.category === activeCategory
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  const createSparkle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSparkle = {
      id: Date.now(),
      x,
      y,
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
    }, 1000);
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Elements - blending blue and purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-indigo-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_50%)]" />
      
      {/* Grid Animation Background - blending colors */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of game development and web projects
          </p>
        </motion.div>

        {/* Category Filters - updated with glow effect */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map(({ id, label, icon }) => (
            <motion.button
              key={id}
              onClick={(e) => {
                setActiveCategory(id);
                createSparkle(e);
              }}
              onMouseMove={createSparkle}
              className={`relative px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 overflow-hidden
                        glow-border
                        ${activeCategory === id 
                          ? 'bg-[#1a1a1a] text-white shadow-lg' 
                          : 'bg-[#1a1a1a]/50 text-gray-300 hover:bg-[#1a1a1a]'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sparkles.map(sparkle => (
                <div
                  key={sparkle.id}
                  className="sparkle"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              {icon && <span className="text-lg relative z-10">{icon}</span>}
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProjectClick(project)}
                className="group relative bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40
                          border border-purple-500/20 rounded-xl overflow-hidden
                          hover:border-purple-400/40 transition-all duration-300
                          cursor-pointer transform hover:scale-[1.02]
                          before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-purple-500/20 before:via-fuchsia-500/20 before:to-blue-500/20 before:blur-xl before:opacity-0 before:transition-opacity before:duration-500
                          hover:before:opacity-100
                          after:absolute after:inset-0 after:-z-10 after:bg-gradient-to-r after:from-purple-500/10 after:via-fuchsia-500/10 after:to-blue-500/10 after:blur-2xl after:opacity-0 after:transition-opacity after:duration-700
                          hover:after:opacity-100"
              >
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 
                               transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10
                                 text-blue-300 border border-purple-500/20 group-hover:border-purple-400/40
                                 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative p-2 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30 
                                 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300
                                 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative p-2 rounded-lg bg-gradient-to-r from-purple-900/30 to-indigo-900/30
                                 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300
                                 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal - blended colors */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              onClick={closeModal}
            >
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="relative bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90 rounded-xl 
                          border border-purple-500/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto
                          backdrop-blur-lg"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white
                            p-2 rounded-full bg-blue-900/50 hover:bg-blue-800/50
                            transition-colors duration-300"
                  whileHover={{ rotate: 90 }}
                  onClick={closeModal}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 
                                 bg-clip-text text-transparent">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 mt-2">
                      <FaTools className="w-4 h-4" />
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={index} className="text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Details - adjusted colors */}
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    {selectedProject.features && (
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-2 text-gray-300"
                              >
                                <span className="text-blue-400">•</span>
                                {feature}
                              </motion.div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.challenges && (
                      <div>
                        <h4 className="text-lg font-semibold text-indigo-400 mb-2">Challenges & Solutions</h4>
                        <ul className="space-y-2">
                          {selectedProject.challenges.map((challenge, index) => (
                            <li key={index}>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: index * 0.1 + ((selectedProject.features?.length || 0) * 0.1) 
                                }}
                                className="flex items-start gap-2 text-gray-300"
                              >
                                <span className="text-indigo-400">•</span>
                                {challenge}
                              </motion.div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.outcome && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Outcome</h4>
                        <p className="text-gray-300">{selectedProject.outcome}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Modal Links - blended colors */}
                  <div className="flex gap-4 pt-4 border-t border-purple-500/20">
                    {selectedProject.links.github && (
                      <motion.a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30
                                 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 
                                 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaGithub className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-300">View Code</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                      blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    )}
                    {selectedProject.links.live && (
                      <motion.a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-purple-900/30 to-indigo-900/30
                                 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 
                                 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaExternalLinkAlt className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">Live Demo</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 
                                      blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;