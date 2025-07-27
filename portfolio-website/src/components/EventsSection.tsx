import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState} from 'react';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';

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
const InfiniteSlider = ({ direction = 1, speed = 20 }: { direction?: number; speed?: number }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const {isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  // const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animate = (currentTime: number) => {
      if (!previousTimeRef.current) {
        previousTimeRef.current = currentTime;
      }
      
      const deltaTime = Math.min(currentTime - previousTimeRef.current, 50);
      previousTimeRef.current = currentTime;

      if (!isPaused && isIntersecting) {
        const pixelsPerSecond = speed * 0.5;
        const frameSpeed = (pixelsPerSecond * deltaTime) / 16.667;
        
        // Use transform instead of marginLeft for better performance
        positionRef.current += direction * frameSpeed;

        if (direction > 0 && positionRef.current >= slider.scrollWidth / 2) {
          positionRef.current = 0;
        } else if (direction < 0 && positionRef.current <= 0) {
          positionRef.current = slider.scrollWidth / 2;
        }

        slider.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [direction, speed, isPaused, isIntersecting]);

  return (
    <div 
      className="overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={sliderRef}
        className="flex gap-4 py-4 whitespace-nowrap transform w-fit will-change-transform slider-container"
      >
        {/* Double the events for seamless loop */}
        {[...events, ...events].map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className="relative w-72 h-48 rounded-xl overflow-hidden group eventCard"
          >
            <Image
              src={event.image}
              alt={event.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={index < 6} // Prioritize loading first 6 images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          {/* First row - moves right */}
          <InfiniteSlider direction={1} speed={5} />
          {/* Second row - moves left */}
          <InfiniteSlider direction={-1} speed={5} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;