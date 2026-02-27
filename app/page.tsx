"use client";

import React, { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Heart, Star, Cherry, Apple, ExternalLink, Music, 
  Sparkles, Play, Pause
} from 'lucide-react';

export default function Dashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const cardHover: Variants = {
    hover: { 
      scale: 1.02, 
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    },
    tap: { scale: 0.98 }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  return (
    <div className="p-6 md:p-10 space-y-12 backdrop-blur-[1px] max-w-7xl mx-auto">
      
      <audio 
        ref={audioRef}
        src="/musics/cinnamon-girl.mp4"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: BIO */}
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#90be6d] text-white px-4 py-1.5 rounded-lg font-[1000] text-base uppercase shadow-[4px_4px_0px_0px_#5a7d32]">
                Nyra Mehjabin
              </span>
              <span className="text-[#c45a5a] font-black text-2xl drop-shadow-sm animate-pulse">🍎</span>
            </div>
            <div className="bg-[#c45a5a] text-white text-[10px] px-3 py-1 inline-block font-[1000] rounded-md tracking-[0.2em] uppercase border-2 border-[#8b5a2b]/20 shadow-sm">
              Artsy | Front-end Dev 
            </div>
          </div>
          
          <div className="text-[15px] leading-relaxed font-[1000] text-[#5d3d1e] space-y-4">
            <div className="flex items-center gap-2">
               <span className="text-xl">🥪</span> 
               <span>Site by <span className="underline decoration-[#90be6d] decoration-[3px] underline-offset-4">Nyra</span>!</span>
            </div>
            <p className="bg-[#fffdf5]/80 p-5 rounded-[2rem] border-[3px] border-[#90be6d]/40 shadow-inner italic text-[#3d5223] relative">
              "I’m a 14-year-old front-end developer based in Bangladesh. I love adding artsy touch to my projects and exploring new design trends."
              <Sparkles className="absolute -bottom-2 -right-2 text-[#ffd166]" size={24} fill="currentColor" />
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: HERO ART WITH TAPE */}
        <div className="md:col-span-4 flex justify-center pt-4">
          <motion.div variants={cardHover} whileHover="hover" className="relative group w-full max-w-[320px]">
            {/* Scrapbook Tape Effects */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#ffd166]/60 backdrop-blur-sm -rotate-2 z-20 border-x border-white/20 shadow-sm" />
            <div className="absolute -bottom-2 -right-4 w-20 h-8 bg-[#c45a5a]/40 backdrop-blur-sm rotate-12 z-20 border-x border-white/20 shadow-sm" />
            
            <div className="absolute inset-0 bg-[#8b5a2b] rounded-[2.5rem] translate-x-3 translate-y-3" />
            <div className="relative aspect-square bg-[#ffd166] border-[4px] border-[#8b5a2b] rounded-[2.5rem] overflow-hidden shadow-xl">
              <img 
                src="/img/hero1.jpg" 
                alt="Hero Art" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/lined-paper-2.png')] opacity-30 pointer-events-none" />
              <div className="absolute top-4 right-4 bg-[#90be6d] text-white p-2 rounded-full border-[3px] border-[#8b5a2b] rotate-12 shadow-lg group-hover:rotate-[30deg] transition-transform">
                <Star size={20} fill="currentColor" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LINKS */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#90be6d] text-white px-6 py-3 rounded-2xl text-center font-[1000] text-base border-b-[6px] border-[#5a7d32] shadow-lg uppercase tracking-wider rotate-1">
            Find Me Here~
          </div>
          <ul className="space-y-5 px-4 pt-2">
            {[
              { icon: <Apple size={22} strokeWidth={3} />, label: "GitHub", color: "#c45a5a", url: "https://github.com/PixelStudio330" },
              { icon: <Cherry size={22} strokeWidth={3} />, label: "PixelStudio", color: "#ef476f", url: "https://pixel-studio-opal.vercel.app/" },
              { icon: <Heart size={22} strokeWidth={3} />, label: "Instagram", color: "#ff6b6b", url: "https://www.instagram.com/certi.fried_dora/?__pwa=1" },
            ].map((link, i) => (
              <motion.li key={i} whileHover={{ x: 5 }}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-base font-[1000] group">
                  <span style={{ color: link.color }} className="group-hover:rotate-12 group-hover:scale-125 transition-all duration-300">
                    {link.icon}
                  </span>
                  <span className="text-[#5d3d1e] underline decoration-dashed decoration-[#8b5a2b]/40 decoration-2 underline-offset-8 group-hover:text-[#c45a5a] group-hover:decoration-[#c45a5a] transition-all duration-300">
                    {link.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* NOW PLAYING BAR (Fixed Linear Transition) */}
      <div className="bg-[#90be6d] border-y-[5px] border-dashed border-[#fffdf5] py-5 px-8 flex flex-col lg:flex-row items-center justify-between text-white shadow-lg gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={togglePlay}
            className="bg-white text-[#90be6d] p-3 rounded-full shadow-[0_4px_0_0_#5a7d32] active:shadow-none active:translate-y-1 transition-all"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-full">
              <Music size={20} className={isPlaying ? "animate-bounce" : ""} />
            </div>
            <span className="text-[11px] md:text-[13px] font-[1000] italic uppercase tracking-[0.2em] drop-shadow-md">
              Now Playing — Cinnamon Girl by Lana Del Rey
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-[1000] w-full lg:w-auto flex-1 max-w-md">
          <span className="opacity-80 min-w-[35px] text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 h-3 bg-[#5a7d32]/40 rounded-full overflow-hidden border-2 border-white/30 p-[2px]">
            <motion.div 
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="h-full bg-white rounded-full shadow-[0_0_10px_white]" 
            />
          </div>
          <span className="opacity-80 min-w-[35px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* BOTTOM SECTION: PROJECT PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pt-4">
        <motion.a 
          href="https://pixel-studio-opal.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          variants={cardHover} 
          whileHover="hover" 
          whileTap="tap"
          className="md:col-span-7 relative block group"
        >
          <div className="absolute inset-0 bg-[#8b5a2b]/10 rounded-[3rem] blur-2xl" />
          <div className="relative aspect-[16/10] bg-white border-[4px] border-[#8b5a2b] rounded-[3rem] p-4 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-[#fdfcf0] rounded-[2.2rem] border-[3px] border-[#90be6d] border-dashed overflow-hidden relative group/iframe">
              <iframe 
                src="https://pixel-studio-opal.vercel.app/" 
                title="Live Site Feed"
                className="w-[200%] h-[200%] origin-top-left scale-[0.5] border-none pointer-events-none opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 right-6 bg-[#c45a5a] text-white text-[10px] px-6 py-3 rounded-2xl font-[1000] flex items-center gap-3 shadow-lg transform translate-y-20 group-hover:translate-y-0 transition-all duration-500 border-[3px] border-[#8b5a2b] uppercase">
                Visit Studio <ExternalLink size={14} strokeWidth={3} />
              </div>
            </div>
          </div>
        </motion.a>

        <div className="md:col-span-5">
          <div className="bg-[#fffdf5] border-[4px] border-[#8b5a2b] p-8 rounded-[3rem] shadow-[10px_10px_0px_0px_#8b5a2b] -rotate-1">
            <div className="flex gap-4 items-center mb-5">
              <span className="bg-[#c45a5a] text-white text-[9px] font-[1000] px-3 py-1.5 rounded-lg shadow-sm border-2 border-[#8b5a2b] tracking-widest">
                FEATURED
              </span>
              <h4 className="text-2xl font-[1000] text-[#5d3d1e] uppercase tracking-tight italic">
                PixelStudio
              </h4>
            </div>
            <p className="text-[14px] font-[1000] text-[#5d3d1e]/80 leading-relaxed mb-8">
              "The first ever website where I tested my backend skills and deployed a full-stack project! Built with <span className="text-[#c45a5a]">Nova Zaman</span>. It was a massive learning experience."
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Tailwind", "React"].map(tag => (
                <span key={tag} className="text-[9px] font-black text-[#5a7d32] bg-[#90be6d]/10 px-3 py-1 rounded-full border-2 border-[#90be6d]/20">
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}