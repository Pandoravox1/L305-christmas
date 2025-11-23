import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';
import { TARGET_DATE } from '../constants';

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): CountdownTime => {
    const difference = +new Date(TARGET_DATE) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col gap-2 flex-1 min-w-[70px]">
      <div className="h-16 sm:h-20 bg-primary/40 backdrop-blur-md border border-secondary/30 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-2xl sm:text-4xl font-bold text-cream font-mono">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-cream/70 uppercase tracking-wider text-center font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-secondary/10 mt-[-80px] z-10 relative shadow-2xl">
      <h3 className="text-center text-secondary text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6">
        Perayaan Dimulai Dalam
      </h3>
      <div className="flex gap-3 sm:gap-6 justify-between">
        <TimeUnit value={timeLeft.days} label="Hari" />
        <TimeUnit value={timeLeft.hours} label="Jam" />
        <TimeUnit value={timeLeft.minutes} label="Menit" />
        <TimeUnit value={timeLeft.seconds} label="Detik" />
      </div>
    </div>
  );
};

export default Countdown;
