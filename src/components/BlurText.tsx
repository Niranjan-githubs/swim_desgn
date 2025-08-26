import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  gradient?: boolean;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.35,
  gradient = false,
  onAnimationComplete
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    threshold,
    rootMargin,
    once: true
  });

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = direction === 'top' 
    ? { filter: 'blur(10px)', opacity: 0, y: -50 }
    : { filter: 'blur(10px)', opacity: 0, y: 50 };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: direction === 'top' ? 5 : -5
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0
    }
  ];

  const handleAnimationComplete = (index: number) => {
    if (index === elements.length - 1 && !animationComplete && onAnimationComplete) {
      setAnimationComplete(true);
      onAnimationComplete();
    }
  };

  return (
    <div ref={ref} className={`blur-text ${className} flex flex-wrap justify-center`}>
      {elements.map((segment, index) => (
        <motion.span
          key={`${index}-${segment}`}
          initial={defaultFrom}
          animate={isInView ? defaultTo : defaultFrom}
          transition={{
            duration: stepDuration * 2,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity'
          }}
          className={gradient ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent' : ''}
          onAnimationComplete={() => handleAnimationComplete(index)}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </div>
  );
};

export default BlurText; 