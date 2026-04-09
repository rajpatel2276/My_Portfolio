"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scan, Database, Activity, Target } from "lucide-react";

const PIPELINE_STAGES = [
  {
    id: "input",
    label: "01_Signal_Acquisition",
    desc: "Preprocessing raw tensors: Normalization & Resizing (224x224x3).",
    icon: <Scan size={16} />,
    status: "PROCESSED",
    color: "text-blue-400"
  },
  {
    id: "features",
    label: "02_Feature_Extraction",
    desc: "Conv-kernels extracting spatial hierarchies and leaf/edge patterns.",
    icon: <Database size={16} />,
    status: "EXTRACTING",
    color: "text-primary"
  },
  {
    id: "vector",
    label: "03_Latent_Space",
    desc: "Flattening spatial maps into high-dimensional feature vectors.",
    icon: <Activity size={16} />,
    status: "PENDING",
    color: "text-yellow-500"
  },
  {
    id: "output",
    label: "04_Softmax_Inference",
    desc: "Probabilistic distribution across 38 crop disease categories.",
    icon: <Target size={16} />,
    status: "PENDING",
    color: "text-red-500"
  }
];

export default function NeuralTrace() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full bg-black/40 border border-white/10 p-8 backdrop-blur-md relative overflow-hidden group">
      {/* Background Aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,255,65,0.02)_0%,_transparent_70%)]" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {PIPELINE_STAGES.map((stage, i) => (
          <motion.div
            key={stage.id}
            onMouseEnter={() => setHovered(stage.id)}
            onMouseLeave={() => setHovered(null)}
            className={`p-6 border transition-all duration-500 ${
              hovered === stage.id ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(0,255,65,0.1)]" : "border-white/5 bg-white/[0.02]"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`${stage.color} p-2 bg-black border border-white/10`}>
                {stage.icon}
              </div>
              <span className="text-[8px] font-mono text-slate-600 tracking-widest uppercase">
                Step_0{i + 1}
              </span>
            </div>

            <h4 className="text-[10px] font-mono text-white mb-3 uppercase tracking-widest">
              {stage.label}
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed font-sans min-h-[40px]">
              {stage.desc}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <div className="h-[1px] flex-grow bg-white/5 mr-4" />
              <span className={`text-[8px] font-mono uppercase ${stage.status === 'PROCESSED' ? 'text-primary' : 'text-slate-700'}`}>
                {stage.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connection Line Logic */}
      <div className="hidden md:block absolute top-[50%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
    </div>
  );
}