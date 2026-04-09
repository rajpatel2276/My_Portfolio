"use client";

import { Button } from "@/components/ui/button";
import { Terminal, FileText, ChevronRight, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-start justify-center min-h-[85vh] py-20">
      {/* 1. Status Pill - Keeping the high-tech MONO look */}
      <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 rounded-full mb-10 tracking-[0.3em] uppercase">
        <Activity size={12} className="animate-pulse" />
        <span>Status: B.Tech_CSE // Class_of_2027</span>
      </div>
      
      {/* 2. Main Heading - Restoring the Large, Italic, Tracking-Tighter style */}
      <h1 className="text-6xl md:text-9xl font-bold tracking-tighter italic uppercase leading-[0.85] mb-8">
        RAJ <span className="text-primary">PATEL</span> <br />
        <span className="text-slate-300 font-light text-4xl md:text-6xl tracking-normal not-italic opacity-80">
          ML Research & Dev
        </span>
      </h1>

      {/* 3. Description - Clean, readable, professional */}
      <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed mb-12 font-sans">
        Bridging the gap between <span className="text-white underline decoration-primary/30">mathematical theory</span> and 
        <span className="text-white underline decoration-primary/30"> scalable production</span>. 
        Specializing in Neural Architectures, Computer Vision, and Edge AI deployment.
      </p>

      {/* 4. Action HUD */}
      <div className="flex flex-wrap gap-4">
        {/* Explore Projects */}
        <a href="#projects">
          <Button size="lg" className="bg-primary text-black font-bold rounded-none hover:bg-primary/90 flex gap-2 tracking-[0.2em] uppercase text-[10px]">
            EXPLORE_LOGS <ChevronRight size={16} />
          </Button>
        </a>

        {/* View Resume */}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline" className="border-white/10 text-white font-bold rounded-none hover:bg-white/5 flex gap-2 tracking-[0.2em] uppercase text-[10px]">
            <FileText size={16} /> DOWNLOAD_CV
          </Button>
        </a>
      </div>

      {/* 5. Sub-Meta Data - Reinforcing the "Dev" aesthetic */}
      <div className="mt-20 flex gap-12 border-t border-white/5 pt-10 w-full max-w-2xl">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest underline decoration-primary/20">University</span>
          <span className="text-xs text-slate-400 font-mono">KNIT_Sultanpur // UP</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest underline decoration-primary/20">Specialization</span>
          <span className="text-xs text-slate-400 font-mono">Deep_Learning // CV</span>
        </div>
      </div>
    </section>
  );
}