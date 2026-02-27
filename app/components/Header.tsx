"use client";
import React from 'react';
import { RotateCw, Search, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="z-30">
      {/* --- BROWSER HEADER (Pink Polka-dot) --- */}
      <header 
        className="bg-[#FFE6ED] p-3 flex items-center justify-between border-b-[3px] border-[#8b5a2b]"
        style={{ 
          backgroundImage: 'radial-gradient(#F7CAD5 2px, transparent 2px)', 
          backgroundSize: '10px 10px' 
        }}
      >
        <div className="flex items-center gap-2 px-4 py-1 bg-white/60 rounded-full border-2 border-[#fffdf5] backdrop-blur-sm">
          <div className="w-5 h-5 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[10px] shadow-sm">🌸</div>
          <span className="text-xs font-bold tracking-tight text-[#CF7486] uppercase">https://st4rligh7.dev</span>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-md bg-white/40 border-2 border-white/60 flex items-center justify-center text-[#CF7486] text-xs font-bold">-</div>
          <div className="w-6 h-6 rounded-md bg-white/40 border-2 border-white/60 flex items-center justify-center text-[#CF7486] text-xs font-bold">□</div>
          <div className="w-6 h-6 rounded-md bg-[#ff6b6b] border-2 border-[#8b5a2b] flex items-center justify-center text-white text-xs">
            <X size={12}/>
          </div>
        </div>
      </header>

      {/* --- URL BAR (Red Pattern) --- */}
      <div 
        className="bg-[#c45a5a] p-2 flex items-center gap-3 border-b-[3px] border-[#8b5a2b]"
        style={{ backgroundImage: 'radial-gradient(#d66d6d 2px, transparent 2px)', backgroundSize: '12px 12px' }}
      >
        <div className="flex gap-2 text-white/80 ml-2"><RotateCw size={18} /></div>
        <div className="flex-1 bg-[#fffdf5] border-2 border-[#8b5a2b] rounded-md px-4 py-1.5 text-sm font-medium text-[#8b5a2b] flex justify-between items-center shadow-inner">
          <span>st4rligh7.world{pathname === "/" ? "" : pathname}</span>
          <Search size={16} className="opacity-50" />
        </div>
        <div className="text-white/40 text-[10px] pr-2 font-mono hidden md:block">by st4rligh7</div>
      </div>
    </div>
  );
}