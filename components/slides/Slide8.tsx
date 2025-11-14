"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Slide8Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

export default function Slide8({ }: Slide8Props) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [transcription, setTranscription] = useState("");
  const [insights, setInsights] = useState("");

  useEffect(() => {
    // Poll for results from N8n
    const pollForResults = async () => {
      try {
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_AUDIO_OUT;
        if (!webhookUrl) {
          // Simulate results for demo purposes
          setTimeout(() => {
            setTranscription(
              "Somos uma empresa de tecnologia focada em soluções para o varejo. Temos cerca de 50 funcionários e estamos crescendo 30% ao ano. Nosso maior desafio é automatizar o atendimento ao cliente e integrar melhor nossos sistemas internos."
            );
            setInsights(`## 🎯 Análise da Empresa

### Setor e Posicionamento
- **Segmento**: Tecnologia para Varejo
- **Tamanho**: Média empresa (50 colaboradores)
- **Crescimento**: 30% ao ano (excelente tração)

### 🔍 Desafios Identificados

1. **Automação de Atendimento**
   - Alto volume de solicitações repetitivas
   - Necessidade de escala sem aumentar custos
   - Oportunidade para agentes de IA conversacionais

2. **Integração de Sistemas**
   - Silos de informação entre departamentos
   - Processos manuais de transferência de dados
   - Risco de inconsistências

### 💡 Oportunidades com IA

#### Curto Prazo (1-3 meses)
- Implementar chatbot inteligente para FAQ
- Automatizar triagem de tickets de suporte
- Criar dashboard unificado de métricas

#### Médio Prazo (3-6 meses)
- Agentes de IA para integração de sistemas
- Análise preditiva de demanda
- Automação de processos internos

#### Longo Prazo (6-12 meses)
- IA generativa para criação de conteúdo
- Recomendações personalizadas para clientes
- Sistema de decisão autônoma

### 📊 ROI Estimado
- **Redução de custos**: 40% em atendimento
- **Aumento de eficiência**: 60% em processos internos
- **Satisfação do cliente**: +25 pontos NPS

### ✅ Próximos Passos Recomendados
1. Mapear fluxos críticos de atendimento
2. Priorizar integrações de maior impacto
3. Desenvolver MVP de assistente IA
4. Treinar equipe interna`);
            setIsProcessing(false);
          }, 3000);
          return;
        }

        // In production, poll the webhook
        const response = await fetch(webhookUrl);
        const data = await response.json();

        if (data.transcricao && data.insights_markdown) {
          setTranscription(data.transcricao);
          setInsights(data.insights_markdown);
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error polling results:", error);
      }
    };

    pollForResults();
    const interval = setInterval(pollForResults, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-medium">
            IA Trabalhando
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {isProcessing ? "Analisando seu áudio..." : "Análise Completa"}
        </h2>
        <p className="text-lg text-white/70">
          {isProcessing
            ? "Transcrevendo, processando e gerando insights personalizados"
            : "Veja o que nossa IA entendeu sobre seu negócio"}
        </p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Transcription */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Transcrição</h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {isProcessing ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-4 bg-white/10 rounded"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      style={{
                        width: `${Math.random() * 40 + 60}%`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <motion.p
                  className="text-white/80 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {transcription}
                </motion.p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-purple-500/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Insights Gerados</h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {isProcessing ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <motion.div
                        className="h-6 bg-purple-400/20 rounded w-1/3"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                      <motion.div
                        className="h-4 bg-white/10 rounded w-full"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3 + 0.1,
                        }}
                      />
                      <motion.div
                        className="h-4 bg-white/10 rounded w-4/5"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3 + 0.2,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="prose prose-invert prose-sm max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-blue-300 mt-4 mb-3">
                          {children}
                        </h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside text-white/80 space-y-2 ml-4">
                          {children}
                        </ol>
                      ),
                      p: ({ children }) => (
                        <p className="text-white/80 mb-3 leading-relaxed">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-white font-semibold">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {insights}
                  </ReactMarkdown>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
