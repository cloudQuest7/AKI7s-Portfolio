// app/page.tsx
'use client';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import EventsSection from '@/components/EventsSection';
import Divider from '@/components/Divider';

export default function HomePage() {
  return (
    <div className="bg-[#0d1117]">
      {/* Hero Section */}
      <HeroSection />
      
      <Divider />
      
      {/* About Section */}
      <AboutSection />
      
      <Divider />
      
      {/* Skills Section */}
      <SkillsSection />
      
      <Divider />

      {/* Projects Section */}
      <ProjectsSection />
      
      <Divider />

      {/* Events Section */}
      <EventsSection />
      
      <Divider />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}