import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin } from 'lucide-react';
import { TimelineModal } from './TimelineModal';

const trekkingDestinations = [
  {
    id: 1,
    name: "Nagaland Tribal Trails",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: "₹18,000",
    duration: "3 days",
    rating: 4.8,
    location: "Nagaland",
    description: "Tribal trails & wild horizons",
    tags: ["Trekking", "Culture", "Offbeat", "Adventure"]
  },
  {
    id: 2,
    name: "Munsiyari Glacier Trek",
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
    price: "₹22,000",
    duration: "3 days",
    rating: 4.7,
    location: "Munsiyari",
    description: "Glacier paths & pine valleys",
    tags: ["Trekking", "Glaciers", "Mountains", "Adventure"]
  }
];

export const TrekkingSection = () => {
  const [timelineModal, setTimelineModal] = useState({ isOpen: false, destination: '' });

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-bg-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-display bg-gradient-to-r from-[#D9C7A3] to-[#2E5AAC] bg-clip-text text-transparent mb-6">
            🏔 Trekking Adventures
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#D9C7A3] to-[#2E5AAC] mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {trekkingDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="group relative overflow-hidden rounded-2xl bg-surface-700 hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-accent-1 text-white px-3 py-1 rounded-full font-semibold">
                  {destination.price}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-gold fill-current" />
                      {destination.rating}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-accent-1" />
                  <span className="text-white font-display font-bold text-xl">
                    {destination.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/80 mb-4 text-lg leading-relaxed">
                  {destination.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent-1 to-accent-2 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent-1/20 transition-all magnetic"
                  onClick={() => setTimelineModal({ isOpen: true, destination: destination.location })}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Journey →
                </motion.button>
              </div>
            </motion.div>
          ))}
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