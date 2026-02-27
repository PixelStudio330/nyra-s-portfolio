"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Universal Nav Items (Matching Dashboard)
  const navItems = [
    { name: "Entry", path: "/" },
    { name: "Library", path: "/library" },
    { name: "Dreams", path: "#" },
    { name: "Void", path: "#" }
  ];

  const stories = [
    { id: 1, title: "The Girl with Paper Teeth", author: "Void_Walker", reads: "1.2k", category: "MANIFESTATION", description: "She smiled, and it sounded like a forest fire. Every word she spoke left a dusting of ash on the floorboards." },
    { id: 2, title: "Static Dreams", author: "St4rLigh7", reads: "890", category: "SIGNAL_INTERFERENCE", description: "The radio hasn't been plugged in for years, yet it screams names I haven't heard since the summer of '94." },
    { id: 3, title: "Under the Floorboards", author: "The_Basement", reads: "5.4k", category: "HABITATION", description: "Don't look down. They hate being watched while they work. They are building something out of the things you've lost." },
    { id: 4, title: "Mirror Logic", author: "Reflexion", reads: "2.1k", category: "DYSKINESIA", description: "Your reflection is running three seconds behind. It's waiting for you to blink so it can catch up." },
  ];

  useEffect(() => setIsMounted(true), []);

  const filteredStories = stories.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isMounted) return null;

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/felt.png')] bg-[#F6F3EE] font-mono overflow-x-hidden relative">
      {/* GLOBAL CRT OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      <motion.div 
        initial={{ opacity: 0, x: 50, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-6xl bg-[#9FC7AA] border-[12px] border-[#5B2D29] rounded-[3rem] shadow-[20px_20px_0px_0px_#5B2D29] overflow-hidden flex flex-col relative z-10"
      >
        {/* UNIVERSAL NAVIGATION BAR */}
        <nav className="bg-[#5B2D29] p-4 flex flex-wrap justify-between items-center gap-6 border-b-4 border-dashed border-[#9FC7AA]/20">
          <div className="flex gap-6">
            {navItems.map((item, i) => (
              <Link key={item.name} href={item.path}>
                <motion.div 
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  className={`font-black text-[10px] uppercase tracking-widest cursor-pointer transition-colors ${item.name === "Library" ? "text-white underline underline-offset-4" : "text-[#9FC7AA]"}`}
                >
                  <span className="opacity-40">0{i+1}</span> {item.name}
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="hidden md:block text-[#9FC7AA] font-black text-[10px] uppercase tracking-widest opacity-30">
            SYSTEM_ACCESS_GRANTED // NO_EXIT
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-8 md:p-12 bg-mint-chip min-h-[750px]">
          {/* LIBRARY HEADER */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b-8 border-[#5B2D29] pb-8"
          >
            <div>
              <h2 className="text-7xl font-black italic text-cream-base uppercase tracking-tighter leading-none mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">The_Library</h2>
              <p className="text-[#5B2D29]/60 font-black text-xs uppercase tracking-[0.2em]">Sector_07 // Secure_Records // Logged_In</p>
            </div>
            <div className="w-full md:w-72">
              <input 
                type="text" 
                placeholder="SEARCH_FILES..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-4 border-[#5B2D29] p-3 rounded-xl font-black text-[#5B2D29] placeholder:opacity-30 focus:outline-none shadow-[4px_4px_0px_0px_#5B2D29] italic"
              />
            </div>
          </motion.div>

          {/* GRID OF ARCHIVES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, rotate: 1, transition: { duration: 0.2 } }}
                  key={story.id} 
                  className="bg-white border-4 border-[#5B2D29] rounded-[2rem] overflow-hidden shadow-[10px_10px_0px_0px_#5B2D29] flex flex-col group"
                >
                  <div className="p-6 border-b-4 border-[#5B2D29] bg-[#5B2D29] text-[#9FC7AA] flex justify-between items-center group-hover:bg-[#9FC7AA] group-hover:text-[#5B2D29] transition-colors">
                    <span className="text-[10px] font-black tracking-widest uppercase">{story.category}</span>
                    <span className="text-[10px] font-black opacity-60">ID_{story.id.toString().padStart(4, '0')}</span>
                  </div>
                  
                  <div className="p-8 flex-1">
                    <h3 className="text-3xl font-black text-[#5B2D29] italic uppercase mb-4 leading-none tracking-tighter">{story.title}</h3>
                    <p className="text-[#5B2D29] text-base font-bold leading-relaxed mb-6 opacity-80">{story.description}</p>
                    
                    <div className="flex flex-wrap gap-4 items-center mt-auto">
                      <div className="bg-[#9FC7AA]/30 px-3 py-1 rounded-full text-[#5B2D29] text-[9px] font-black uppercase border border-[#5B2D29]/10">By: {story.author}</div>
                      <div className="bg-[#5B2D29] px-3 py-1 rounded-full text-[#9FC7AA] text-[9px] font-black uppercase">Reads: {story.reads}</div>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ backgroundColor: "#9FC7AA", color: "#5B2D29" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#5B2D29] text-[#9FC7AA] py-4 font-black uppercase text-xs transition-all border-t-4 border-[#5B2D29] tracking-widest"
                  >
                    Open_Archive_Entry_
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredStories.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 opacity-30 font-black uppercase italic text-2xl">
              File_Not_Found_In_This_Dimension
            </motion.div>
          )}
        </div>

        {/* PERSISTENT FOOTER TICKER */}
        <div className="bg-[#5B2D29] py-4 mt-auto border-t-4 border-dashed border-[#9FC7AA]/20 overflow-hidden">
          <div className="flex whitespace-nowrap">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }} 
              className="flex gap-4 pr-4"
            >
              {[...Array(12)].map((_, i) => (
                <span key={i} className="text-[#9FC7AA] font-black text-[10px] uppercase tracking-[0.5em]">
                  The archives are watching you ★ ST4RLIGH7_OS ★&nbsp;
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}