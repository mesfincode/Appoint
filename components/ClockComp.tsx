"use client"
import { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { Button } from './ui/button';
import { SpeakerIcon } from 'lucide-react'
import Image from 'next/image';

const ClockComp = () => {
  const [value, setValue] = useState(new Date());
  // const [audio] = useState(new Audio('/sound/wall-clock-tik-sound.mp3'));
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudio(new Audio("/sound/wall-clock-tik-sound.mp3"));
      const interval = setInterval(() =>{
        // audio.play();
        setValue(new Date())
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }
   
  }, []);
  const handleClick = () => {

    if(audio != null){
      if(play){
        audio.pause()
        setPlay(false)
      }else{
        setPlay(true)
        audio.play();
      }
    
      
    }
   
  };
  return (
    <div>
    
      <div className='flex justify-start items-baseline flex-wrap gap-3'>
      <Clock value={value} size={250} />

      <div className={` cursor-pointer  ${play?"bg-primary-2 rounded-full p-1":""}`}>
      <Image src="/icons/Speaker_Icon.svg" onClick={handleClick} width={30} height={30} alt='speaker_icon' />
      </div>
      </div>
    </div>
  );
}

export default ClockComp
