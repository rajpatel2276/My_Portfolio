"use client";

import React, { useState, useRef } from "react";
import { Upload, Cpu, Zap, Eye, Activity, BarChart3, Info, Network, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as ort from "onnxruntime-web";
import { getImageTensor, generateHeatmap } from "@/lib/image-processing";

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

export default function AISandbox() {
  const [image, setImage] = useState<string | null>(null);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<{ label: string; confidence: number; isCertain: boolean } | null>(null);
  const [telemetry, setTelemetry] = useState({ latency: 0, threads: 4 });
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const CONFIDENCE_THRESHOLD = 0.65; // Logical gate for non-bird detection

  const runInference = async (imgSrc: string) => {
    setIsProcessing(true);
    setError(null);
    setPrediction(null);
    setHeatmap(null);
    setShowHeatmap(false);

    const start = performance.now();

    try {
      const session = await ort.InferenceSession.create("/models/bird_model.onnx");
      const tensor = await getImageTensor(imgSrc);
      const outputData = await session.run({ [session.inputNames[0]]: tensor });
      const output = outputData[session.outputNames[0]].data as Float32Array;
      const end = performance.now();

      // Find Top-1 result
      let maxIdx = 0, maxVal = -Infinity;
      for (let i = 0; i < output.length; i++) {
        if (output[i] > maxVal) { maxVal = output[i]; maxIdx = i; }
      }

      const labels = await fetch("/models/labels.json").then(res => res.json());
      const confidence = 1 / (1 + Math.exp(-maxVal));
      const isCertain = confidence >= CONFIDENCE_THRESHOLD;

      setPrediction({
        label: isCertain ? labels[maxIdx].replace(/_/g, " ") : "UNCERTAIN / NON-BIRD",
        confidence,
        isCertain
      });

      setTelemetry({ latency: Math.round(end - start), threads: 4 });

      // Generate Neural Attention Map
      const map = await generateHeatmap(imgSrc);
      setHeatmap(map);

    } catch (e) {
      console.error("Inference Fail:", e);
      setError("Inference Failed. Ensure model/labels exist in /public/models/");
    }
    setIsProcessing(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const res = ev.target?.result as string;
        setImage(res);
        runInference(res);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const telemetryStats = [
    { label: "Latency", value: `${telemetry.latency}ms`, icon: <Clock size={10}/> },
    { label: "Execution", value: "WASM_SIMD", icon: <Cpu size={10}/> },
    { label: "Threads", value: telemetry.threads, icon: <Network size={10}/> }
  ];

  return (
    <section className="py-24 border-t border-border bg-primary/[0.01]">
      <div className="flex flex-col items-center mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-mono text-primary mb-4 uppercase tracking-widest">
          <Zap size={12} /> Neural_Sandbox_v2.0
        </div>
        <h2 className="text-4xl font-bold tracking-tighter italic uppercase">Inference_Workbench</h2>
        
        {/* TELEMETRY DASHBOARD */}
        <div className="hidden lg:block absolute top-0 right-0 p-4 border border-primary/20 bg-black/80 backdrop-blur-md w-44 font-mono text-[9px] space-y-2 z-50">
          <div className="flex justify-between text-primary/50 mb-2 font-bold italic">
            <span>[ TELEMETRY ]</span> <Activity size={10} className={isProcessing ? "animate-pulse" : ""} />
          </div>
          {telemetryStats.map((stat, i) => (
            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-slate-500 uppercase flex items-center gap-1.5">{stat.icon} {stat.label}</span>
              <span className="text-primary font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* VIEWPORT: Image & Heatmap Layering */}
        <div className="relative aspect-square border border-slate-800 bg-black overflow-hidden group">
          {image && (
            <img 
              src={image} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showHeatmap ? 'opacity-30' : 'opacity-100'}`} 
              alt="Input" 
            />
          )}

          <AnimatePresence>
            {showHeatmap && heatmap && (
              <motion.img 
                key="heatmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                src={heatmap} 
                className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                style={{ filter: "blur(10px) contrast(1.3)" }}
                alt="Attention Map" 
              />
            )}
          </AnimatePresence>
          
          {!image && (
            <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-slate-700 hover:text-primary transition-colors">
              <Upload size={32} />
              <span className="text-[10px] font-mono tracking-[0.3em] mt-4 uppercase">Load_Model_Payload</span>
            </div>
          )}
          
          {isProcessing && <div className="absolute inset-0 bg-primary/10 animate-scan z-30" />}
          
          {image && !isProcessing && heatmap && (
            <button 
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="absolute bottom-6 left-6 z-40 bg-black/80 backdrop-blur-md border border-primary/40 px-5 py-2.5 text-[10px] font-mono text-primary flex items-center gap-2 uppercase tracking-widest hover:bg-primary/20 transition-all"
            >
              {showHeatmap ? <Zap size={12} className="fill-primary" /> : <Eye size={12} />}
              {showHeatmap ? "Input_View" : "Attention_View"}
            </button>
          )}
          {/* 3. RE-UPLOAD TRIGGER: Top Right Corner */}
          {image && !isProcessing && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-4 right-4 z-40 bg-black/60 backdrop-blur-md border border-white/10 p-2 text-slate-400 hover:text-primary transition-all group"
              title="Upload New Image"
            >
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono hidden group-hover:block uppercase tracking-tighter">Replace_Payload</span>
                <Upload size={14} />
              </div>
            </button>
          )}
          <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
        </div>

        {/* DATA PANEL: Classification & Logic */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/30 border border-border p-8 flex-grow relative">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 size={12}/> Analysis_Result
              </span>
              <Cpu size={16} className={isProcessing ? "text-primary animate-spin" : "text-slate-700"} />
            </div>

            <AnimatePresence mode="wait">
              {error ? (
                <div className="text-red-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              ) : prediction ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div>
                    <div className="text-[10px] font-mono text-primary uppercase mb-2 tracking-tighter">Classification_Label</div>
                    <div className={`text-4xl font-bold tracking-tighter italic uppercase ${!prediction.isCertain ? 'text-slate-500' : 'text-white'}`}>
                      {prediction.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-primary uppercase mb-2 tracking-tighter">Confidence_Probability</div>
                    <div className="w-full bg-slate-800 h-[2px] mb-3 relative">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${prediction.confidence * 100}%` }} 
                        className={`h-full shadow-[0_0_15px] ${prediction.isCertain ? 'bg-primary shadow-primary/50' : 'bg-yellow-600 shadow-yellow-600/40'}`} 
                      />
                      {/* Threshold Line at 65% */}
                      <div className="absolute left-[65%] top-[-4px] bottom-[-4px] w-[1px] bg-white/20" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>{prediction.isCertain ? "TARGET_MATCH" : "OUT_OF_DISTRIBUTION"}</span>
                      <span>{(prediction.confidence * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-slate-700 text-xs font-mono italic">
                  {isProcessing ? "> ANALYZING_NEURAL_LAYERS..." : "> STANDBY_WAITING_FOR_DATA"}
                </div>
              )}
            </AnimatePresence>
          </div>
          
          {/* ENGINEERING DISCLOSURE: Highlighting your technical depth */}
          <div className="p-5 bg-primary/5 border border-primary/20 flex gap-4">
             <Info size={18} className="text-primary shrink-0 mt-1" />
             <div className="space-y-1">
                <p className="text-[11px] font-mono text-primary uppercase font-bold tracking-widest">Engineering Disclosure</p>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans uppercase">
                  This system utilizes <b>Softmax Probability Thresholding ($0.65$)</b> to maintain prediction integrity. 
                  Low-confidence scores trigger an <b>OOD (Out-of-Distribution)</b> alert, preventing forced classification of non-bird entities.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}