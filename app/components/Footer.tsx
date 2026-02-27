"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer 
      className="bg-[#b35e5e] h-10 border-t-[3px] border-[#8b5a2b] flex items-center justify-center"
      style={{ backgroundImage: 'radial-gradient(#d66d6d 2px, transparent 2px)', backgroundSize: '12px 12px' }}
    >
      <div className="text-[10px] font-bold text-white/60 tracking-[0.5em] uppercase">
        Made with Art // 2026
      </div>
    </footer>
  );
}