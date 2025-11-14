"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Slide10Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

export default function Slide10({ goToSlide }: Slide10Props) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Elegant Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"
        animate={{
          background: [
            "linear-gradient(to bottom right, #0f172a, #0c4a6e, #581c87)",
            "linear-gradient(to bottom right, #0f172a, #1e3a8a, #6b21a8)",
            "linear-gradient(to bottom right, #0f172a, #0c4a6e, #581c87)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Radial Light */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent" />

      {/* Subtle Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-8"
            animate={{
              boxShadow: [
                "0 0 30px rgba(59, 130, 246, 0.5)",
                "0 0 50px rgba(59, 130, 246, 0.7)",
                "0 0 30px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Main Message */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
            Obrigado
          </h2>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-2xl md:text-3xl text-blue-200 font-light">
              Estamos prontos para construir
            </p>
            <p className="text-2xl md:text-3xl text-blue-200 font-light">
              sua solução de IA.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto my-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />

          {/* Company Info */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="text-xl text-white/70">ProceX</p>
            <p className="text-lg text-white/50">
              IA aplicada para transformar negócios
            </p>
          </motion.div>

          {/* Interactive Element */}
          <motion.button
            onClick={() => goToSlide(0)}
            className="mt-12 text-white/40 hover:text-white/70 text-sm transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Recomeçar apresentação
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Light Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
