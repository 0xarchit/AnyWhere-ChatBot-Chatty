import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const moveCursor = () => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;
      const dotDiffX = mouseX - dotX;
      const dotDiffY = mouseY - dotY;
      
      cursorX += diffX * 0.1;
      cursorY += diffY * 0.1;
      dotX += dotDiffX * 0.15;
      dotY += dotDiffY * 0.15;
      
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      cursorDot.style.left = dotX + "px";
      cursorDot.style.top = dotY + "px";
      
      requestAnimationFrame(moveCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Hide native cursor globally
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Add hover effects for interactive elements - use more specific selectors
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll("button, a, .interactive, [role='button'], input, textarea, select");
      interactiveElements.forEach(el => {
        (el as HTMLElement).style.cursor = "none";
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Initial setup
    addInteractiveListeners();

    // Observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      addInteractiveListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Start the animation
    moveCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      
      // Restore cursor
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[99999] transition-all duration-300 ease-out ${
          isHovering 
            ? 'w-12 h-12 border-2 border-accent bg-accent/10' 
            : 'w-8 h-8 border-2 border-primary bg-transparent'
        } ${
          isClicking ? 'scale-75' : 'scale-100'
        } rounded-full -translate-x-1/2 -translate-y-1/2`}
        style={{
          boxShadow: isHovering 
            ? '0 0 30px hsl(var(--accent) / 0.6), inset 0 0 20px hsl(var(--accent) / 0.1)' 
            : '0 0 20px hsl(var(--primary) / 0.4)'
        }}
      />
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[99998] transition-all duration-150 ease-out ${
          isHovering ? 'w-1 h-1 bg-accent' : 'w-0.5 h-0.5 bg-primary'
        } ${
          isClicking ? 'scale-150' : 'scale-100'
        } rounded-full -translate-x-1/2 -translate-y-1/2`}
        style={{
          boxShadow: '0 0 10px currentColor'
        }}
      />
    </>
  );
};

export default CustomCursor;