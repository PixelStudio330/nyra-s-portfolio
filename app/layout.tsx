"use client";
import "./globals.css";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import { X, Music, Play, Pause, SkipForward, SkipBack, Disc, Heart, ListMusic, RotateCcw, Volume2 } from 'lucide-react';

const tracks = [
  { id: 1, title: "Touch", artist: "KATSEYE", src: "/musics/touch.mp4" },
  { id: 2, title: "Soda Pop", artist: "Saja Boys", src: "/musics/soda-pop.mp4" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'More Projects', path: '/projects' },
    { name: 'Contact Me', path: '/contact' },
  ];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLibrary, setShowLibrary] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 🎚️ Audio Context Refs for Boosting
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const currentTrack = tracks[trackIndex];

  // Initialize Volume Booster
  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      // Create the "Amplifier" setup
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new AudioContextClass();
      const gainNode = ctx.createGain();
      const source = ctx.createMediaElementSource(audioRef.current);

      // Boost volume by 2.5x (Adjust this number if it's still too quiet!)
      gainNode.gain.value = 2.5; 

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      audioContextRef.current = ctx;
      gainNodeRef.current = gainNode;
      sourceRef.current = source;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Resume context (browsers block audio until a click happens)
      audioContextRef.current?.resume();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex]);

  const togglePlay = () => {
    if (audioRef.current && currentTrack.src) {
      audioContextRef.current?.resume(); // Ensure booster is active
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play interrupted"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fdfcf0] pt-12 pb-20 px-4 md:px-8 font-serif selection:bg-[#ff9a9e] relative text-[#83B2DE] overflow-x-hidden">
        
        <div className="fixed inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundColor: '#fdfcf0',
            backgroundImage: `radial-gradient(#90be6d 3px, transparent 3px)`,
            backgroundSize: '30px 30px' 
          }} 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-4xl mx-auto border-[3px] border-[#8b5a2b] rounded-[2rem] shadow-[0px_15px_0px_0px_rgba(139,90,43,0.1)] bg-[#fffdf5] flex flex-col overflow-hidden h-fit mb-10"
        >
          <div className="absolute inset-0 z-0 pointer-events-none" 
               style={{ backgroundImage: "url('/img/body2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

          <div className="relative z-10 flex flex-col w-full h-full">
            <Header />
            <nav className="flex bg-[#f2ead3] px-6 gap-1 pt-2 border-b-[3px] border-[#8b5a2b] shrink-0">
              {tabs.map((tab) => (
                <Link key={tab.path} href={tab.path}>
                  <div className={`px-6 py-2 rounded-t-xl border-t-2 border-x-2 border-[#8b5a2b] transition-all text-xs font-bold flex items-center gap-3 cursor-pointer ${
                    pathname === tab.path ? 'bg-[#fffdf5] -mb-[3px] z-10 text-[#5d3d1e]' : 'bg-[#e8dec0] opacity-70 hover:opacity-100 text-[#8b5a2b]'
                  }`}>
                    {tab.name} <X size={10} className="opacity-30" />
                  </div>
                </Link>
              ))}
            </nav>
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </motion.div>

        {/* 🎵 MINI FLOATING PLAYER & LIBRARY */}
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
          
          <audio 
            ref={audioRef} 
            key={currentTrack.id}
            src={currentTrack.src} 
            crossOrigin="anonymous" // Needed for the booster to work!
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={() => setTrackIndex((prev) => (prev + 1) % tracks.length)}
          />

          <AnimatePresence>
            {showLibrary && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="bg-[#fffdf5] border-[3px] border-[#8b5a2b] rounded-2xl p-4 shadow-[6px_6px_0px_0px_#8b5a2b] w-72 mb-2"
              >
                <div className="flex items-center justify-between mb-3 border-b-2 border-[#8b5a2b]/10 pb-2">
                  <h3 className="text-[10px] font-black text-[#8b5a2b] uppercase tracking-widest flex items-center gap-2">
                    <Music size={12} /> Music Library
                  </h3>
                  <button onClick={() => setShowLibrary(false)} className="text-[#8b5a2b] hover:rotate-90 transition-transform">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {tracks.map((track, index) => (
                    <button 
                      key={track.id}
                      onClick={() => { setTrackIndex(index); setIsPlaying(true); }}
                      className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between group/item ${
                        trackIndex === index ? "bg-[#90be6d] text-white" : "text-[#5d3d1e] hover:bg-[#90be6d] hover:text-white"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold truncate">{track.title}</span>
                        <span className={`text-[9px] font-medium opacity-80 truncate ${trackIndex === index ? "text-white" : "text-[#8b5a2b]"}`}>
                          {track.artist}
                        </span>
                      </div>
                      {trackIndex === index && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-3 ml-2 shrink-0">
                          <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                          <motion.div animate={{ height: [12, 4, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
                        </div>
                      ) : (
                        <Play size={10} className="opacity-0 group-hover/item:opacity-100 ml-2 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="bg-[#fffdf5] border-[3px] border-[#8b5a2b] rounded-2xl p-3 shadow-[6px_6px_0px_0px_#8b5a2b] flex items-center gap-4 relative group">
            
            <button 
                onClick={() => setShowLibrary(!showLibrary)}
                className={`absolute -top-3 -left-3 p-2.5 rounded-full border-[3px] border-[#8b5a2b] shadow-md z-20 transition-all hover:scale-110 active:scale-95 pointer-events-auto ${showLibrary ? 'bg-[#c45a5a] text-white' : 'bg-[#ffd166] text-[#8b5a2b]'}`}
              >
                <ListMusic size={16} strokeWidth={3} />
            </button>

            {/* Volume Boost Indicator Icon */}
            <div className="absolute -bottom-2 -right-2 bg-[#90be6d] text-white p-1 rounded-full border-2 border-[#fffdf5] shadow-sm">
              <Volume2 size={10} />
            </div>

            <div className={`relative flex-shrink-0 w-10 h-10 bg-[#8b5a2b] rounded-full flex items-center justify-center border-2 border-[#fffdf5] shadow-sm ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: '3s' }}>
              <Disc size={20} className="text-white/40" />
              <div className="absolute w-2 h-2 bg-[#fffdf5] rounded-full" />
            </div>

            <div className="flex flex-col min-w-[130px] max-w-[150px]">
              <div className="flex flex-col leading-tight">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#5d3d1e] truncate">{currentTrack.title}</span>
                    {isPlaying && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}><Heart size={8} fill="#c45a5a" className="text-[#c45a5a]" /></motion.div>}
                 </div>
                 <span className="text-[9px] font-bold text-[#8b5a2b] opacity-80 truncate">
                   {currentTrack.artist}
                 </span>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)} className="text-[#8b5a2b] hover:text-[#90be6d] transition-colors">
                  <SkipBack size={14} fill="currentColor" />
                </button>
                <button onClick={handleRestart} className="text-[#8b5a2b] hover:text-[#83B2DE] transition-colors">
                  <RotateCcw size={14} strokeWidth={3} />
                </button>
                <button onClick={togglePlay} className="text-[#c45a5a] hover:scale-110 transition-transform px-1">
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                <button onClick={() => setTrackIndex((prev) => (prev + 1) % tracks.length)} className="text-[#8b5a2b] hover:text-[#90be6d] transition-colors">
                  <SkipForward size={14} fill="currentColor" />
                </button>
              </div>
            </div>

            <div className="w-1.5 h-10 bg-[#8b5a2b]/10 rounded-full overflow-hidden flex flex-col-reverse">
              <motion.div animate={{ height: `${progress}%` }} className="w-full bg-[#90be6d]" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}