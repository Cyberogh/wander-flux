import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin } from 'lucide-react';
import { TimelineModal } from './TimelineModal';

// Dzukou Valley Itinerary Data
const dzukouValleyTimeline = [
  {
    day: 1,
    title: "Journey Begins - Guwahati to Dimpur",
    activities: [
      "Pick up at 12PM to 3PM from Guwahati to Dimpur",
      "Scenic drive through Assam countryside", 
      "Evening arrival and dinner in Dimpur",
      "Overnight stay in Dimpur"
    ]
  },
  {
    day: 2,
    title: "Dimpur to Kigwama - Base Preparation",
    activities: [
      "Wake up early at 7:00AM for breakfast",
      "Departure at 10:30-11:00AM from Dimpur",
      "3-hour scenic drive to Kigwama homestay",
      "Check-in and room allotment at homestay",
      "Fun time and evening activities",
      "Dinner served at 9:30PM"
    ]
  },
  {
    day: 3,
    title: "Trek to Dzukou Valley Base Camp",
    activities: [
      "Early morning breakfast at 7:30AM",
      "Leave for trek starting point at 10:00AM",
      "Trek begins through beautiful landscapes",
      "Lunch at 12:00PM with scenic views",
      "Reach base camp by 4:00-5:00PM",
      "Bonfire session at 7:30PM",
      "Dinner at 9:00PM with music and entertainment"
    ]
  },
  {
    day: 4,
    title: "Valley Exploration & Return",
    activities: [
      "Breakfast at 7:00AM at valley/basecamp",
      "Explore the magnificent Dzukou Valley",
      "Enjoy the pristine nature and landscapes",
      "Return to basecamp around 10-11AM",
      "Journey back to homestay",
      "Tea and snacks with memorable moments",
      "Transfer to railway station"
    ]
  }
];

// Khaliya Top Trek Itinerary Data
const khaliyaTopTimeline = [
  {
    day: 1,
    title: "Kathgodam to Munsiyari - Gateway to Himalayas",
    activities: [
      "Meet at Kathgodam Railway Station early morning",
      "Scenic drive through winding mountain roads",
      "Pass through pine forests and charming hill towns",
      "Stop at Almora and Bageshwar",
      "Evening arrival in Munsiyari",
      "Check into guesthouse",
      "First glimpse of Panchachuli peaks at sunset"
    ]
  },
  {
    day: 2,
    title: "Trek to Khaliya Top Campsite",
    activities: [
      "Drive to Balanti Farm - trek starting point",
      "Begin trek through oak, pine, and rhododendron forests",
      "Gradual climb with improving mountain views",
      "Reach campsite below Khaliya Top",
      "Set up camp surrounded by alpine meadows",
      "Evening tea and snacks",
      "Hot dinner under starry Himalayan sky"
    ]
  },
  {
    day: 3,
    title: "Khaliya Top Summit & Return",
    activities: [
      "Early morning summit push to Khaliya Top (3,500m)",
      "Spectacular 360° Himalayan views",
      "See Panchachuli, Rajrambha, Hardeol, and Nanda Kot peaks",
      "Winter: Snow-covered meadows, Summer: Wildflower fields",
      "Spend time at summit taking in the views",
      "Descend to Balanti Farm",
      "Drive back to Munsiyari for relaxing evening"
    ]
  },
  {
    day: 4,
    title: "Return Journey to Kathgodam",
    activities: [
      "After breakfast, begin return journey",
      "Scenic drive back through mountain routes",
      "Retrace the beautiful landscapes",
      "Evening arrival at Kathgodam",
      "End of trek with memories of meadows and peaks"
    ]
  }
];

// CREATE THE ITINERARIES MAPPING OBJECT (this was missing!)
const trekkingItineraries: Record<string, { day: number; title: string; activities: string[] }[]> = {
  "Dzukou Valley Trek": dzukouValleyTimeline,
  "Khaliya Top Trek": khaliyaTopTimeline
};

const trekkingDestinations = [
  {
    id: 1,
    name: "Dzukou Valley Trek",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: "₹18,000",
    duration: "4 days",
    rating: 4.8,
    location: "Nagaland",
    description: "Tribal trails & wild horizons",
    tags: ["Trekking", "Culture", "Offbeat", "Adventure"],
    highlights: "Valley of flowers, tribal culture, camping under stars",
    timeline: dzukouValleyTimeline
  },
  {
    id: 2,
    name: "Khaliya Top Trek",
    image: "https://uttarakhandtriptrek.com/wp-content/uploads/2018/10/Khaliya-Top-Munsayari.jpg", 
    price: "₹22,000",
    duration: "4 days",
    rating: 4.7,
    location: "Munsiyari",
    description: "Glacier paths & pine valleys",
    tags: ["Trekking", "Glaciers", "Mountains", "Adventure"],
    highlights: "360° Himalayan views, Panchachuli peaks, alpine meadows",
    timeline: khaliyaTopTimeline
  }
];

export const TrekkingSection = () => {
  // UPDATED: Change the state structure to match DestinationCarousel
  const [timelineModal, setTimelineModal] = useState<{ 
    isOpen: boolean; 
    destination: string; 
    timeline?: { day: number; title: string; activities: string[] }[] 
  }>({ isOpen: false, destination: '' });

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
            🏔️ Trekking Adventures
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

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {destination.name}
                </h3>

                {/* Location */}
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-accent-1" />
                  <span className="text-white/80 font-medium">
                    {destination.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/80 mb-3 text-base leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <p className="text-white/60 mb-4 text-sm italic">
                  {destination.highlights}
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

                {/* CTA Button - UPDATED to pass timeline data */}
                <motion.button
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent-1 to-accent-2 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent-1/20 transition-all magnetic"
                  onClick={() => setTimelineModal({ 
                    isOpen: true, 
                    destination: destination.name,
                    timeline: trekkingItineraries[destination.name] || []
                  })}
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
        onClose={() => setTimelineModal({ isOpen: false, destination: '', timeline: undefined })}
        destination={timelineModal.destination}
        timeline={timelineModal.timeline}
      />
    </section>
  );
};