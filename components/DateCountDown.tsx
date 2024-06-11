import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const remaining = target.getTime() - now.getTime();

      if (remaining <= 0) {
        setTimeRemaining(null);
        clearInterval(interval);
        return;
      }

      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeRemaining) {
    return (
      <div className=" font-bold">Completed !</div>
    );
  }

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-center p-1">
        <span className=" text-black-1 rounded-md">
          {days}
        </span>
        <span className="mt-2 text-black-1">D</span>
      </div>
      <div className="flex flex-col items-center p-1 ">
        <span className=" text-black-1 rounded-md">
          {hours}
        </span>
        <span className="mt-2 text-black-1">H</span>
      </div>
      <div className="flex flex-col items-centerp-1 p-1">
        <span className="text-black-1 rounded-md">
          {minutes}
        </span>
        <span className="mt-2 text-black-1">M</span>
      </div>
      <div className="flex flex-col items-center p-1">
        <span
          className={`text-black-1 rounded-md countdown-seconds ${
            seconds % 2 === 0 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {seconds}
        </span>
        <span className="mt-2 text-black-1">S</span>
      </div>
    </div>
  );
};

export default Countdown;