"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Heart, MessageSquare, User, Sparkles, Smartphone, Navigation, CheckCircle2, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  }

  return (
    <div className="p-6 md:p-12 space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-[4px] border-dashed border-[#8b5a2b] pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#ef476f] text-white p-2 rounded-xl rotate-6 shadow-lg border-[3px] border-[#8b5a2b]">
              <Mail size={24} strokeWidth={3} />
            </div>
            <h2 className="text-4xl font-[1000] text-[#5d3d1e] uppercase tracking-tighter">Get In Touch</h2>
          </div>
          <p className="text-sm font-[1000] text-[#4a632a] uppercase tracking-[0.15em] pl-1">
            Official Inquiries for <span className="text-[#c45a5a]">PixelStudio</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, rotate: -5 }}
                onSubmit={handleSubmit}
                className="bg-white border-[4px] border-[#8b5a2b] rounded-[3rem] p-8 shadow-[8px_8px_0px_0px_#8b5a2b] space-y-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/lined-paper-2.png')] opacity-20 pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                   <div className="space-y-2">
                     <label className="flex items-center gap-2 text-xs font-[1000] text-[#5d3d1e] uppercase ml-2">
                       <User size={14} /> Name
                     </label>
                     <input name="name" required placeholder="YOUR NAME" className="w-full bg-[#fdfcf0] border-[3px] border-[#8b5a2b] rounded-2xl px-5 py-3 font-black text-[#5d3d1e] outline-none placeholder:text-[#8b5a2b]/30 focus:ring-4 ring-[#90be6d]/20 transition-all" />
                   </div>

                   <div className="space-y-2">
                     <label className="flex items-center gap-2 text-xs font-[1000] text-[#5d3d1e] uppercase ml-2">
                       <Mail size={14} /> Email
                     </label>
                     <input name="email" required type="email" placeholder="YOUR EMAIL" className="w-full bg-[#fdfcf0] border-[3px] border-[#8b5a2b] rounded-2xl px-5 py-3 font-black text-[#5d3d1e] outline-none placeholder:text-[#8b5a2b]/30 focus:ring-4 ring-[#90be6d]/20 transition-all" />
                   </div>

                   <div className="space-y-2">
                     <label className="flex items-center gap-2 text-xs font-[1000] text-[#5d3d1e] uppercase ml-2">
                       <MessageSquare size={14} /> Message
                     </label>
                     <textarea name="message" required rows={4} placeholder="THE MESSAGE..." className="w-full bg-[#fdfcf0] border-[3px] border-[#8b5a2b] rounded-[2rem] px-5 py-4 font-black text-[#5d3d1e] outline-none placeholder:text-[#8b5a2b]/30 resize-none focus:ring-4 ring-[#90be6d]/20 transition-all" />
                   </div>
                </div>

                <motion.button 
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full ${status === 'error' ? 'bg-orange-500' : 'bg-[#c45a5a]'} text-white font-[1000] uppercase py-5 rounded-2xl border-[4px] border-[#8b5a2b] shadow-[0_6px_0px_0px_#8b5a2b] transition-all flex items-center justify-center gap-3 disabled:opacity-70`}
                >
                  {status === 'sending' ? "SEALING ENVELOPE..." : status === 'error' ? "TRY AGAIN?" : "SEND TO NYRA"} 
                  <Send size={20} strokeWidth={3} className={status === 'sending' ? "animate-pulse" : ""} />
                </motion.button>
                
                {status === 'error' && (
                  <p className="text-center text-xs font-black text-orange-600 uppercase tracking-tighter">
                    Something went wrong! Please check your connection.
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
                animate={{ scale: 1, opacity: 1, rotate: -2 }}
                className="bg-[#fdfcf0] border-[4px] border-[#8b5a2b] rounded-[2rem] p-12 shadow-[12px_12px_0px_0px_#8b5a2b] flex flex-col items-center justify-center text-center space-y-6 min-h-[450px] relative overflow-hidden"
              >
                <div className="absolute top-8 right-8 w-24 h-24 border-[3px] border-dashed border-[#c45a5a] rounded-full flex items-center justify-center rotate-12 opacity-40">
                    <span className="text-[#c45a5a] font-[1000] text-[10px] uppercase text-center leading-none">Pixel Studio<br/>BD 2026</span>
                </div>

                <div className="bg-[#90be6d] p-4 rounded-full text-white shadow-lg">
                    <CheckCircle2 size={48} strokeWidth={3} />
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-3xl font-[1000] text-[#5d3d1e] uppercase italic">Message Sealed!</h3>
                    <p className="text-[#8b5a2b] font-bold text-sm uppercase tracking-widest max-w-[250px] mx-auto">
                        It's currently flying across the digital clouds to my inbox.
                    </p>
                </div>

                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[#c45a5a] font-[1000] uppercase text-xs border-b-2 border-[#c45a5a] hover:pb-1 transition-all"
                >
                  Write another one?
                </button>

                <motion.div 
                  animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute bottom-6 left-6 text-[#8b5a2b]/20"
                >
                    <Navigation size={40} fill="currentColor" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE INFO BOXES */}
        <div className="lg:col-span-5 space-y-8">
             <div className="bg-[#90be6d] border-[4px] border-[#8b5a2b] rounded-[2.5rem] p-7 shadow-lg rotate-1 relative group overflow-hidden text-white">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <Sparkles size={100} />
                </div>
                <h3 className="text-xl font-[1000] uppercase mb-2 flex items-center gap-2">
                    <Smartphone size={20} strokeWidth={3} /> PixelStudio
                </h3>
                <p className="text-sm font-black italic opacity-90 leading-relaxed">
                  Built with care by Nyra & Nova. Bringing artsy ideas to the web. Let's make something iconic!
                </p>
             </div>

             {/* INSTAGRAM QUICK LINK BOX */}
             <div className="bg-[#fffdf5] border-[4px] border-[#8b5a2b] rounded-[2.5rem] p-7 shadow-md -rotate-1 space-y-4">
                <h3 className="text-lg font-[1000] text-[#5d3d1e] uppercase">Quick Response</h3>
                <p className="text-xs font-bold text-[#8b5a2b] uppercase leading-relaxed">
                  I usually reply within 24 hours. If it's urgent, feel free to poke me on Instagram!
                </p>
                
                <motion.a 
                  href="https://www.instagram.com/certi.fried_dora/?__pwa=1" // REPLACE THIS WITH YOUR LINK
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 w-full bg-[#ef476f] text-white py-3 rounded-2xl border-[3px] border-[#8b5a2b] shadow-[0_4px_0px_0px_#8b5a2b] font-[1000] text-xs uppercase transition-all"
                >
                  <Instagram size={16} strokeWidth={3} />
                  Slide into DMs
                </motion.a>
             </div>

             {/* LOOT BOX / DECORATIVE */}
             <div className="bg-[#ffd166] border-[4px] border-[#8b5a2b] rounded-[2.5rem] p-6 shadow-md rotate-1 flex items-center gap-4">
                <div className="bg-white p-2 rounded-full border-2 border-[#8b5a2b]">
                  <Heart size={20} fill="#ef476f" className="text-[#ef476f]" />
                </div>
                <span className="text-[10px] font-[1000] text-[#5d3d1e] uppercase tracking-tighter">
                  Always open for <br/> creative collaborations
                </span>
             </div>
        </div>
      </div>
    </div>
  );
}