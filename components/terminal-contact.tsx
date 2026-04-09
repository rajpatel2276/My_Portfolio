"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight, ShieldCheck } from "lucide-react";

type LogEntry = {
  type: "system" | "user" | "error" | "success" | "warning";
  text: string;
};

export default function TerminalContact() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: "system", text: "SSH_SESSION_ESTABLISHED // TARGET: RAJ_PATEL_V1.6" },
    { type: "system", text: "ENCRYPTION: AES-256-GCM. TYPE 'HELP' TO START." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    const newLogs: LogEntry[] = [...logs, { type: "user", text: `> ${cmd}` }];

    switch (cleanCmd) {
      case "help":
        newLogs.push({ type: "system", text: "CORE_COMMANDS: [ABOUT], [PROJECTS], [SOCIALS], [CONTACT], [CLEAR]" });
        newLogs.push({ type: "warning", text: "EXPERIMENTAL: [YOLO], [SUDO]" });
        break;
      case "about":
        newLogs.push({ type: "system", text: "SUBJECT: RAJ PATEL. ROLE: ML RESEARCHER @ KNIT SULTANPUR. B.TECH '27." });
        break;
      case "socials":
        newLogs.push({ type: "success", text: "GITHUB: https://github.com/rajpatel2276" });
        newLogs.push({ type: "success", text: "LINKEDIN: https://www.linkedin.com/in/rajpatel59/" });
        break;
      case "contact":
        newLogs.push({ type: "success", text: "MAILTO: rajpatel2276.@gmail.com // DIRECT_LINE_OPEN" });
        break;
      case "yolo":
        newLogs.push({ type: "warning", text: "RUNNING_OBJECT_DETECTION_DIAGNOSTIC..." });
        newLogs.push({ type: "system", text: "DETECTED: RECRUITER (99.8%), ENGINEER (94.2%), INNOVATOR (100%)" });
        break;
      case "sudo":
        newLogs.push({ type: "error", text: "PERMISSION_DENIED: SUBJECT 'VISITOR' IS NOT IN THE SUDOERS FILE. THIS INCIDENT WILL BE REPORTED." });
        break;
      case "clear":
        setLogs([{ type: "system", text: "BUFFER_FLUSHED. STANDBY..." }]);
        return;
      default:
        newLogs.push({ type: "error", text: `ERR: COMMAND '${cleanCmd}' UNKNOWN. TYPE 'HELP'.` });
    }
    setLogs(newLogs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    processCommand(input);
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-mono text-xs md:text-sm bg-[#050505] border border-white/10 shadow-2xl overflow-hidden mb-20">
      {/* Terminal Bar */}
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-primary" />
          <span className="text-[9px] uppercase tracking-widest text-slate-500">terminal@raj_lab:~</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-2 bg-black/20 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className={`
            ${log.type === "system" ? "text-slate-500" : ""}
            ${log.type === "user" ? "text-white font-bold" : ""}
            ${log.type === "error" ? "text-red-500 italic" : ""}
            ${log.type === "success" ? "text-primary" : ""}
            ${log.type === "warning" ? "text-yellow-500" : ""}
          `}>
            {log.text}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
          <ChevronRight size={14} className="text-primary animate-pulse" />
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-grow text-white focus:ring-0 p-0"
            placeholder="SYSTEM_AWAITING_INPUT..."
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}