import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Star, Users } from 'lucide-react';
import { TimelineModal } from './TimelineModal';

interface InternationalDestination {
  id: number;
  name: string;
  country: string;
  image: string;
  description: string;
  price: string;
  rating: number;
  experiences: string[];
}

const internationalDestinations: InternationalDestination[] = [
  {
    id: 1,
    name: "Phuket",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&h=800&fit=crop",
    description: "Fly out Friday, back by Monday — but it'll feel like you lived a month. Crystal beaches, floating markets, and temple sunsets.",
    price: "₹45,000",
    rating: 4.9,
    experiences: ["Beach Clubs", "Island Hopping", "Night Markets", "Temple Tours"]
  },
  {
    id: 2,
    name: "Kuala Lumpur",
    country: "Malaysia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&h=800&fit=crop",
    description: "Urban jungle meets tropical paradise. Street food adventures, twin tower views, and rooftop infinity pools.",
    price: "₹38,000",
    rating: 4.8,
    experiences: ["Petronas Towers", "Street Food", "Batu Caves", "Shopping"]
  },
  {
    id: 3,
    name: "Colombo",
    country: "Sri Lanka",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop",
    description: "The pearl of the Indian Ocean. Ancient temples, spice gardens, and train rides through emerald tea plantations.",
    price: "₹35,000",
    rating: 4.7,
    experiences: ["Tea Plantations", "Ancient Temples", "Coastal Drives", "Wildlife Safari"]
  },
  {
    id: 4,
    name: "Malé",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
    description: "Overwater bungalows and coral gardens. Three days of pure luxury where the ocean is your backyard.",
    price: "₹85,000",
    rating: 5.0,
    experiences: ["Overwater Villas", "Snorkeling", "Sunset Cruises", "Spa Retreats"]
  }
];

export const InternationalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timelineModal, setTimelineModal] = useState({ isOpen: false, destination: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % internationalDestinations.length);
    }, 5000);

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
    setCurrentSlide((prev) => (prev + 1) % internationalDestinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + internationalDestinations.length) % internationalDestinations.length);
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-display text-white mb-4">
            International <span className="text-accent-2">Escapes</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Cross borders, not budgets. Carefully crafted international experiences 
            that make every moment count in just 72 hours.
          </p>
        </motion.div>

        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-2xl lg:rounded-3xl overflow-hidden">
          {/* Background Slides */}
          <AnimatePresence mode="wait">
            {internationalDestinations.map((destination, index) => (
              currentSlide === index && (
                <motion.div
                  key={destination.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: mousePosition.x * -15,
                    y: mousePosition.y * -8,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    opacity: { duration: 1 },
                    scale: { duration: 1 },
                    x: { duration: 0.6 },
                    y: { duration: 0.6 },
                  }}
                >
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-bg-900/80 via-bg-900/40 to-transparent" />
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-4xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                style={{
                  x: mousePosition.x * -30,
                  y: mousePosition.y * -15,
                }}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin size={20} className="text-accent-2" />
                      <span className="text-accent-2 font-semibold">
                        {internationalDestinations[currentSlide].country}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-5xl text-white mb-6">
                      {internationalDestinations[currentSlide].name}
                    </h3>

                    <p className="text-lg text-white/90 mb-8 leading-relaxed">
                      {internationalDestinations[currentSlide].description}
                    </p>

                    {/* Experiences */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {internationalDestinations[currentSlide].experiences.map((experience, index) => (
                        <motion.span
                          key={experience}
                          className="px-4 py-2 glass rounded-full text-sm text-white border border-white/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {experience}
                        </motion.span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 mb-8">
                      <div className="flex items-center space-x-2">
                        <Star size={18} className="text-gold fill-gold" />
                        <span className="text-white font-semibold">
                          {internationalDestinations[currentSlide].rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={18} className="text-accent-2" />
                        <span className="text-white">Up to 8 guests</span>
                      </div>
                      <div className="text-2xl font-bold text-accent-2">
                        {internationalDestinations[currentSlide].price}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        className="flex-1 btn-hero bg-accent-1/20 border-accent-1/50 hover:bg-accent-1/30 hover:border-accent-1 magnetic"
                        onClick={() => setTimelineModal({ isOpen: true, destination: internationalDestinations[currentSlide].name })}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore Journey →
                      </motion.button>
                      
                      <motion.button
                        className="flex-1 btn-hero bg-green-500/20 border-green-500/50 hover:bg-green-500/30 hover:border-green-500 magnetic"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Experience →
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Visual Card */}
              <motion.div
                className="hidden lg:block"
                style={{
                  x: mousePosition.x * 20,
                  y: mousePosition.y * 10,
                }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="card-premium backdrop-blur-xl bg-white/5 border border-white/10"
                  animate={{ 
                    rotateY: mousePosition.x * 5,
                    rotateX: mousePosition.y * -5,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-display font-bold text-xl text-white mb-2">
                        Your 3-Day Itinerary
                      </h4>
                      <p className="text-white/70 text-sm">
                        Perfectly curated experiences
                      </p>
                    </div>

                    <div className="space-y-3">
                      {['Day 1: Arrival & City Tour', 'Day 2: Adventure & Culture', 'Day 3: Relaxation & Departure'].map((day, index) => (
                        <motion.div
                          key={day}
                          className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 bg-accent-2/20 rounded-full flex items-center justify-center text-accent-2 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-white/90 text-sm">{day}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="text-center pt-4 border-t border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-white/70 text-xs">
                        All-inclusive package with flights
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={prevSlide}
                className="p-3 glass rounded-full text-white hover:text-accent-2 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} />
              </motion.button>

              <div className="flex space-x-2">
                {internationalDestinations.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-accent-2 w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="p-3 glass rounded-full text-white hover:text-accent-2 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <TimelineModal 
        isOpen={timelineModal.isOpen}
        onClose={() => setTimelineModal({ isOpen: false, destination: '' })}
        destination={timelineModal.destination}
      />
    </section>
  );
};