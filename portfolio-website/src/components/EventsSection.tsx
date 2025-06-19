import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import styles from './EventsSection.module.css';

// Event interface
interface Event {
  id: number;
  image: string;
  alt: string;
}

const events: Event[] = [
    { id: 1, image: '/events/event1.jpg', alt: 'Event 1' },
    { id: 2, image: '/events/event2.jpg', alt: 'Event 2' },
    { id: 3, image: '/events/event3.jpg', alt: 'Event 3' },
    { id: 4, image: '/events/event4.jpg', alt: 'Event 4' },
    { id: 5, image: '/events/event5.jpg', alt: 'Event 5' },
    { id: 6, image: '/events/event6.jpg', alt: 'Event 6' },
    { id: 7, image: '/events/event7.jpg', alt: 'Event 7' },
    { id: 8, image: '/events/event8.jpg', alt: 'Event 8' },
    { id: 9, image: '/events/event9.jpg', alt: 'Event 9' },
    { id: 10, image: '/events/event10.jpg', alt: 'Event 10' },
    { id: 11, image: '/events/event11.jpg', alt: 'Event 11' },
];

// Slider component for each row
const InfiniteSlider = ({ direction = 1, speed =60  }: { direction?: number; speed?: number }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const [sliderWidth, setSliderWidth] = useState(0);
  const transitionRef = useRef<number>(1);

  // Update slider width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.scrollWidth / 2);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !sliderWidth) return;

    const animate = (currentTime: number) => {
      if (!previousTimeRef.current) {
        previousTimeRef.current = currentTime;
      }
      
      const deltaTime = Math.min(currentTime - previousTimeRef.current, 50);
      previousTimeRef.current = currentTime;      if (!isPaused) {
        // Smoother speed calculation
        const pixelsPerSecond = speed * 0.4; // Slightly slower speed for better clarity
        const frameSpeed = (pixelsPerSecond * deltaTime) / 16.667;
        
        // Smooth transition when pausing/resuming
        transitionRef.current = Math.min(1, transitionRef.current + 0.015);
        const easedSpeed = frameSpeed * transitionRef.current;
        
        positionRef.current = (positionRef.current + direction * easedSpeed) % sliderWidth;
        
        // Handle negative positions
        if (positionRef.current < 0) {
          positionRef.current = sliderWidth + positionRef.current;
        }

        // Use transform3d without blur effect
        slider.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
      } else {
        // Smooth transition when pausing
        transitionRef.current = Math.max(0, transitionRef.current - 0.015);
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [direction, speed, isPaused, sliderWidth]);

  return (    <div 
      className="overflow-hidden relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edge gradients for smooth transition effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d1117] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d1117] to-transparent z-10" />
        <div
        ref={sliderRef}
        className={`flex gap-6 py-4 whitespace-nowrap transform w-fit will-change-transform transition-[filter] duration-300 ${styles.sliderContainer}`}
      >
        {/* Double the events for seamless loop */}
        {[...events, ...events].map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className="relative w-72 h-48 rounded-xl overflow-hidden group/card shadow-lg shadow-purple-500/5 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-[1] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
            <Image
              src={event.image}
              alt={event.alt}
              fill
              className="object-cover transition-all duration-500 group-hover/card:scale-110 group-hover/card:brightness-110"
              priority={index < 6} // Prioritize loading first 6 images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const EventsSection = () => {
  return (
    <section id="events" className="py-20 relative">
      {/* Background grid pattern */}
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
              Event Gallery
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of conferences, seminars, and workshops I&apos;ve attended
          </p>
        </motion.div>

        {/* Event Sliders */}
        <div className="space-y-8">
          {/* First row - moves right */}          <InfiniteSlider direction={1} speed={2} />
          {/* Second row - moves left */}
          <InfiniteSlider direction={-1} speed={2} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;