// Performance configuration for the portfolio website
export const performanceConfig = {
  // Image optimization
  images: {
    quality: 75, // Good balance between quality and size
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive image sizes
    placeholder: 'blur', // Use blur placeholder while loading
  },
  
  // Animation settings
  animation: {
    // Default animation settings for smooth transitions
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
    // Scroll animation settings
    scroll: {
      threshold: 0.1, // Trigger animation when 10% of element is visible
      once: true, // Only animate once
      rootMargin: "-50px", // Start animation slightly before element is in view
    }
  },

  // Intersection observer options for lazy loading
  intersectionObserver: {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  },

  // Scroll behavior settings
  scroll: {
    smooth: true,
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    duration: 800, // Duration for smooth scroll in milliseconds
  }
}
