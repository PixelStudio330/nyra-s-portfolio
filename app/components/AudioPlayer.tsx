"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export const tracks = [
  { id: 1, title: "Touch", artist: "KATSEYE", src: "/musics/touch.mp4" },
  { id: 2, title: "Upcoming Track", artist: "Stay Tuned", src: "" },
];

export default function AudioPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[trackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current && currentTrack.src) {
      audioRef.current.play().catch(() => {});
    }
  }, [trackIndex]);

  const togglePlay = () => {
    if (audioRef.current && currentTrack.src) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => setTrackIndex((prev) => (prev + 1) % tracks.length);
  const prevTrack = () => setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100]">
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={nextTrack}
      />
      
      <div className="bg-[#90be6d] border-t-[5px] border-dashed border-[#fffdf5] py-4 px-8 flex flex-col lg:flex-row items-center justify-between text-white shadow-[0_-10px_20px_rgba(0,0,0,0.1)] gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button onClick={prevTrack} className="hover:scale-110 active:scale-95 transition-all"><SkipBack size={22} fill="currentColor" /></button>
            <button onClick={togglePlay} className="bg-white text-[#90be6d] p-2.5 rounded-full shadow-[0_4px_0_0_#5a7d32] active:translate-y-1 active:shadow-none transition-all">
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={nextTrack} className="hover:scale-110 active:scale-95 transition-all"><SkipForward size={22} fill="currentColor" /></button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={trackIndex} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full hidden sm:block">
                <Music size={18} className={isPlaying ? "animate-bounce" : ""} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest opacity-80 font-black">Playing</span>
                <span className="text-[12px] font-[1000] italic leading-none">{currentTrack.title} — {currentTrack.artist}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 text-xs font-[1000] w-full lg:w-auto flex-1 max-w-md">
          <span className="opacity-80 w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 h-2.5 bg-[#5a7d32]/40 rounded-full overflow-hidden border-2 border-white/30 p-[1px]">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-white rounded-full" />
          </div>
          <span className="opacity-80 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}