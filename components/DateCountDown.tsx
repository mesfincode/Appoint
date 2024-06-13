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
      <div className=" font-bold"></div>
    );
  }

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-center p-1">
        <div className='flex justify-center items-center'>
        <TimeComp num={days} />

        <p>:</p>
        </div>
        <span className="mt-2 text-black-1">D</span>
      </div>
     
      <div className="flex flex-col items-center p-1 ">
      <div className='flex justify-center items-center'>
        <TimeComp num={hours} />

        <p>:</p>
        </div>
        <span className="mt-2 text-black-1">H</span>
      </div>
      <div className="flex flex-col items-centerp-1 p-1">
      <div className='flex justify-center items-center'>
        <TimeComp num={minutes} />

        <p>:</p>
        </div>
        <span className="mt-2 text-black-1">M</span>
      </div>
      <div className="flex flex-col items-center p-1">
        <SecondComp num={seconds} />
        <span className="mt-2 text-black-1">S</span>
      </div>
    </div>
  );
};
const TimeComp = ({ num }: { num: number }) => {
  return <div className=" text-black-1 rounded-md border-2 border-gray-200 px-2 py-1">
    <h1 className='font-bold'>{num}</h1>
  </div>
}
const SecondComp = ({ num }: { num: number }) => {
  return <div className={`text-black-1 rounded-md border-2 border-gray-200 px-2 py-1  `}>
    <h1 className={`rounded-md font-bold countdown-seconds text-black-1`}>{num}</h1>
  </div>
}
export default Countdown;