import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import { BookingWidget } from './BookingWidget';

const heroSlides = [
  {
    id: 1,
    image: hero1,
    title: "Find your next",
    titleHighlight: "3-day escape",
    subtitle: "Pick a date. Pack light. We'll handle the rest.",
  },
  {
    id: 2,
    image: hero2,
    title: "Paradise awaits",
    titleHighlight: "your arrival",
    subtitle: "Tropical destinations that feel like a dream.",
  },
  {
    id: 3,
    image: hero3,
    title: "Adventure calls",
    titleHighlight: "answer boldly",
    subtitle: "Discover hidden gems off the beaten path.",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images with Parallax */}
      <AnimatePresence mode="wait">
        {heroSlides.map((slide, index) => (
          currentSlide === index && (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePosition.x * -10,
                y: mousePosition.y * -5,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                opacity: { duration: 1.2 },
                scale: { duration: 1.2 },
                x: { duration: 0.8, ease: "easeOut" },
                y: { duration: 0.8, ease: "easeOut" },
              }}
            >
              <img
                src={slide.image}
                alt={`${slide.title} ${slide.titleHighlight}`}
                className="w-full h-full object-cover"
                style={{ willChange: 'transform' }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-900/80 via-bg-900/40 to-bg-900/20" />
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-glass" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
            {/* Hero Text */}
            <motion.div
              className="text-center lg:text-left order-2 lg:order-1"
              style={{
                x: window.innerWidth > 1024 ? mousePosition.x * -40 : 0,
                y: window.innerWidth > 1024 ? mousePosition.y * -20 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-hero leading-none mb-4 lg:mb-6">
                    <span className="text-white">{heroSlides[currentSlide].title}</span>
                    <br />
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-accent-1 to-accent-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {heroSlides[currentSlide].titleHighlight}
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-lg sm:text-xl text-white/80 mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <motion.button
                      className="btn-hero magnetic glow-hover px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Destinations →
                    </motion.button>
                    
                    <motion.button
                      className="btn-hero bg-white/10 hover:bg-white/20 magnetic px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Watch Video
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Booking Widget */}
            <motion.div
              className="lg:justify-self-end w-full max-w-md mx-auto lg:mx-0 order-1 lg:order-2"
              style={{
                x: window.innerWidth > 1024 ? mousePosition.x * 20 : 0,
                y: window.innerWidth > 1024 ? mousePosition.y * 10 : 0,
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            >
              <BookingWidget />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={prevSlide}
            className="p-3 glass rounded-full text-white hover:text-accent-1 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-accent-1 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextSlide}
            className="p-3 glass rounded-full text-white hover:text-accent-1 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};