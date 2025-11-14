"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Target, TrendingUp } from "lucide-react";

interface Slide2Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

const cards = [
  {
    icon: AlertTriangle,
    stat: "95%",
    title: "das empresas falham",
    description: "na primeira tentativa de usar IA.",
    color: "from-red-500 to-orange-500",
    glow: "rgba(239, 68, 68, 0.5)",
  },
  {
    icon: Target,
    stat: "IA",
    title: "não é ferramenta",
    description: "é processo aplicado.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: TrendingUp,
    stat: "Vantagem",
    title: "competitiva real",
    description: "para empresas que acertam.",
    color: "from-green-500 to-emerald-500",
    glow: "rgba(34, 197, 94, 0.5)",
  },
];

export default function Slide2({ }: Slide2Props) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8">
      {/* Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
          O Cenário Atual
        </h2>
        <p className="text-xl text-white/70">
          A realidade da IA nas empresas
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Card className="relative h-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden group">
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${card.glow}, transparent 70%)`,
                  }}
                />

                {/* Icon with Gradient */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} mb-6 relative z-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Stat */}
                <h3 className="text-5xl font-bold text-white mb-3 relative z-10">
                  {card.stat}
                </h3>

                {/* Title */}
                <h4 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="text-white/60 text-lg relative z-10">
                  {card.description}
                </p>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20`}
                  style={{ padding: "2px" }}
                  animate={{
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Text */}
      <motion.p
        className="text-white/50 text-center mt-16 max-w-3xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        A maioria das empresas trata IA como tecnologia.
        <br />
        <span className="text-blue-400 font-medium">
          Nós tratamos como transformação de processos.
        </span>
      </motion.p>
    </div>
  );
}
