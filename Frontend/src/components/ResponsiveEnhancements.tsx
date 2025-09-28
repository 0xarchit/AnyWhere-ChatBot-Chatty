import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
}

export const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  offset = 0, 
  className = "" 
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + (speed * 100)]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

interface ScrollTriggeredProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
}

export const ScrollTriggered = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = ""
}: ScrollTriggeredProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      scale: direction === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
  className?: string;
}

export const FloatingElement = ({ 
  children, 
  intensity = 10, 
  speed = 2, 
  className = "" 
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MouseTrackingElementProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const MouseTrackingElement = ({ 
  children, 
  intensity = 0.1, 
  className = "" 
}: MouseTrackingElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) * intensity,
          y: (e.clientY - centerY) * intensity
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return (
    <motion.div
      ref={ref}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring" as const,
        stiffness: 150,
        damping: 15
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ResponsiveGrid = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={`
      grid gap-4 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      2xl:grid-cols-5
      ${className}
    `}>
      {children}
    </div>
  );
};

export const ResponsiveContainer = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={`
      container mx-auto 
      px-4 sm:px-6 lg:px-8 
      max-w-7xl
      ${className}
    `}>
      {children}
    </div>
  );
};