import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from 'lucide-react';
import { TimelineModal } from './TimelineModal';

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
    name: "Munsiyari",
    image: "https://images.unsplash.com/photo-1683700916507-93d49889bacc?w=800&h=600&fit=crop",
    description: "Winding roads, hot chai, and sunsets that stay with you.",
    duration: "3 days",
    price: "₹15,000",
    rating: 4.8,
    highlights: []
  },
  {
    id: 2,
    name: "Nainital to Mukteshwar",
    image: "https://images.unsplash.com/photo-1683567386578-738d9cc9b62c?w=800&h=600&fit=crop",
    description: "Calm lakes and quiet hills to slow down in.",
    duration: "3 days",
    price: "₹12,000",
    rating: 4.7,
    highlights: []
  },
  {
    id: 3,
    name: "Tirthan Jibhi - Manali",
    image: "https://images.unsplash.com/photo-1712388430474-ace0c16051e2?w=800&h=600&fit=crop",
    description: "Waterfalls, pine trails, and cozy mountain vibes.",
    duration: "3 days",
    price: "₹18,000",
    rating: 4.9,
    highlights: []
  },
  {
    id: 4,
    name: "Tawang Arunachal Pradesh",
    image: "https://images.unsplash.com/photo-1626761627604-f27d98885f4b?w=800&h=600&fit=crop",
    description: "Monasteries, mountain passes, and endless views.",
    duration: "3 days",
    price: "₹14,000",
    rating: 4.6,
    highlights: []
  },
  {
    id: 5,
    name: "Mussoorie - Landour - Rishikesh",
    image: "https://images.unsplash.com/photo-1583143874828-de3d288be51a?w=800&h=600&fit=crop",
    description: "Colonial charm, lazy walks, and a dash of adventure.",
    duration: "3 days",
    price: "₹14,000",
    rating: 4.6,
    highlights: []
  },
  {
    id: 6,
    name: "Shillong",
    image: "https://images.unsplash.com/photo-1746339031227-fe31bf4c0955?w=800&h=600&fit=crop",
    description: "Music, mist, and a hill town that feels alive.",
    duration: "3 days",
    price: "₹14,000",
    rating: 4.6,
    highlights: []
  }
];

// Itineraries for each destination
const itineraries: Record<string, { day: number; title: string; activities: string[] }[]> = {
  "Nainital to Mukteshwar": [
    { day: 0, title: "Pickup from Lucknow", activities: ["Pickup from Lucknow Alambagh metro station at 10:30PM", "Overnight luxury bus journey to Kathgodam"]},
    { day: 1, title: "Reach Kathgodam (Nainital)", activities: ["Reach Bhimtal, witness lakes Bhimtal & Sattal", "Stay at Bhimtal cottages/hotel", "Explore Nainital, Mall Road, Sattal, paragliding at Naukuchiyatal", "Evening bonfire and dinner"]},
    { day: 2, title: "Mukteshwar", activities: ["Morning sunrise & breakfast", "Visit Baba Neem Karoli Ashram", "Riverside party", "Scenic sunset in Mukteshwar", "Overnight stay in jungle camp"]},
    { day: 3, title: "Bhalughad Waterfall Trek & Return", activities: ["Checkout & trek to Bhalughad waterfall (1.5km)", "Evening return to Kathgodam", "Luxury bus back to Lucknow"]}
  ],
  "Munsiyari": [
    { day: 0, title: "Pickup from Lucknow", activities: ["Pickup from Alambagh metro station at 10:30PM", "Overnight bus to Kathgodam"]},
    { day: 1, title: "Kathgodam to Munsiyari", activities: ["Scenic drive via Pithoragarh", "Check-in, dinner and rest between snow-clad mountains"]},
    { day: 2, title: "Khaliya Peak Trek", activities: ["Early breakfast", "Start Khaliya peak trek (10-12km)", "Reach zero point for mesmerizing views", "Return to stay, bonfire & dinner"]},
    { day: 3, title: "Helicopter Ride & Return", activities: ["Breakfast", "Helicopter ride Munsiyari → Haldwani (45 mins)", "Explore Haldwani market or Nainital", "Evening bus back to Lucknow"]}
  ],
  "Mussoorie - Landour - Rishikesh": [
    { day: 0, title: "Pickup from Lucknow", activities: ["Pickup from Lucknow Alambagh at 10PM", "Overnight bus to Dehradun"]},
    { day: 1, title: "Dehradun – Mussoorie", activities: ["Reach Dehradun, breakfast enroute", "Check into Mussoorie stay", "Explore Landour, Lal Tibba, churches, cafés, Mall Road", "Evening games, music, dinner"]},
    { day: 2, title: "Rishikesh", activities: ["Breakfast", "Move to Rishikesh, stay in riverside cottages", "Adventure sports: rafting, bungee, etc.", "Evening Ganga Aarti, bonfire & dinner"]},
    { day: 3, title: "Hidden Rishikesh & Return", activities: ["Visit Patna waterfall, Beatles Ashram, Triveni Ghat", "Return to Dehradun", "Evening bus to Lucknow"]}
  ],
  "Tirthan Jibhi - Manali": [
    { day: 1, title: "Lucknow to Delhi", activities: ["Overnight journey Lucknow → Delhi → Jibhi"]},
    { day: 2, title: "Explore Jibhi", activities: ["Breakfast", "Explore Jibhi town, riverside cafés", "Evening bonfire & music"]},
    { day: 3, title: "Jalori Pass & Serolsar Lake Trek", activities: ["Breakfast", "Drive to Jalori Pass", "Trek 9km to Serolsar Lake", "Dinner & rest"]},
    { day: 4, title: "Rafting or Chehni Kothi Trek", activities: ["Breakfast", "Choose rafting / Chehni Kothi trek", "Evening departure from Jibhi"]},
    { day: 5, title: "Delhi & Lucknow arrival", activities: ["Trip ends"]}
  ],
  "Tawang Arunachal Pradesh": [
    { day: 1, title: "Guwahati to Dirang", activities: ["Breakfast", "Sightseeing: Kameng River, Tippi Orchid Park, Nichiphula Waterpark", "Overnight stay at Dirang"]},
    { day: 2, title: "Dirang to Tawang", activities: ["Breakfast", "Sightseeing: Sela Pass, Sela Lake, Jaswant Garh War Memorial, Nuranang Falls", "Overnight stay at Tawang"]},
    { day: 3, title: "Explore Tawang", activities: ["Sightseeing: Bumla Pass, Pangateng Lake, Madhuri Lake, Tawang Monastery, Buddha Statue, War Memorial", "Overnight stay at Tawang"]},
    { day: 4, title: "Tawang to Dirang", activities: ["Breakfast", "Sightseeing: Sela Tunnel, Dirang Monastery, Sangti Valley", "Overnight stay at Dirang"]},
    { day: 5, title: "Dirang to Guwahati", activities: ["Breakfast", "Sightseeing: Bomdila Monastery, Shergaon Hanging Bridge, Bhutan Border", "Return to Guwahati"]}
  ],
  "Shillong": [
    { day: 1, title: "Lucknow to Shillong", activities: ["Overnight journey"]},
    { day: 2, title: "Explore Shillong", activities: ["Breakfast", "Explore town, café hopping, riverside walks", "Evening bonfire & music"]},
    { day: 3, title: "Shillong Lake Trek", activities: ["Breakfast", "Trek to Shillong Lake (5 hrs)", "Dinner & rest"]},
    { day: 4, title: "Shillong trek or rafting", activities: ["Breakfast", "Choose rafting or trek", "Evening departure"]},
    { day: 5, title: "Trip Ends", activities: ["Delhi & Lucknow arrival"]}
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

export const DestinationCarousel = () => {
  const cardsPerView = useCardsPerView();
  const maxSlides = Math.ceil(nationalDestinations.length / cardsPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timelineModal, setTimelineModal] = useState<{ isOpen: boolean; destination: string; timeline?: { day: number; title: string; activities: string[] }[] }>({ isOpen: false, destination: '' });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

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
            National <span className="text-accent-1">Destinations</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Discover the beauty of India with our curated itineraries. From mountain peaks to serene lakes, adventure awaits.
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
            {nationalDestinations.map((destination) => (
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
                        timeline: itineraries[destination.name] || []
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
