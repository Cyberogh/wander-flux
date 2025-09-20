import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Clock, MapPin, CheckCircle, XCircle, Backpack } from 'lucide-react';

interface TimelineDay {
  day: number;
  title: string;
  activities: string[];
}

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  timeline?: TimelineDay[];
}

const timelineData = [
  {
    day: 1,
    title: "Arrival & City Tour",
    activities: [
      "Airport pickup and hotel check-in",
      "Local market exploration",
      "Traditional dinner at riverside restaurant"
    ]
  },
  {
    day: 2,
    title: "Adventure & Culture", 
    activities: [
      "Morning trek to viewpoint",
      "Cultural workshop with locals",
      "Evening folk performance"
    ]
  },
  {
    day: 3,
    title: "Relaxation & Departure",
    activities: [
      "Spa and wellness session",
      "Shopping for souvenirs",
      "Airport transfer"
    ]
  }
];

const inclusions = [
  "Stay (2 nights)",
  "Breakfast & Dinner", 
  "Guided trek",
  "Cultural activities"
];

const exclusions = [
  "Flights",
  "Personal expenses",
  "Extra activities",
  "Travel insurance"
];

const thingsToCarry = [
  "Warm jacket",
  "Trek shoes", 
  "ID proof",
  "Sunscreen"
];

export const TimelineModal = ({ isOpen, onClose, destination, timeline }: TimelineModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const data = timeline && timeline.length ? timeline : timelineData;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ cursor: 'auto' }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-5xl h-[90vh] bg-gradient-to-br from-[#F3E6D0] to-[#D9C7A3] rounded-2xl overflow-hidden cursor-auto"
            initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-[#2E5AAC]/20">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[#2E5AAC]">
                {destination} - 3 Day Journey
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#2E5AAC]/10 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-[#2E5AAC]" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#2E5AAC]/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[#2E5AAC]" />
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="h-[calc(100%-88px)] overflow-y-auto cursor-auto">
              {currentStep < data.length ? (
                /* Timeline View */
                <div className="p-6">
                  {/* Timeline Progress */}
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      {data.map((_, index) => (
                        <div key={index} className="flex items-center">
                          <motion.div
                            className={`w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              index <= currentStep ? 'bg-[#2E5AAC]' : 'bg-gray-400'
                            }`}
                            animate={{
                              scale: index === currentStep ? 1.15 : 1,
                              boxShadow: index === currentStep ? '0 0 20px rgba(46, 90, 172, 0.5)' : '0 0 0px transparent'
                            }}
                          >
                            {index + 1}
                          </motion.div>
                          {index < data.length - 1 && (
                            <div className={`w-12 md:w-20 h-1 mx-2 ${index < currentStep ? 'bg-[#2E5AAC]' : 'bg-gray-300'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Current Day Content */}
                  <motion.div
                    key={currentStep}
                    className="text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[#2E5AAC] mb-4">
                      Day {data[currentStep].day}: {data[currentStep].title}
                    </h3>
                    
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
                      <ul className="space-y-3">
                        {data[currentStep].activities.map((activity, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center text-gray-800 text-base md:text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Clock className="w-5 h-5 mr-3 text-[#2E5AAC]" />
                            {activity}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Navigation */}
                  <div className="flex justify-center mt-8 space-x-4">
  {currentStep > 0 && (
    <button
      onClick={() => setCurrentStep(currentStep - 1)}
      className="px-6 py-3 bg-white/20 text-[#2E5AAC] rounded-lg hover:bg-white/30 transition-colors"
    >
      Previous Day
    </button>
  )}
  <button
    onClick={() => setCurrentStep(currentStep + 1)}
    className="px-6 py-3 bg-[#2E5AAC] text-white rounded-lg hover:bg-[#2E5AAC]/80 transition-colors"
  >
    {currentStep < data.length - 1 ? 'Next Day' : 'View Details'}
  </button>
</div>

                </div>
              ) : (
                /* Details View */
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Inclusions */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                        <h4 className="font-display font-bold text-xl text-[#2E5AAC]">Inclusions</h4>
                      </div>
                      <ul className="space-y-2">
                        {inclusions.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-800">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Exclusions */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <XCircle className="w-6 h-6 text-red-500 mr-2" />
                        <h4 className="font-display font-bold text-xl text-[#2E5AAC]">Exclusions</h4>
                      </div>
                      <ul className="space-y-2">
                        {exclusions.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-800">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Things to Carry */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <Backpack className="w-6 h-6 text-blue-600 mr-2" />
                        <h4 className="font-display font-bold text-xl text-[#2E5AAC]">Things to Carry</h4>
                      </div>
                      <ul className="space-y-2">
                        {thingsToCarry.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-800">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="px-6 py-3 bg-[#2E5AAC] text-white rounded-lg hover:bg-[#2E5AAC]/80 transition-colors"
                    >
                      Back to Timeline
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};