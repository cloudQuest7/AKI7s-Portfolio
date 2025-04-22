'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
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
    href: 'https://github.com/cloudQuest7',
    color: 'group-hover:text-[#6e40c9]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'www.linkedin.com/in/anjali-jayakumar-145902320',
    color: 'group-hover:text-[#0a66c2]'
  },
  {
    name: 'Itch.io',
    icon: FaItchIo,
    href: 'https://AKI7.itch.io',
    color: 'group-hover:text-[#fa5c5c]'
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    href: 'anjalijayakumar79@gmail.com',
    color: 'group-hover:text-[#22d3ee]'
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    href: 'https://discord.gg/BTjVxWhpr9',
    color: 'group-hover:text-[#5865f2]'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    href: 'https://x.com/anjali_j79?t=o6nFrvqbfHb6NqoB84wdDA&s=08',
    color: 'group-hover:text-[#1da1f2]'
  }
];

const RetroContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: '> Message sent successfully! $ _'
      });
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: `> Error: ${error instanceof Error ? error.message : 'Failed to send message'} $ _`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 relative max-w-2xl mx-auto"
    >
      <div className="relative bg-[#0d1117] border border-[#1f6feb] rounded-lg p-1 overflow-hidden">
        <div className="absolute inset-0 border-2 border-[#1f6feb] rounded-lg opacity-50 animate-pulse" />
        <div className="absolute inset-[-2px] border-2 border-[#1f6feb] rounded-lg blur-[2px]" />
        <div className="absolute inset-[-4px] border-2 border-[#1f6feb] rounded-lg blur-[4px] opacity-30" />
        <div className="absolute inset-[-6px] border-2 border-[#1f6feb] rounded-lg blur-[8px] opacity-20" />
        
        <div className="bg-[#161b22] rounded-t-lg p-2 flex items-center gap-2 border-b border-[#1f6feb]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-75" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-75" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-75" />
          </div>
          <div className="flex-1 text-center text-sm text-[#1f6feb] font-mono">terminal@contact:~</div>
        </div>

        <div className="p-6 bg-[#0d1117] rounded-b-lg relative">
          <div className="mb-6 font-mono text-[#1f6feb]">
            <span className="text-[#1f6feb]">$</span> Contact.send(message)
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#161b22] border border-[#1f6feb] rounded-lg px-4 py-2 text-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent
                           placeholder-gray-500 font-mono relative z-10"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 bg-[#1f6feb] opacity-10 blur-sm rounded-lg" />
              </motion.div>
            </div>

            <div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#161b22] border border-[#1f6feb] rounded-lg px-4 py-2 text-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent
                           placeholder-gray-500 font-mono relative z-10"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 bg-[#1f6feb] opacity-10 blur-sm rounded-lg" />
              </motion.div>
            </div>

            <div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-[#161b22] border border-[#1f6feb] rounded-lg px-4 py-2 text-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent
                           placeholder-gray-500 font-mono relative z-10"
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 bg-[#1f6feb] opacity-10 blur-sm rounded-lg" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1f6feb] hover:bg-[#388bfd] text-white font-mono py-2 px-4 rounded-lg
                         transition-colors duration-200 relative group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '> Processing...' : '> Send Message'}
                <div className="absolute inset-0 bg-[#1f6feb] opacity-20 group-hover:opacity-30 blur-sm rounded-lg" />
              </button>
            </motion.div>
          </form>

          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 font-mono ${
                status.type === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 bg-[#0d1117]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f6feb]/5 via-transparent to-[#6e40c9]/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1f6feb10_0%,_transparent_50%)]" />
        
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[#1f6feb]/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1f6feb] to-[#6e40c9]">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate on amazing projects? Choose your preferred platform or send me a message!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <div className="lg:w-2/3">
            <RetroContactForm />
          </div>

          <div className="lg:w-1/3 space-y-4 mt-4 lg:mt-8">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative p-4 bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden 
                              group-hover:border-[#1f6feb]/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1f6feb]/5 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1f6feb]/0 to-[#1f6feb]/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <link.icon className={`w-6 h-6 text-gray-400 transition-colors duration-300 ${link.color}`} />
                    <span className="text-gray-200 font-medium">{link.name}</span>
                    
                    <motion.span
                      className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.div
              className="hidden lg:block absolute right-0 bottom-0 w-32 h-32"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f6feb]/20 to-transparent blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;