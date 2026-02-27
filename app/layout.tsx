"use client";
import "./globals.css";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import { X } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'More Projects', path: '/projects' },
    { name: 'Contact Me', path: '/contact' },
  ];

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fdfcf0] py-12 px-4 md:px-8 font-serif selection:bg-[#ff9a9e] relative text-[#83B2DE] overflow-x-hidden">
        
        {/* 🟢 THE FLOOR: Green Polka Dots underneath everything */}
        <div 
          className="fixed inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundColor: '#fdfcf0',
            backgroundImage: `radial-gradient(#90be6d 3px, transparent 3px)`, // Slightly larger dots
            backgroundSize: '30px 30px' // Spaced out grid
          }} 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-4xl mx-auto border-[3px] border-[#8b5a2b] rounded-[2rem] shadow-[0px_15px_0px_0px_rgba(139,90,43,0.1)] bg-[#fffdf5] flex flex-col overflow-hidden h-fit"
        >
          {/* 🌟 CARD BG: Crisp and unblurred pattern inside the window */}
          <div className="absolute inset-0 z-0 pointer-events-none" 
               style={{ 
                 backgroundImage: "url('/img/body2.jpg')", 
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 opacity: 1 // Full clarity, no blur
               }} />

          {/* Interface elements z-indexed above the card bg */}
          <div className="relative z-10 flex flex-col w-full h-full">
            <Header />

            <nav className="flex bg-[#f2ead3] px-6 gap-1 pt-2 border-b-[3px] border-[#8b5a2b] shrink-0">
              {tabs.map((tab) => (
                <Link key={tab.path} href={tab.path}>
                  <div className={`px-6 py-2 rounded-t-xl border-t-2 border-x-2 border-[#8b5a2b] transition-all text-xs font-bold flex items-center gap-3 cursor-pointer ${
                    pathname === tab.path ? 'bg-[#fffdf5] -mb-[3px] z-10' : 'bg-[#e8dec0] opacity-70 hover:opacity-100'
                  }`}>
                    {tab.name} <X size={10} className="opacity-30" />
                  </div>
                </Link>
              ))}
            </nav>

            <div className="flex-1">
              {children}
            </div>

            <Footer />
          </div>
        </motion.div>
      </body>
    </html>
  );
}