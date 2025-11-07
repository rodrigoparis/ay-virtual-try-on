import React, { useEffect, useRef } from 'react';

interface ProgressBarProps {
  progress: number;
}

const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const barRef = useRef<HTMLDivElement>(null);
  // FIX: Initialize useRef with null. The error message "Expected 1 arguments, but got 0" on line 12 was likely referring to this line.
  // useRef<number>() is problematic because its implicit initial value is `undefined`, which does not match the type `number`.
  const animationFrameRef = useRef<number | null>(null);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const startProgress = currentProgressRef.current;
    const endProgress = progress;
    const duration = 750; // ms for ultra-smooth animation
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const timeFraction = Math.min(elapsedTime / duration, 1);
      const easedFraction = easeOutQuart(timeFraction);

      const newProgress = startProgress + (endProgress - startProgress) * easedFraction;
      currentProgressRef.current = newProgress;
      
      if (barRef.current) {
        barRef.current.style.width = `${newProgress}%`;
      }
      
      if (timeFraction < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress]);

  return (
    <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
      <div
        ref={barRef}
        className="h-1.5 rounded-full bg-white transition-all duration-300"
        style={{
            backgroundImage: 'linear-gradient(90deg, #666 0%, #fff 50%, #666 100%)',
        }}
      ></div>
    </div>
  );
};
