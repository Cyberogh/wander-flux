import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from 'lucide-react';
import { TimelineModal } from './TimelineModal';

interface TrekDestination {
  id: number;
  name: string;
  image: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
}

const trekkingDestinations: TrekDestination[] = [
  {
    id: 1,
    name: "Nagaland Tribal Trails",
    image: "https://images.unsplash.com/photo-1679657081986-78bafd3576f6?w=800&h=600&fit=crop",
    description: "The magical Dzukou Valley trek through Nagaland hills.",
    duration: "4 days",
    price: "₹20,000",
    rating: 4.9
  },
  {
    id: 2,
    name: "Munsiyari Glacier Trek",
    image: "https://images.unsplash.com/photo-1695914575295-061b85d34ed2?w=800&h=600&fit=crop",
    description: "Khaliya Top trek with 360° views of the Himalayas.",
    duration: "4 days",
    price: "₹18,000",
    rating: 4.8
  }
];

// Trek itineraries
const trekItineraries: Record<string, { day: number; title: string; activities: string[] }[]> = {
  "Nagaland Tribal Trails": [
    { day: 1, title: "Dimapur Arrival", activities: [
      "Pickup from Guwahati to Dimapur",
      "Dinner & overnight stay in Dimapur"
    ]},
    { day: 2, title: "Dimapur → Kigwama", activities: [
      "Morning breakfast",
      "Drive to Kigwama (3 hrs)",
      "Room allotment, evening snacks & dinner"
    ]},
    { day: 3, title: "Trek to Base Camp", activities: [
      "Breakfast",
      "Start trek to base camp (10–11AM)",
      "Lunch on trail, reach camp by 4–5PM",
      "Evening bonfire, music & dinner"
    ]},
    { day: 4, title: "Valley Visit & Return", activities: [
      "Breakfast at 7AM",
      "Enjoy Dzukou Valley nature",
      "Return to basecamp & homestay",
      "Evening departure for railway station"
    ]}
  ],
  "Munsiyari Glacier Trek": [
    { day: 1, title: "Kathgodam → Munsiyari", activities: [
      "Scenic drive via Almora & Bageshwar",
      "Evening arrival at Munsiyari, check-in",
      "Dinner & rest with Panchachuli peaks view"
    ]},
    { day: 2, title: "Munsiyari → Khaliya Top Camp", activities: [
      "Short drive to trek start (Balanti Farm)",
      "Trek through oak, pine & rhododendron forests",
      "Reach campsite below Khaliya Top",
      "Dinner & overnight in tents"
    ]},
    { day: 3, title: "Khaliya Top Summit & Return", activities: [
      "Early start to Khaliya Top summit (360° Himalayan views)",
      "Descend to Balanti Farm",
      "Drive back to Munsiyari, rest & dinner"
    ]},
    { day: 4, title: "Munsiyari → Kathgodam", activities: [
      "Breakfast & return drive to Kathgodam",
      "Trip ends with Himalayan memories"
    ]}
  ]
};

const useCardsPerView = () => {
  const [cards, setCards] = useState(1);
  useEffect(() => {
    const updateCards = () => {
      const width = window.innerWidth;
      if (width >= 1280) setCards(4);
      else if (width >= 1024) setCards(3);
      else if (width >= 768) setCards(2);
      else setCards(1);
    };
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);
  return cards;
};

export const TrekkingSection = () => {
  const cardsPerView = useCardsPerView();
  const maxSlides = Math.ceil(trekkingDestinations.length / cardsPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timelineModal, setTimelineModal] = useState<{ isOpen: boolean; destination: string; timeline?: { day: number; title: string; activities: string[] }[] }>({ isOpen: false, destination: '' });

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % maxSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-display text-white mb-4">
            Trekking <span className="text-accent-1">Adventures</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Step into the wild with our curated trekking experiences. From valleys to glaciers, each trek is an unforgettable journey.
          </p>
        </motion.div>

        <div className="relative">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trekkingDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                className="destination-card group cursor-pointer h-full relative z-10 bg-bg-800 rounded-xl md:rounded-2xl p-4 flex flex-col"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-lg md:rounded-xl mb-3 aspect-[4/3]">
                  <motion.img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-900/60 to-transparent" />

                  <div className="absolute top-2 right-2 bg-accent-1 text-bg-900 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                    {destination.price}
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center space-x-3 text-white text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-gold fill-gold" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-grow space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-accent-1" />
                    <h3 className="font-display font-bold text-base md:text-lg text-white">
                      {destination.name}
                    </h3>
                  </div>

                  <p className="text-white/80 leading-relaxed text-xs md:text-sm flex-grow">
                    {destination.description}
                  </p>

                  <motion.button
                    className="w-full btn-hero justify-center mt-3 md:mt-4 group-hover:bg-accent-1/20 group-hover:border-accent-1 text-sm py-1.5"
                    onClick={() =>
                      setTimelineModal({
                        isOpen: true,
                        destination: destination.name,
                        timeline: trekItineraries[destination.name] || []
                      })
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Journey →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
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

      <TimelineModal 
        isOpen={timelineModal.isOpen}
        onClose={() => setTimelineModal({ isOpen: false, destination: '', timeline: undefined })}
        destination={timelineModal.destination}
        timeline={timelineModal.timeline}
      />
    </section>
  );
};
