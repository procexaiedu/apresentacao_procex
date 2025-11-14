"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, CheckCircle2, Database } from "lucide-react";

interface Slide3Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

const workflowSteps = [
  {
    icon: Database,
    title: "Entrada",
    description: "Dados e contexto",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Análise",
    description: "Processamento inteligente",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Ação",
    description: "Execução automatizada",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: CheckCircle2,
    title: "Resultado",
    description: "Entrega de valor",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Slide3({ }: Slide3Props) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8">
      {/* Title */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
          O que são Agentes de IA?
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Sistemas inteligentes que entendem, decidem e agem —{" "}
          <span className="text-blue-400">automaticamente</span>
        </p>
      </motion.div>

      {/* Workflow */}
      <div className="flex items-center justify-center gap-4 md:gap-8 max-w-6xl w-full flex-wrap md:flex-nowrap">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-center">
              {/* Step Card */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <div className="relative group">
                  {/* Pulsing Background */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-48 h-48 flex flex-col items-center justify-center group-hover:border-white/40 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/60 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Arrow */}
              {index < workflowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.3 + 0.2,
                  }}
                  className="hidden md:block mx-4"
                >
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    <ArrowRight className="w-8 h-8 text-blue-400/60" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Explanation */}
      <motion.div
        className="mt-20 max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <p className="text-lg text-white/80 leading-relaxed">
            Agentes de IA não apenas respondem perguntas —{" "}
            <span className="text-blue-400 font-semibold">
              eles executam tarefas complexas
            </span>
            , tomam decisões baseadas em dados e se integram diretamente aos
            seus sistemas.
          </p>
          <p className="text-md text-white/60 mt-4">
            É como ter um especialista trabalhando 24/7 nos seus processos.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
