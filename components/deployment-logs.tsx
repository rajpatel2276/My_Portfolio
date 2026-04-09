"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./reveal";
import { CheckCircle2, Activity, Terminal as TerminalIcon, GraduationCap } from "lucide-react";

const logs = [
  {
    timestamp: "2026-03-PRESENT",
    status: "ACTIVE",
    icon: <Activity size={16} className="text-primary" />,
    title: "Advanced ML Research & Optimization",
    location: "Self-Directed / Sultanpur",
    description: "Focusing on model quantization (ONNX) and edge deployment for real-time vision systems. Implementing Transformers from first principles."
  },
  {
    timestamp: "2026-01-28",
    status: "SUCCESS",
    icon: <CheckCircle2 size={16} className="text-primary" />,
    title: "HCL GUVI Buildathon",
    location: "National Hackathon",
    description: "Developed an AI-Generated Voice Detection system. Focused on feature extraction from audio signals and binary classification of synthetic speech."
  },
  {
    timestamp: "2023-PRESENT",
    status: "INITIALIZING",
    icon: <GraduationCap size={16} className="text-primary" />,
    title: "B.Tech in Computer Science & Engineering",
    location: "KNIT Sultanpur",
    description: "Expected Graduation 2027. Core focus on Algorithms, Data Structures, and Deep Learning architectures."
  },
  {
    timestamp: "2022-05-15",
    status: "STABLE",
    icon: <TerminalIcon size={16} className="text-primary" />,
    title: "Higher Secondary Certificate",
    location: "Varanasi, UP",
    description: "Completed Science Stream with a focus on Mathematics and Physics foundations."
  }
];

export default function DeploymentLogs() {
  const containerRef = useRef<HTMLDivElement>(null);

  // LOGIC: Track scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // LOGIC: Map scroll to line length (0 to 1)
  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="flex flex-col items-start mb-16">
        <h2 className="text-3xl font-bold tracking-tighter italic flex items-center gap-3">
          <TerminalIcon size={24} className="text-primary" />
          DEPLOYMENT_LOGS
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent mt-4" />
      </div>

      <div className="relative space-y-12 ml-4">
        
        {/* THE ANIMATED DATA LINE */}
        {/* Background (Dim) Line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-slate-800" />
        
        {/* Foreground (Glowing) Animated Line */}
        <motion.div 
          style={{ scaleY: pathLength }}
          className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-primary origin-top shadow-[0_0_10px_rgba(0,255,65,0.5)] z-20"
        />

        {logs.map((log, index) => (
          <Reveal key={index}>
            <div className="relative pl-10 group">
              {/* The node point */}
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-black border border-slate-700 flex items-center justify-center z-30 group-hover:border-primary/50 transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'ACTIVE' ? 'bg-primary animate-pulse' : 'bg-slate-600'}`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <div className="font-mono text-[10px] text-slate-500 mb-1">{log.timestamp}</div>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[9px] font-bold tracking-widest border ${
                    log.status === 'ACTIVE' ? 'border-primary/50 text-primary bg-primary/5' : 'border-slate-800 text-slate-500'
                  }`}>
                    {log.icon}
                    {log.status}
                  </div>
                </div>

                <div className="md:col-span-9 bg-white/[0.01] border border-border/50 p-6 group-hover:bg-white/[0.03] transition-all group-hover:border-primary/20">
                  <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                    {log.title}
                  </h3>
                  <div className="text-[10px] font-mono text-primary/60 mb-4 uppercase tracking-wider">
                    {log.location}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-sans">
                    {log.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}