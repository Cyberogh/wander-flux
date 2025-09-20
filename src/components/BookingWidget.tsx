import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, Send } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, parseISO } from 'date-fns';
import 'react-day-picker/dist/style.css';

const nationalDestinations = [
  'Munsiyari', 'Nainital to Mukteshwar', 'Tirthan Jibhi - Manali', 'Tawang Arunachal Pradesh', 'Mussoorie - Landour - Rishikesh', 
  'Dzukou Valley'
];

const internationalDestinations = [
  'Nepal', 'Thailand', 'Malaysia', 'Maldives', 'Srilanka'
];

export const BookingWidget = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  
  const destinationRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setIsDestinationOpen(false);
      }
      if (peopleRef.current && !peopleRef.current.contains(event.target as Node)) {
        setIsPeopleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const getDateRange = () => {
    if (!selectedDate) return [];
    return [selectedDate, addDays(selectedDate, 1), addDays(selectedDate, 2)];
  };

  const sendWhatsAppInquiry = () => {
    if (!selectedDestination || !selectedDate) return;

    const dateString = format(selectedDate, 'dd-MM-yyyy');
    const message = `Hi, I'm interested in your 3-day trip to ${selectedDestination} for ${adults} adults and ${kids} kids starting ${dateString}. Please send details, cost and availability.`;
    const urlEncoded = encodeURIComponent(message);
    
    // Update URL with search params
    const query = `?dest=${encodeURIComponent(selectedDestination)}&adults=${adults}&kids=${kids}&date=${encodeURIComponent(dateString)}`;
    window.history.replaceState({}, '', window.location.pathname + query);
    
    // Open WhatsApp
    const waBase = 'https://wa.me/+918960186655?text=';
    window.open(waBase + urlEncoded, '_blank');
  };

  const incrementCounter = (type: 'adults' | 'kids') => {
    if (type === 'adults' && adults < 10) {
      setAdults(adults + 1);
    } else if (type === 'kids' && kids < 10 && adults + kids < 10) {
      setKids(kids + 1);
    }
  };

  const decrementCounter = (type: 'adults' | 'kids') => {
    if (type === 'adults' && adults > 1) {
      setAdults(adults - 1);
    } else if (type === 'kids' && kids > 0) {
      setKids(kids - 1);
    }
  };

  return (
    <motion.div
      className="booking-widget w-full max-w-md mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <h3 className="text-white font-display text-xl font-bold mb-6 text-center">
        Book Your 3-Day Adventure
      </h3>

      <div className="space-y-4">
        {/* Destination Selector */}
        <div className="relative" ref={destinationRef}>
          <motion.button
            type="button"
            className="w-full p-4 glass rounded-xl text-left flex items-center justify-between text-white hover:border-accent-1/50 transition-colors touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              setIsDestinationOpen((open) => !open);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-accent-1" />
              <span>{selectedDestination || 'Select destination'}</span>
            </div>
            <motion.div
              animate={{ rotate: isDestinationOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isDestinationOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-surface-700 backdrop-blur-md border border-white/10 rounded-xl p-4 z-[999] shadow-xl max-h-64 overflow-y-auto overscroll-contain touch-manipulation pointer-events-auto"
                initial={{ opacity: 0, y: -10, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -10, rotateX: -10 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                <div className="space-y-3">
                  <div>
                    <h4 className="text-accent-1 font-semibold mb-2 sticky top-0 bg-surface-700 py-1">National</h4>
                    <div className="space-y-1">
                      {nationalDestinations.map((dest, index) => (
                        <motion.button
                          key={dest}
                          className="block w-full text-left p-2 text-white/80 hover:text-accent-1 hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedDestination(dest);
                            setIsDestinationOpen(false);
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          {dest}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-accent-2 font-semibold mb-2 sticky top-0 bg-surface-700 py-1">International</h4>
                    <div className="space-y-1">
                      {internationalDestinations.map((dest, index) => (
                        <motion.button
                          key={dest}
                          className="block w-full text-left p-2 text-white/80 hover:text-accent-2 hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedDestination(dest);
                            setIsDestinationOpen(false);
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (nationalDestinations.length + index) * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          {dest}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Picker */}
        <div className="relative">
          <motion.button
            type="button"
            className="w-full p-4 glass rounded-xl text-left flex items-center justify-between text-white hover:border-accent-1/50 transition-colors touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              setIsCalendarOpen((open) => !open);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-accent-1" />
              <span>
                {selectedDate 
                  ? `${format(selectedDate, 'MMM dd')} - ${format(addDays(selectedDate, 2), 'MMM dd')}`
                  : 'Select dates'
                }
              </span>
            </div>
          </motion.button>

          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-surface-700 backdrop-blur-md border border-white/10 rounded-xl p-4 z-[999] shadow-xl touch-manipulation pointer-events-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  modifiers={{
                    tripRange: getDateRange(),
                  }}
                  modifiersClassNames={{
                    tripRange: 'bg-accent-1/20 border-accent-1/50',
                  }}
                  className="text-white [&_.rdp-day]:text-white [&_.rdp-day_button]:text-white pointer-events-auto"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* People Selector */}
        <div className="relative" ref={peopleRef}>
          <motion.button
            type="button"
            className="w-full p-4 glass rounded-xl text-left flex items-center justify-between text-white hover:border-accent-1/50 transition-colors touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              setIsPeopleOpen((open) => !open);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <Users size={20} className="text-accent-1" />
              <span>{adults + kids} guests</span>
            </div>
          </motion.button>

          <AnimatePresence>
            {isPeopleOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-surface-700 backdrop-blur-md border border-white/10 rounded-xl p-4 z-[999] shadow-xl touch-manipulation pointer-events-auto overscroll-contain"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Adults</span>
                    <div className="flex items-center space-x-3">
                      <motion.button
                        type="button"
                        className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/10"
                        onClick={() => decrementCounter('adults')}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        -
                      </motion.button>
                      <span className="text-white w-8 text-center">{adults}</span>
                      <motion.button
                        type="button"
                        className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/10"
                        onClick={() => incrementCounter('adults')}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Kids</span>
                    <div className="flex items-center space-x-3">
                      <motion.button
                        type="button"
                        className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/10"
                        onClick={() => decrementCounter('kids')}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        -
                      </motion.button>
                      <span className="text-white w-8 text-center">{kids}</span>
                      <motion.button
                        type="button"
                        className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/10"
                        onClick={() => incrementCounter('kids')}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                  {adults + kids > 5 && (
                    <motion.p
                      className="text-gold text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Group discount may apply
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Send Inquiry Button */}
        <motion.button
          type="button"
          className="w-full p-4 bg-gradient-to-r from-accent-1 to-accent-2 rounded-xl text-white font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-accent-1/20 transition-all touch-manipulation"
          onClick={(e) => {
            e.stopPropagation();
            sendWhatsAppInquiry();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          disabled={!selectedDestination || !selectedDate}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send size={20} />
          <span>Send Inquiry →</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
