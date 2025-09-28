import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import CustomCursor from "@/components/CustomCursor";
import Hero3D from "@/components/Hero3D";
import QuickStart from "@/components/QuickStart";
import HowItWorks from "@/components/HowItWorks";
import Attributes from "@/components/Attributes";
import LiveDemo from "@/components/LiveDemo";
import PrivacyControl from "@/components/PrivacyControl";
import AccessibilityPerformance from "@/components/AccessibilityPerformance";
import Troubleshooting from "@/components/Troubleshooting";
import Footer from "@/components/Footer";
import { ParallaxElement } from "@/components/ResponsiveEnhancements";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="w-20 h-20 mx-auto mb-8 glass-strong rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl font-bold text-glow mb-2"
        >
          AnyWhere Chatbot
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-muted-foreground"
        >
          Loading experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      const scrolled = currentScrollY;
      const rate = scrolled * -0.3;
      
      // Enhanced parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        (element as HTMLElement).style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.01}deg)`;
      });

      // Tilt effect for floating callouts
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const distanceFromCenter = (rect.top + rect.height / 2 - centerY) / centerY;
        (element as HTMLElement).style.transform = `rotateX(${distanceFromCenter * 5}deg) rotateY(${distanceFromCenter * 2}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload and optimization
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen"
          >
            {/* Custom cursor */}
            <CustomCursor />
            
            {/* Hero section with 3D */}
            <Hero3D />
            
            {/* Main content sections with parallax */}
            <main className="relative">
              <ParallaxElement speed={0.2} className="relative z-10">
                <QuickStart />
              </ParallaxElement>
              
              <ParallaxElement speed={0.3} className="relative z-10">
                <HowItWorks />
              </ParallaxElement>
              
              <ParallaxElement speed={0.1} className="relative z-10">
                <Attributes />
              </ParallaxElement>
              
              <ParallaxElement speed={0.4} className="relative z-10">
                <LiveDemo />
              </ParallaxElement>
              
              <ParallaxElement speed={0.2} className="relative z-10">
                <PrivacyControl />
              </ParallaxElement>
              
              <ParallaxElement speed={0.3} className="relative z-10">
                <AccessibilityPerformance />
              </ParallaxElement>
              
              <ParallaxElement speed={0.1} className="relative z-10">
                <Troubleshooting />
              </ParallaxElement>
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Enhanced background decorations */}
            <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
              <motion.div 
                className="parallax-bg absolute top-20 left-20 w-96 h-96 bg-primary/2 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0.3, 0.1, 0.3] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              <motion.div 
                className="parallax-bg absolute bottom-20 right-20 w-96 h-96 bg-accent/2 rounded-full blur-3xl"
                animate={{ 
                  scale: [1.2, 1, 1.2], 
                  opacity: [0.1, 0.3, 0.1] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              <motion.div 
                className="parallax-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-mesh opacity-5 rounded-full blur-3xl"
                animate={{ 
                  rotate: [0, 360] 
                }}
                transition={{ 
                  duration: 60, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Floating geometric shapes */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="parallax-bg absolute w-4 h-4 bg-primary/20 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>

            {/* Scroll progress indicator */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary origin-left z-50"
              style={{
                scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight) || 0
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
