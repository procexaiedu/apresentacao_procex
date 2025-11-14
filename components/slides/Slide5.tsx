"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Chat, Message } from "@/components/ui/chat";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, DollarSign, Users } from "lucide-react";

interface Slide5Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

interface QueryResult {
  columns: string[];
  rows: any[];
  stats?: {
    total: number;
    average: number;
    max: number;
  };
}

export default function Slide5({ }: Slide5Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Olá! Posso consultar dados do seu banco e gerar análises. Experimente: 'Mostre os últimos 5 clientes' ou 'Qual o valor total de vendas?'",
      timestamp: new Date(),
    },
  ]);

  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsProcessing(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_CHAT;
      if (!webhookUrl) {
        throw new Error("N8N_WEBHOOK_CHAT não configurado");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          context: "sql_query",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar consulta");
      }

      // Simulate query result (in production, this comes from N8n)
      const mockResult: QueryResult = {
        columns: ["Nome", "Email", "Valor", "Data"],
        rows: [
          ["Tech Solutions", "contato@tech.com", "R$ 45.000", "15/11/2024"],
          ["Inovação Corp", "vendas@inov.com", "R$ 32.000", "14/11/2024"],
          ["DataFlow Inc", "info@dataflow.com", "R$ 28.500", "13/11/2024"],
        ],
        stats: {
          total: 105500,
          average: 35167,
          max: 45000,
        },
      };

      setQueryResult(mockResult);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Aqui estão os resultados da sua consulta. Analisei os dados e gerei estatísticas automáticas.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua consulta.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

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
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-medium">
            Demonstração 2
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Consultas SQL Inteligentes
        </h2>
        <p className="text-lg text-white/70">
          Pergunte em português, receba análises completas
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Chat */}
        <motion.div
          className="lg:col-span-1 h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            placeholder="Faça sua consulta..."
            className="h-full"
          />
        </motion.div>

        {/* Results */}
        <motion.div
          className="lg:col-span-2 h-full space-y-4 overflow-y-auto"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {queryResult ? (
            <>
              {/* Stats Cards */}
              {queryResult.stats && (
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-blue-500/20">
                          <DollarSign className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs">Total</p>
                          <p className="text-white text-xl font-bold">
                            R$ {queryResult.stats.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-purple-500/20">
                          <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs">Média</p>
                          <p className="text-white text-xl font-bold">
                            R$ {queryResult.stats.average.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-green-500/20">
                          <Users className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs">Maior</p>
                          <p className="text-white text-xl font-bold">
                            R$ {queryResult.stats.max.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              )}

              {/* Data Table */}
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        {queryResult.columns.map((col, index) => (
                          <th
                            key={index}
                            className="px-6 py-4 text-left text-sm font-semibold text-white"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.rows.map((row, rowIndex) => (
                        <motion.tr
                          key={rowIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + rowIndex * 0.1 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          {row.map((cell: any, cellIndex: number) => (
                            <td
                              key={cellIndex}
                              className="px-6 py-4 text-sm text-white/80"
                            >
                              {cell}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white/40">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Faça uma consulta para ver os resultados</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
