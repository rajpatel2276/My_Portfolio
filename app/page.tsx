import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import { Reveal } from "@/components/reveal";
import NeuralTrace from "@/components/neural-trace";
import AISandbox from "@/components/ai-sandbox";
import ProjectBento from "@/components/project-bento";
import DeploymentLogs from "@/components/deployment-logs";
import TerminalContact from "@/components/terminal-contact";
import OptimizationPlayground from "@/components/optimization-playground";
import ParticleBackground from "@/components/particle-background";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden bg-transparent">
      
      {/* 1. DYNAMIC NEURAL FIELD (The "Particles") */}
      <ParticleBackground />

      <Navbar />
      
      {/* 2. HERO SECTION */}
      <div id="hero" className="max-w-6xl mx-auto px-6 pt-24 relative z-10">
        <Reveal>
          <Hero />
        </Reveal>
      </div>

      {/* 3. SYSTEM STATUS MARQUEE */}
      <div className="w-full border-y border-white/5 bg-primary/[0.03] backdrop-blur-sm py-6 overflow-hidden whitespace-nowrap mb-24 relative z-10">
        <div className="flex animate-marquee gap-12 text-[10px] font-mono uppercase tracking-[0.5em] text-primary/50">
          <span>Optimizing Inference Latency</span>
          <span>•</span>
          <span>Training CNN Architectures</span>
          <span>•</span>
          <span>Implementing First-Principles ML</span>
          <span>•</span>
          <span>YOLO Object Detection Active</span>
          <span>•</span>
          <span>Optimizing Inference Latency</span>
          <span>•</span>
          <span>Training CNN Architectures</span>
        </div>
      </div>

      {/* 4. TECHNICAL SPECIFICATIONS */}
      <div className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { label: "Languages", value: "Python / C++ / TS" },
            { label: "Frameworks", value: "PyTorch / Next.js" },
            { label: "Architecture", value: "YOLO / ResNet / CNN" },
            { label: "Deployment", value: "ONNX / Cuda / Vercel" },
          ].map((spec, i) => (
            <Reveal key={i}>
              <div className="border border-white/10 p-6 bg-black/40 backdrop-blur-md hover:border-primary/30 transition-all h-full group">
                <p className="text-[10px] font-mono text-primary/60 mb-2 group-hover:text-primary transition-colors">
                  [{spec.label}]
                </p>
                <p className="text-sm font-bold tracking-tight uppercase">{spec.value}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* MATHEMATICAL CORE */}
        <div id="math" className="mt-24">
        <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-4 w-[2px] bg-primary" />
          <h2 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">
            [ INFERENCE_PIPELINE_TRACE ]
          </h2>
        </div>
        <p className="text-slate-500 text-xs italic font-mono max-w-xl">
          Visualizing the transformation of raw pixels into diagnostic intelligence across the architecture.
        </p>
      </div>
      <Reveal>
        <NeuralTrace />
      </Reveal>
      </div>
      </div>

      {/* 5. OPTIMIZATION PLAYGROUND (Calculus Visualization) */}
      <div id="optimization" className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <Reveal>
          <OptimizationPlayground />
        </Reveal>
      </div>

      {/* 6. AI SANDBOX (Inference Proof) */}
      <div id="sandbox" className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <Reveal>
          <AISandbox />
        </Reveal>
      </div>

      {/* 7. RESEARCH LAB (Bento Architecture Grid) */}
      <div id="projects" className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <Reveal>
          <ProjectBento />
        </Reveal>
      </div>

      {/* 8. DEPLOYMENT LOGS (Activity Timeline) */}
      <div id="logs" className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <Reveal>
          <DeploymentLogs />
        </Reveal>
      </div>

      {/* 9. TERMINAL HANDSHAKE (Secure Contact) */}
      <div id="contact" className="max-w-6xl mx-auto px-6 relative z-10 pb-24">
        <Reveal>
          <TerminalContact />
        </Reveal>
      </div>

    </main>
  );
}