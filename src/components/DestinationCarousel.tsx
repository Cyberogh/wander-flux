import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  highlights: string[];
}

const nationalDestinations: Destination[] = [
  {
    id: 1,
    name: "Manali",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Misty roads, chai breaks, and a rooftop sunset.",
    duration: "3 days",
    price: "₹15,000",
    rating: 4.8,
    highlights: ["Mountain Views", "Adventure Sports", "Local Culture"]
  },
  {
    id: 2,
    name: "Nainital",
    image: "https://images.unsplash.com/photo-1544557962-7b21e99d8a96?w=800&h=600&fit=crop",
    description: "Lake reflections and mountain serenity.",
    duration: "3 days",
    price: "₹12,000",
    rating: 4.7,
    highlights: ["Lake Boating", "Hill Station", "Nature Walks"]
  },
  {
    id: 3,
    name: "Shillong",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop",
    description: "Scotland of the East with rolling hills.",
    duration: "3 days",
    price: "₹18,000",
    rating: 4.9,
    highlights: ["Waterfalls", "Music Culture", "Living Root Bridges"]
  },
  {
    id: 4,
    name: "Mussoorie",
    image: "https://images.unsplash.com/photo-1476984251899-8d8ec5d78d51?w=800&h=600&fit=crop",
    description: "Queen of Hills with colonial charm.",
    duration: "3 days",
    price: "₹14,000",
    rating: 4.6,
    highlights: ["Cable Car", "Mall Road", "Hill Views"]
  }
];

export const DestinationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, nationalDestinations.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, nationalDestinations.length - 2)) % Math.max(1, nationalDestinations.length - 2));
  };

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-display text-white mb-4">
            National <span className="text-accent-1">Destinations</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover the beauty of India with our curated 3-day experiences. 
            From mountain peaks to serene lakes, adventure awaits.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 glass rounded-full text-white hover:text-accent-1 transition-colors"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 glass rounded-full text-white hover:text-accent-1 transition-colors"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * 33.333}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {nationalDestinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                  onHoverStart={() => setHoveredCard(destination.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div
                    className="destination-card group cursor-pointer h-full"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                      <motion.img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredCard === destination.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-900/60 to-transparent" />
                      
                      {/* Price Badge */}
                      <motion.div
                        className="absolute top-4 right-4 bg-accent-1 text-bg-900 px-3 py-1 rounded-full font-semibold text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {destination.price}
                      </motion.div>

                      {/* Floating Icons */}
                      <motion.div
                        className="absolute bottom-4 left-4 flex items-center space-x-4 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span className="text-sm">{destination.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-gold fill-gold" />
                          <span className="text-sm">{destination.rating}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <MapPin size={18} className="text-accent-1" />
                        <h3 className="font-display font-bold text-xl text-white">
                          {destination.name}
                        </h3>
                      </div>

                      <p className="text-white/80 leading-relaxed">
                        {destination.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, index) => (
                          <motion.span
                            key={highlight}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/90"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.button
                        className="w-full btn-hero justify-center mt-6 group-hover:bg-accent-1/20 group-hover:border-accent-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore Journey →
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: Math.max(1, nationalDestinations.length - 2) }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent-1 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};