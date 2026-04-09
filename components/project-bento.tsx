"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, ShieldCheck, ChevronRight, Copy, X, Globe, Zap } from "lucide-react";
import Prism from "prismjs";

// Ensure Prism themes and languages are loaded
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";

const projects = [
  {
    id: "mnist-engine",
    title: "MNIST_Neural_Engine",
    type: "Architecture",
    tech: ["PyTorch", "ResNet", "Optimization"],
    description: "A deep residual architecture optimized for digit and fashion classification. Implements Kaiming weight initialization and Batch Normalization for training stability.",
    code: `import torch
import torch.nn as nn
import torch.nn.init as init

class ResidualBlock(nn.Module):
    """Standard Residual Block for deep feature extraction"""
    def __init__(self, in_channels, out_channels, stride=1):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, 3, stride, 1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, 3, 1, 1, bias=False),
            nn.BatchNorm2d(out_channels)
        )

    def forward(self, x):
        return torch.relu(self.conv(x) + x)

class NeuralEngine(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.stem = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU()
        )
        self.res_layer = ResidualBlock(32, 32)
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Linear(32, num_classes)
        )
        self._initialize_weights()

    def _initialize_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')`
  },
  {
    id: "crop-ai",
    title: "Crop_Disease_Inference",
    type: "Agri-Tech",
    tech: ["ResNet-50", "ONNX", "Edge-AI"],
    hf: "https://huggingface.co/spaces/Raj2276/Crop-Disease-Classifier",
    description: "Production-ready inference pipeline for agricultural diagnostics. Features ImageNet normalization and ONNX-optimized model loading.",
    code: `import torchvision.transforms as T
from torchvision import models
import torch.nn as nn
import torch

class AgriInference:
    def __init__(self, checkpoint_path: str):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = self._load_backbone(checkpoint_path)
        
        # Professional Pre-processing Pipeline
        self.transform = T.Compose([
            T.Resize(256),
            T.CenterCrop(224),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def _load_backbone(self, path):
        model = models.resnet50(weights=None)
        model.fc = nn.Linear(model.fc.in_features, 38) # 38 Categories
        state_dict = torch.load(path, map_location=self.device)
        model.load_state_dict(state_dict)
        return model.to(self.device).eval()

    @torch.no_grad()
    def predict(self, img_tensor):
        logits = self.model(img_tensor.to(self.device))
        return torch.softmax(logits, dim=1)`
  },
  {
    id: "voiceguard",
    title: "VoiceGuard_System",
    type: "Security",
    tech: ["Wav2Vec 2.0", "Transformers"],
    hf: "https://huggingface.co/spaces/Raj2276/VoiceGuard",
    description: "Award-winning deepfake detection logic. Utilizes attentive statistical pooling on Wav2Vec 2.0 latent features to detect synthetic speech.",
    code: `from transformers import Wav2Vec2Model
import torch.nn as nn
import torch

class VoiceGuard(nn.Module):
    def __init__(self, model_name="facebook/wav2vec2-base"):
        super().__init__()
        # Optimized Feature Extractor for 16kHz Audio
        self.backbone = Wav2Vec2Model.from_pretrained(model_name)
        
        # Attentive Pooling Strategy
        self.attention = nn.Sequential(
            nn.Linear(768, 256),
            nn.Tanh(),
            nn.Linear(256, 1),
            nn.Softmax(dim=1)
        )
        
        self.head = nn.Sequential(
            nn.Linear(768, 512),
            nn.GELU(),
            nn.Dropout(0.2),
            nn.Linear(512, 2) # [REAL, SYNTHETIC]
        )

    def forward(self, x):
        hidden_states = self.backbone(x).last_hidden_state
        weights = self.attention(hidden_states)
        context = torch.sum(weights * hidden_states, dim=1)
        return self.head(context)`
  }
];

export default function ProjectBento() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selected) {
      Prism.highlightAll();
    }
  }, [selected]);

  return (
    <section className="py-20">
      {/* 1. Header Section */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={14} className="text-primary animate-pulse" />
          <h2 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">
            [ NEURAL_PROJECT_ARCHIVES ]
          </h2>
        </div>
        <p className="text-slate-500 text-xs italic font-mono max-w-xl">
          A selection of verified implementations across Computer Vision, Audio Transformers, and Deep Feature Extraction.
        </p>
      </div>

      {/* 2. The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelected(p)}
            className={`group relative bg-black/40 border border-white/5 p-8 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-primary/30 transition-all ${
              i === 0 ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[8px] font-mono text-primary border border-primary/20 px-2 py-1 uppercase tracking-widest bg-primary/5">
                  {p.type}
                </span>
                <Cpu size={18} className="text-slate-800 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-3xl font-bold tracking-tighter italic uppercase text-white group-hover:text-primary transition-colors leading-none">
                {p.title}
              </h3>
              <p className="text-slate-400 text-xs mt-6 line-clamp-2 leading-relaxed font-sans opacity-70 group-hover:opacity-100">
                {p.description}
              </p>
            </div>
            
            <div className="relative z-10 flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {p.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                    #{t}
                  </span>
                ))}
              </div>
              <ChevronRight size={16} className="text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Code Inspector Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[150]"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[700px] bg-[#080808] border-l border-white/10 z-[160] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <Terminal size={18} className="text-primary" />
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tighter uppercase">{selected.title}</h4>
                    <p className="text-[9px] font-mono text-slate-500 uppercase">Architecture_Kernel_V1.6</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
                <div className="mb-12 space-y-6">
                  <p className="text-base text-slate-300 leading-relaxed font-sans">{selected.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {selected.hf && (
                      <a href={selected.hf} target="_blank" className="flex items-center gap-2 text-[10px] font-mono text-primary border border-primary/20 px-4 py-2 bg-primary/5 hover:bg-primary/10 transition-all uppercase tracking-widest">
                        <Globe size={14} /> View_Live_Deployment
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-700 uppercase">Source: Python_PyTorch</div>
                  <pre className="p-8 bg-black border border-white/5 rounded-lg overflow-x-auto text-xs leading-relaxed scrollbar-thin scrollbar-thumb-primary/10">
                    <code className="language-python">
                      {selected.code.trim()}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-primary/40" /> Handled_by_Raj_Patel
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selected.code);
                  }}
                  className="flex items-center gap-2 text-[10px] font-mono text-slate-400 hover:text-primary transition-colors uppercase tracking-widest group"
                >
                  <Copy size={12} className="group-hover:scale-110 transition-transform" /> Copy_Kernel_Source
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}