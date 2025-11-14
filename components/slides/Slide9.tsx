"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

interface Slide9Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

const benefits = [
  "Análise personalizada do seu caso",
  "Roadmap de implementação detalhado",
  "Estimativa de ROI e resultados",
  "Demonstração de casos de sucesso",
];

export default function Slide9({ onNext }: Slide9Props) {
  const handleSchedule = () => {
    // In production, this would integrate with a scheduling system
    window.open("https://calendly.com/procex", "_blank");
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-slate-950"
        animate={{
          background: [
            "linear-gradient(to bottom right, #1e3a8a, #581c87, #0f172a)",
            "linear-gradient(to bottom right, #1e40af, #6b21a8, #0f172a)",
            "linear-gradient(to bottom right, #1e3a8a, #581c87, #0f172a)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 197, 94, 0.3)",
                "0 0 40px rgba(34, 197, 94, 0.5)",
                "0 0 20px rgba(34, 197, 94, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">
              Próximo Passo
            </span>
          </motion.div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Vamos dar o
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              próximo passo
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
            Vamos preparar uma solução personalizada baseada no que conversamos
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              onClick={handleSchedule}
              variant="premium"
              size="xl"
              className="gap-3 group"
            >
              <Calendar className="w-5 h-5" />
              Agendar Próxima Reunião
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={onNext}
              variant="outline"
              size="xl"
              className="border-white/20 hover:bg-white/10"
            >
              Ver Encerramento
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            className="text-white/40 text-sm mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Reunião de 45 minutos • 100% focada no seu caso • Sem compromisso
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}
