"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Heart, Tag, MousePointer2, Sparkles, Users } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Honey Haze",
      description: "A cozy bakery management system and storefront. Built with a full-stack approach to handle delicious treats and orders with a sweet touch.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      link: "https://honey-haze.vercel.app/",
      accent: "#FFB347",
      items: ["Strawberry Donut - $5.00", "Pudding Magic - $4.50"],
      emoji: "🍯",
      type: "Personal Project"
    },
    {
      id: 2,
      title: "PixelStudio",
      description: "Our official creative agency HQ. A collaboration with Nova Zaman (The respected CEO of PixelStudio) for building high-end, artsy digital solutions for global clients.",
      tags: ["Next.js", "TypeScript", "Tailwind", "React", "Vercel"],
      link: "https://pixel-studio-opal.vercel.app/",
      accent: "#729d4d", // Slightly darker green for better visibility
      items: ["Custom Web Design - Inquire", "Full-Stack Dev - Official"],
      emoji: "🎨",
      type: "Agency / Collaboration"
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-12">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4 border-b-[3px] border-dashed border-[#8b5a2b] pb-6">
        <div className="bg-[#c45a5a] text-white p-3 rounded-xl rotate-3 shadow-md">
          <Star fill="currentColor" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-[900] text-[#5d3d1e] uppercase tracking-tighter italic">The Archive</h2>
          <p className="text-sm font-black text-[#4a632a] uppercase tracking-widest">Hand-crafted code & design</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            whileHover={{ y: -8 }}
            className="relative group col-span-1"
          >
            {/* Shadow Sticker Background */}
            <div className="absolute inset-0 bg-[#8b5a2b] rounded-[2.5rem] translate-x-3 translate-y-3 opacity-20" />
            
            <div className="relative bg-white border-[4px] border-[#8b5a2b] rounded-[2.5rem] p-7 shadow-md overflow-hidden h-full flex flex-col">
              
              {/* RATIONAL LIVE FEED CONTAINER */}
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full aspect-video bg-[#fdfcf0] rounded-[1.5rem] border-[3px] border-dashed mb-6 overflow-hidden relative group/iframe cursor-alias shadow-inner"
                style={{ borderColor: project.accent }}
              >
                <iframe 
                  src={project.link} 
                  title={`${project.title} Live Preview`}
                  className="absolute top-0 left-0 w-[1280px] h-[720px] origin-top-left scale-[0.25] md:scale-[0.3] border-none pointer-events-none transition-opacity duration-500 group-hover/iframe:opacity-70"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                <div 
                  className="absolute bottom-3 right-3 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: project.accent }}
                >
                  <MousePointer2 size={10} /> Visit Live Site
                </div>
              </a>

              {/* PROJECT TYPE TAG */}
              <div className="flex justify-between items-center mb-4">
                <div 
                  className="text-white px-4 py-1.5 rounded-full text-[10px] font-black border-[2.5px] border-[#8b5a2b] -rotate-1 shadow-md uppercase flex items-center gap-2"
                  style={{ backgroundColor: project.accent }}
                >
                  {project.id === 2 ? <Users size={12} /> : <Sparkles size={12} />}
                  {project.type}
                </div>
                <Heart size={22} className="text-[#c45a5a]" fill="#c45a5a" />
              </div>

              <h3 className="text-2xl font-[1000] text-[#5d3d1e] mb-2 uppercase tracking-tight">
                {project.title} {project.emoji}
              </h3>
              
              <p className="text-[15px] font-bold text-[#5d3d1e]/90 leading-snug mb-6 italic">
                {project.description}
              </p>

              {/* MINI DATABASE LIST */}
              <div className="bg-[#fdfcf0] border-[3px] border-[#8b5a2b] rounded-2xl p-5 mb-6 border-dashed bg-opacity-50">
                <span className="text-[11px] font-[1000] uppercase text-[#8b5a2b] block mb-3 tracking-[0.1em]">
                  📁 Project Manifest / Status:
                </span>
                <ul className="space-y-3">
                  {project.items?.map((item, idx) => (
                    <li key={idx} className="text-[13px] font-black text-[#3d5223] flex justify-between items-center">
                      <span className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: project.accent }} />
                        {item.split(' - ')[0]}
                      </span>
                      <span className="text-[#c45a5a] bg-[#c45a5a]/10 px-2.5 py-1 rounded-md border-2 border-[#c45a5a]/20">
                        {item.split(' - ')[1]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TECH STACK TAGS */}
              <div className="mt-auto flex items-center justify-between pt-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-black bg-[#8b5a2b] text-white px-2.5 py-1 rounded shadow-sm uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-[#c45a5a] text-white rounded-2xl hover:scale-110 transition-transform shadow-lg border-[3px] border-[#8b5a2b]"
                >
                  <ExternalLink size={20} strokeWidth={3} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER DECORATION */}
      <div className="flex justify-center py-10">
        <div className="bg-[#f2ead3] px-10 py-4 rounded-2xl border-[3px] border-[#8b5a2b] text-sm font-[1000] text-[#8b5a2b] uppercase tracking-[0.3em] shadow-xl rotate-1">
          🌸 All Systems Operational 🌸
        </div>
      </div>
    </div>
  );
}