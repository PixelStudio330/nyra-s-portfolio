"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Star, Cherry, Apple, ExternalLink, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const cardHover: Variants = {
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.98 }
  };

  return (
    <div className="p-6 md:p-10 space-y-12 backdrop-blur-[1px] max-w-7xl mx-auto">
      
      {/* TOP SECTION: BIO | ART | LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: BIO */}
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#90be6d] text-white px-4 py-1.5 rounded-lg font-[1000] text-base uppercase shadow-[4px_4px_0px_0px_#5a7d32]">
                Nyra Mehjabin
              </span>
              <span className="text-[#c45a5a] font-black text-2xl animate-pulse">🍎</span>
            </div>
            <div className="bg-[#c45a5a] text-white text-[10px] px-3 py-1 inline-block font-[1000] rounded-md tracking-[0.2em] uppercase border-2 border-[#8b5a2b]/20">
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

        {/* CENTER COLUMN: HERO ART */}
        <div className="md:col-span-4 flex justify-center">
          <motion.div variants={cardHover} whileHover="hover" className="relative group w-full max-w-[300px]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#ffd166]/60 -rotate-2 z-20" />
            <div className="absolute inset-0 bg-[#8b5a2b] rounded-[2.5rem] translate-x-3 translate-y-3" />
            <div className="relative aspect-square bg-[#ffd166] border-[4px] border-[#8b5a2b] rounded-[2.5rem] overflow-hidden shadow-xl">
              <img src="/img/hero1.jpg" alt="Hero Art" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-[#90be6d] text-white p-2 rounded-full border-[3px] border-[#8b5a2b] rotate-12">
                <Star size={20} fill="currentColor" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LINKS */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#90be6d] text-white px-6 py-3 rounded-2xl text-center font-[1000] border-b-[6px] border-[#5a7d32] uppercase tracking-wider rotate-1">
            Find Me Here~
          </div>
          <ul className="space-y-5 px-4 pt-2">
            {[
              { icon: <Apple size={22} />, label: "GitHub", color: "#c45a5a", url: "https://github.com/PixelStudio330" },
              { icon: <Cherry size={22} />, label: "PixelStudio", color: "#ef476f", url: "https://pixel-studio-opal.vercel.app/" },
              { icon: <Heart size={22} />, label: "Instagram", color: "#ff6b6b", url: "https://www.instagram.com/certi.fried_dora/?__pwa=1" },
            ].map((link, i) => (
              <motion.li key={i} whileHover={{ x: 5 }}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-base font-[1000] group">
                  <span style={{ color: link.color }} className="group-hover:rotate-12 transition-all">
                    {link.icon}
                  </span>
                  <span className="text-[#5d3d1e] underline decoration-dashed decoration-[#8b5a2b]/40 underline-offset-8 group-hover:text-[#c45a5a]">
                    {link.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* PROJECT PREVIEW SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pt-4">
        <motion.a 
          href="https://pixel-studio-opal.vercel.app/"
          target="_blank"
          variants={cardHover} 
          whileHover="hover" 
          className="md:col-span-7 relative block group"
        >
          <div className="relative aspect-[16/10] bg-white border-[4px] border-[#8b5a2b] rounded-[3rem] p-4 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-[#fdfcf0] rounded-[2.2rem] border-[3px] border-[#90be6d] border-dashed overflow-hidden relative">
              <iframe src="https://pixel-studio-opal.vercel.app/" className="w-[200%] h-[200%] origin-top-left scale-[0.5] border-none pointer-events-none opacity-90" loading="lazy" />
              <div className="absolute bottom-6 right-6 bg-[#c45a5a] text-white text-[10px] px-6 py-3 rounded-2xl font-[1000] border-[3px] border-[#8b5a2b] uppercase">
                Visit Studio <ExternalLink size={14} />
              </div>
            </div>
          </div>
        </motion.a>

        <div className="md:col-span-5">
          <div className="bg-[#fffdf5] border-[4px] border-[#8b5a2b] p-8 rounded-[3rem] shadow-[10px_10px_0px_0px_#8b5a2b] -rotate-1">
            <h4 className="text-2xl font-[1000] text-[#5d3d1e] uppercase mb-4 italic">PixelStudio</h4>
            <p className="text-[14px] font-[1000] text-[#5d3d1e]/80 leading-relaxed mb-6">
              "My first website testing backend skills and deploying a full-stack project! Built with Nova Zaman."
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