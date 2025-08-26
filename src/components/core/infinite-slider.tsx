import React, { useRef, useEffect } from 'react';

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  reverse?: boolean;
  speed?: number;
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  gap = 24,
  reverse = false,
  speed = 20
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    
    if (!slider || !container) return;

    const containerWidth = container.offsetWidth;
    const sliderWidth = slider.offsetWidth;
    
    // Clone the children for seamless loop
    const clone = slider.cloneNode(true) as HTMLElement;
    container.appendChild(clone);

    let animationId: number;
    let position = 0;

    const animate = () => {
      if (reverse) {
        position += speed / 60; // 60fps
        if (position >= sliderWidth + gap) {
          position = 0;
        }
      } else {
        position -= speed / 60; // 60fps
        if (position <= -(sliderWidth + gap)) {
          position = 0;
        }
      }

      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [gap, reverse, speed]);

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={containerRef}
        className="flex"
        style={{ gap: `${gap}px` }}
      >
        <div 
          ref={sliderRef}
          className="flex items-center"
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}; 