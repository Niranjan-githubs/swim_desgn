import React, { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface PoolCursorTrailProps {
  children: React.ReactNode;
  className?: string;
}

const PoolCursorTrail: React.FC<PoolCursorTrailProps> = ({ children, className = '' }) => {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePosition({ x, y });
      
      // Create new trail point every few pixels
      if (Math.random() < 0.3) { // Reduce frequency
        const newTrail: TrailPoint = {
          id: trailIdRef.current++,
          x,
          y,
          timestamp: Date.now(),
        };
        
        setTrails(prev => [...prev.slice(-5), newTrail]); // Keep only last 5
      }
    };

    // Add to window instead of container for better tracking
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 1500));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* Water Ripple Effects */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none animate-ping"
          style={{
            left: trail.x - 12,
            top: trail.y - 12,
            zIndex: 100,
            animation: `ripple 1.5s ease-out forwards`,
          }}
        >
          {/* Outer ripple */}
          <div className="w-6 h-6 border-2 border-sky-400/60 rounded-full animate-pulse" />
        </div>
      ))}

      {/* Floating Pool Images */}
      {trails.slice(-2).map((trail, index) => (
        <div
          key={`image-${trail.id}`}
          className="fixed pointer-events-none rounded-xl overflow-hidden shadow-xl border border-white/30 opacity-0"
          style={{
            left: trail.x - 60 + (index * 15),
            top: trail.y - 45 - (index * 10),
            zIndex: 50 + index,
            width: '120px',
            height: '90px',
            animation: `fadeInUp 1s ease-out forwards`,
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <img 
            src={poolImages[index % poolImages.length]}
            alt="Pool Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
        </div>
      ))}

      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-[200] w-3 h-3 bg-sky-400 rounded-full shadow-lg border border-white/50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

// Pool images for the trail effect
const poolImages = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&h=600",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&h=600", 
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=600",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&h=600",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&h=600"
];

export default PoolCursorTrail;