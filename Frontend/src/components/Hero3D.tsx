import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, Environment, MeshTransmissionMaterial, Html, useTexture } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import * as THREE from "three";
import { toast } from 'sonner';

const installSnippet = `<script defer src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js" mode="dark" brandName="AnyWhere ChatBot - Chatty" systemPrompt="You are friendly chatbot created by AnyWhere Chatbot - Chatty and owned by 0xArchit." context = "toggle"></script>`;

const ChatBubbleOrb = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle rotation based on mouse position
      meshRef.current.rotation.x += delta * 0.2 + mousePosition.y * 0.001;
      meshRef.current.rotation.y += delta * 0.3 + mousePosition.x * 0.001;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.1;
      particlesRef.current.rotation.y -= delta * 0.15;
    }
  });

  // Generate particles in a more complex pattern
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ],
        scale: 0.01 + Math.random() * 0.02,
        speed: 0.5 + Math.random() * 0.5
      });
    }
    return temp;
  }, []);

  return (
    <group ref={groupRef}>
      <Float
        speed={2}
        rotationIntensity={1}
        floatIntensity={0.8}
        floatingRange={[-0.2, 0.2]}
      >
        {/* Main orb with advanced materials */}
        <Sphere ref={meshRef} args={[1.2, 128, 128]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            color="#00D4FF"
            transmission={1}
            thickness={0.5}
            roughness={0}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            ior={1.4}
            transparent
          />
        </Sphere>
        
        {/* Inner energy core */}
        <Sphere args={[0.6, 64, 64]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#FF00FF"
            transparent
            opacity={0.4}
          />
          <pointLight color="#FF00FF" intensity={0.5} />
        </Sphere>

        {/* Outer glow ring */}
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#00D4FF"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      </Float>
      
      {/* Complex particle system */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <Float
            key={i}
            speed={particle.speed}
            rotationIntensity={0.5}
            floatIntensity={0.3}
            floatingRange={[-0.1, 0.1]}
          >
            <Sphere
              args={[particle.scale, 8, 8]}
              position={particle.position as [number, number, number]}
            >
              <meshBasicMaterial
                color={i % 3 === 0 ? "#00D4FF" : i % 3 === 1 ? "#FF00FF" : "#FFFFFF"}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
        ))}
      </group>

      {/* Holographic rings */}
      {[1.8, 2.2, 2.6].map((radius, index) => (
        <mesh key={index} position={[0, 0, 0]} rotation={[Math.PI / 2 + index * 0.2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#00D4FF"
            transparent
            opacity={0.3 - index * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const MouseTracker = ({ onMouseMove }: { onMouseMove: (position: { x: number; y: number }) => void }) => {
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      onMouseMove({ x: x * viewport.width, y: y * viewport.height });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport, onMouseMove]);

  return null;
};

const Hero3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installSnippet);
      toast.success('Install snippet copied!');
    } catch {
      toast.error('Copy failed.');
    }
  };

  const handleLiveDemo = () => {
    const el = document.getElementById('live-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background-glass to-background-overlay">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1]}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance"
          }}
          shadows
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 5, 15]} />
          
          {/* Enhanced lighting */}
          <ambientLight intensity={0.1} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2} 
            color="#00D4FF"
            castShadow
          />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#FF00FF" />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#FFFFFF" />
          
          <MouseTracker onMouseMove={setMousePosition} />
          <ChatBubbleOrb mousePosition={mousePosition} />
          
          <Environment preset="night" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
          {/* <Suspense fallback={null}>
            <EffectComposer multisampling={0} enableNormalPass={false}>
              <Bloom intensity={0.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
              <ChromaticAberration offset={[0.0005, 0.0005]} />
            </EffectComposer>
          </Suspense> */}

        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="mb-6 text-responsive-hero font-bold tracking-tight text-glow"
        >
          Drop-in chatbot,{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent inline-block">
            zero friction
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            type: "spring",
            stiffness: 80
          }}
          className="mb-12 max-w-5xl text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-4"
        >
          AnyWhere Chatbot (Chatty) is a floating, context‑aware widget you add with one script. 
          Brand it, set a system prompt, and decide how much page context the bot can use.
        </motion.p>

        <motion.div className="flex flex-col gap-4 sm:gap-6 sm:flex-row items-center justify-center px-4 sm:mx-4 lg:mx-8">
          <motion.button
            onClick={handleCopyInstall}
            className="glass hover:glass-strong interactive rounded-2xl px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold shadow-glow transition-all duration-500 hover:shadow-glow-accent hover:scale-105 active:scale-95 min-w-[200px]"
          >
            Copy Install Snippet
          </motion.button>
          <motion.button 
            onClick={handleLiveDemo}
            className="glass-strong interactive rounded-2xl border-primary/30 px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold transition-all duration-500 hover:border-accent/50 hover:scale-105 active:scale-95 min-w-[200px]"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Live Demo
          </motion.button>
        </motion.div>

        {/* Enhanced floating callouts */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1,
              type: "spring",
              stiffness: 100
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong rounded-xl p-6 transform-gpu perspective-1000"
            style={{ transform: "rotateX(5deg) rotateY(-5deg)" }}
          >
            <div className="text-sm font-medium text-primary mb-1">Shadow DOM isolation</div>
            <div className="text-xs text-muted-foreground">No CSS conflicts</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1.2,
              type: "spring",
              stiffness: 100
            }}
            className="absolute right-4 top-1/3 glass-strong rounded-xl p-6 transform-gpu"
            style={{ transform: "rotateX(-5deg) rotateY(5deg)" }}
          >
            <div className="text-sm font-medium text-primary mb-1">Session storage only</div>
            <div className="text-xs text-muted-foreground">Privacy first</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1.4,
              type: "spring",
              stiffness: 100
            }}
            className="absolute bottom-20 left-1/4 glass-strong rounded-xl p-6 transform-gpu"
            style={{ transform: "rotateX(5deg) rotateZ(-2deg)" }}
          >
            <div className="text-sm font-medium text-primary mb-1">Context toggle</div>
            <div className="text-xs text-muted-foreground">User control</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -100, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1.6,
              type: "spring",
              stiffness: 100
            }}
            className="absolute right-1/4 top-20 glass-strong rounded-xl p-6 transform-gpu"
            style={{ transform: "rotateX(-5deg) rotateZ(2deg)" }}
          >
            <div className="text-sm font-medium text-primary mb-1">Dark/Light mode</div>
            <div className="text-xs text-muted-foreground">Auto detection</div>
          </motion.div>
        </div>

        {/* Mobile floating indicators */}
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute left-4 top-1/4 glass rounded-full w-3 h-3 bg-primary animate-pulse"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute right-4 top-1/3 glass rounded-full w-3 h-3 bg-accent animate-pulse"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute bottom-32 left-8 glass rounded-full w-3 h-3 bg-primary animate-pulse"
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-gradient-mesh opacity-20"></div>
    </section>
  );
};

export default Hero3D;