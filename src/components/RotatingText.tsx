import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  transition?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: 'sync' | 'wait';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words' | 'lines';
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  gradient?: boolean;
  gradientColors?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts = [],
  transition = {
    type: 'spring',
    damping: 25,
    stiffness: 300
  },
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  animatePresenceMode = 'wait',
  animatePresenceInitial = false,
  rotationInterval = 2000,
  staggerDuration = 0,
  staggerFrom = 'first',
  loop = true,
  auto = true,
  splitBy = 'characters',
  onNext,
  mainClassName = '',
  splitLevelClassName = '',
  elementLevelClassName = '',
  gradient = false,
  gradientColors = 'from-cyan-400 via-blue-400 to-sky-400'
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const segmenter = new (Intl as any).Segmenter('en', { granularity: 'grapheme' });
      return [...segmenter.segment(text)].map(({ segment }: any) => segment);
    }
    return [...text];
  };

  const getElements = (): Array<{ characters: string[]; needsSpace: boolean }> => {
    const currentText = texts[currentTextIndex];

    switch (splitBy) {
      case 'characters': {
        const words = currentText.split(' ');
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1
        }));
      }
      case 'words': {
        const words = currentText.split(' ');
        return words.map((word, i) => ({
          characters: [word],
          needsSpace: i !== words.length - 1
        }));
      }
      case 'lines': {
        const lines = currentText.split('\n');
        return lines.map((line, i) => ({
          characters: [line],
          needsSpace: i !== lines.length - 1
        }));
      }
      default: {
        const parts = currentText.split(splitBy!);
        return parts.map((part, i) => ({
          characters: [part],
          needsSpace: i !== parts.length - 1
        }));
      }
    }
  };

  const getStaggerDelay = (index: number, totalChars: number): number => {
    switch (staggerFrom) {
      case 'first':
        return index * staggerDuration;
      case 'last':
        return (totalChars - 1 - index) * staggerDuration;
      case 'center': {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      case 'random': {
        const randomIndex = Math.floor(Math.random() * totalChars);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      default:
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
    }
  };

  const handleIndexChange = (newIndex: number): void => {
    setCurrentTextIndex(newIndex);
    onNext?.(newIndex);
  };

  const next = (): void => {
    const isAtEnd = currentTextIndex === texts.length - 1;
    const nextIndex = isAtEnd ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;

    handleIndexChange(nextIndex);
  };

  const cleanupInterval = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = (): void => {
    if (auto) {
      intervalRef.current = setInterval(next, rotationInterval);
    }
  };

  useEffect(() => {
    cleanupInterval();
    startInterval();
    return cleanupInterval;
  }, [auto, rotationInterval, currentTextIndex]);

  const elements = getElements();
  const totalChars = elements.reduce((sum, word) => sum + word.characters.length, 0);

  return (
    <motion.span
      className={`flex flex-wrap whitespace-pre-wrap relative justify-center items-center ${mainClassName}`}
      transition={transition}
      layout
    >
      <span className="sr-only">
        {texts[currentTextIndex]}
      </span>

      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={`${splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative justify-center'}`}
          aria-hidden="true"
          layout
        >
          {elements.map((wordObj, wordIndex) => (
            <span key={wordIndex} className={`inline-flex ${splitLevelClassName}`}>
              {wordObj.characters.map((char, charIndex) => {
                const globalIndex = elements
                  .slice(0, wordIndex)
                  .reduce((sum, word) => sum + word.characters.length, 0) + charIndex;
                
                return (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(globalIndex, totalChars)
                    }}
                                         className={`inline-block ${elementLevelClassName} ${
                       gradient ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` : ''
                     }`}
                  >
                    {char}
                  </motion.span>
                );
              })}
              {wordObj.needsSpace && <span className="whitespace-pre"></span>}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export default RotatingText; 