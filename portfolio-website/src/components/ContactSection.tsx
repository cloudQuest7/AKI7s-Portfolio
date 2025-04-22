'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaItchIo, FaEnvelope, FaDiscord } from 'react-icons/fa';

interface ContactLink {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const contactLinks: ContactLink[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/yourusername',
    color: 'group-hover:text-[#6e40c9]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://linkedin.com/in/yourusername',
    color: 'group-hover:text-[#0a66c2]'
  },
  {
    name: 'Itch.io',
    icon: FaItchIo,
    href: 'https://yourusername.itch.io',
    color: 'group-hover:text-[#fa5c5c]'
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    href: 'mailto:your.email@example.com',
    color: 'group-hover:text-[#22d3ee]'
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    href: 'https://discord.gg/yourusername',
    color: 'group-hover:text-[#5865f2]'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    href: 'https://twitter.com/yourusername',
    color: 'group-hover:text-[#1da1f2]'
  }
];

const ContactSection = () => {
  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {contactLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-6 rounded-lg ${link.color} transition-transform hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {React.createElement(link.icon, { className: "w-12 h-12 mb-4" })}
              <span className="text-lg font-medium">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;