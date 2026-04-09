"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Zap, Info, ChevronRight } from "lucide-react";

// The Cost Function: J(theta) = theta^2
const f = (x: number) => Math.pow(x, 2);
// The Gradient: dJ/dtheta = 2 * theta
const df = (x: number) => 2 * x;

export default function OptimizationPlayground() {
  const [theta, setTheta] = useState(-4); // Starting position
  const [lr, setLr] = useState(0.1);      // Learning Rate (Alpha)
  const [history, setHistory] = useState<number[]>([-4]);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);

  const step = useCallback(() => {
    setTheta((prev) => {
      const gradient = df(prev);
      const nextTheta = prev - lr * gradient;
      setHistory((h) => [...h, nextTheta]);
      return nextTheta;
    });
    setIteration((i) => i + 1);
  }, [lr]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && iteration < 50) {
      timer = setTimeout(step, 100);
    } else {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, iteration, step]);

  const reset = () => {
    setTheta(-4);
    setHistory([-4]);
    setIteration(0);
    setIsRunning(false);
  };

  // Map math coordinates (-5 to 5) to SVG viewbox (0 to 100)
  const mapX = (x: number) => (x + 5) * 10;
  const mapY = (y: number) => 80 - (y * 3); // Scale Y for better visual

  // Generate the curve path
  const curvePoints = Array.from({ length: 101 }, (_, i) => {
    const x = -5 + i * 0.1;
    return `${mapX(x)},${mapY(f(x))}`;
  }).join(" ");

  return (
    <section className="py-24 border-t border-border bg-black/20">
      <div className="flex flex-col items-center mb-12">
        <div className="text-[10px] font-mono text-primary border border-primary/20 px-3 py-1 mb-4 uppercase tracking-[0.3em]">
          Core_Optimization_Logic
        </div>
        <h2 className="text-4xl font-bold tracking-tighter italic uppercase">Gradient_Descent_Visualizer</h2>
        <p className="text-slate-500 text-sm mt-4 font-mono">
          Function: $J(\theta) = \theta^2$ | Optimization: Stochastic Gradient Descent
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT: THE INTERACTIVE GRAPH */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-border p-8 relative overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-auto overflow-visible">
            {/* Axis */}
            <line x1="0" y1="80" x2="100" y2="80" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="80" stroke="#1e293b" strokeWidth="0.5" />
            
            {/* The Cost Curve */}
            <polyline points={curvePoints} fill="none" stroke="#334155" strokeWidth="1" />
            
            {/* Optimization Path */}
            <polyline 
              points={history.map(x => `${mapX(x)},${mapY(f(x))}`).join(" ")}
              fill="none" stroke="#00ff41" strokeWidth="0.5" strokeDasharray="2"
              className="opacity-50"
            />

            {/* The Weight (Ball) */}
            <motion.circle
              cx={mapX(theta)}
              cy={mapY(f(theta))}
              r="2"
              fill="#00ff41"
              className="shadow-[0_0_10px_#00ff41]"
            />
          </svg>
          
          <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-500 uppercase">
            Convergence_Path_Active
          </div>
        </div>

        {/* RIGHT: HYPERPARAMETER CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 border border-border bg-slate-900/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono text-primary uppercase">Hyperparameters</span>
              <Zap size={14} className="text-primary" />
            </div>

            <div className="space-y-8">
              {/* Learning Rate Slider */}
              <div>
                <div className="flex justify-between mb-3 text-[10px] font-mono uppercase">
                  <span>Learning_Rate ($\alpha$)</span>
                  <span className="text-primary">{lr.toFixed(3)}</span>
                </div>
                <input 
                  type="range" min="0.01" max="1.1" step="0.01" 
                  value={lr} onChange={(e) => setLr(parseFloat(e.target.value))}
                  className="w-full accent-primary bg-slate-800 h-1 appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-[8px] font-mono text-slate-500">
                  <span>CONVERGENT</span>
                  <span>OVERSHOOTING</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <div className="text-[8px] font-mono text-slate-500 uppercase">Current_$\theta$</div>
                  <div className="text-xl font-bold font-mono tracking-tighter">{theta.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono text-slate-500 uppercase">Iteration</div>
                  <div className="text-xl font-bold font-mono tracking-tighter">{iteration}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex-grow bg-primary text-black py-3 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  {isRunning ? "Stop_Engine" : <><Play size={12} fill="black" /> Start_Descent</>}
                </button>
                <button 
                  onClick={reset}
                  className="px-4 border border-border text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Logic Note */}
          <div className="p-4 bg-primary/5 border border-primary/20 flex gap-3">
            <Info size={16} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-mono text-primary uppercase font-bold mb-1">Theoretical Insight</p>
              <p className="text-[9px] text-slate-400 leading-relaxed font-sans uppercase">
                If $\alpha 1.0$, the step exceeds the distance to the minimum, causing <b>Divergence</b>. If $\alpha$ is too small, convergence is mathematically certain but computationally expensive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}