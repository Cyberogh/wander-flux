import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DestinationCarousel } from '@/components/DestinationCarousel';
import { InternationalSlider } from '@/components/InternationalSlider';
import { TrekkingSection } from '@/components/TrekkingSection';


const Index = () => {
  return (
    <div className="min-h-screen bg-bg-900 relative overflow-x-hidden">
      
      <Header />
      
      <main>
        <Hero />
        
        <section id="destinations">
          <DestinationCarousel />
          <InternationalSlider />
          <TrekkingSection />
        </section>
        
        {/* About Section */}
        <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-display text-white mb-6 sm:mb-8">
              Why Choose <span className="text-accent-1">Thrill Trail</span>?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Curated Experiences",
                  description: "Every destination handpicked for maximum impact in just 3 days.",
                  icon: "🎯"
                },
                {
                  title: "Hassle-Free Planning", 
                  description: "From booking to boarding, we handle every detail of your journey.",
                  icon: "✨"
                },
                {
                  title: "Local Expertise",
                  description: "Connect with local guides who know the hidden gems and best spots.",
                  icon: "🗺️"
                }
              ].map((feature, index) => (
                <div key={index} className="card-premium text-center p-6 sm:p-8">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-1 to-accent-2 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-white font-display font-bold text-lg sm:text-xl">Thrill Trail</span>
          </div>
          <p className="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">
            Crafting unforgettable 3-day adventures since 2024
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-6 text-white/60 text-sm sm:text-base">
            <a href="#" className="hover:text-accent-1 transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent-1 transition-colors">Terms</a>
            <a href="#" className="hover:text-accent-1 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
