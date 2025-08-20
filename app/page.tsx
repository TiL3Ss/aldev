import { Suspense } from 'react';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { Navigation } from './components/layout/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
     
      <AnimatedBackground />
      
    
      <div className="relative z-10">
        <Navigation />
        
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <HeroSection />
            <TechStackSection />
            <ProjectsSection />
            <ContactSection />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}