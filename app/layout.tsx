import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 1. Typography Setup
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "RAJ_PATEL // ML_RESEARCH & ARCHITECTURE",
  description: "B.Tech 2027 @ KNIT Sultanpur. Specializing in Neural Architectures, Computer Vision (YOLO/ResNet), and First-Principles ML Implementation.",
  keywords: ["Machine Learning", "AI Engineer", "Computer Vision", "PyTorch", "Sultanpur", "KNIT"],
  openGraph: {
    title: "Raj Patel | Neural Systems Lab",
    description: "Architecting high-density AI solutions from first principles.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} bg-black antialiased`}>
        {/* LOGIC: We removed 'InteractiveBG' and 'SmoothScroll' from here. 
            The particles are now handled in 'page.tsx' and smooth scrolling 
            is handled by the 'scroll-smooth' class above.
        */}
        {children}
      </body>
    </html>
  );
}