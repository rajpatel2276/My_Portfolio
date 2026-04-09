"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Activity, Mail, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { icon: <Terminal size={14} />, label: "Hero", href: "#" },
    { icon: <ChevronRight size={14} />, label: "Logic", href: "#optimization" },
    { icon: <Cpu size={14} />, label: "Sandbox", href: "#sandbox" },
    { icon: <Database size={14} />, label: "Archives", href: "#projects" },
    { icon: <Activity size={14} />, label: "Logs", href: "#logs" },
    { icon: <Mail size={14} />, label: "Connect", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-fit"
    >
      <div className="flex items-center gap-6 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* System Clock */}
        <div className="hidden md:flex items-center gap-2 border-r border-white/10 pr-6 mr-2 font-mono text-[10px] text-primary tracking-tighter">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {time}
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-5">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group"
            >
              {item.icon}
              <span className="text-[10px] font-mono uppercase tracking-widest hidden lg:block group-hover:block transition-all">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}