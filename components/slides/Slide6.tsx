"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Chat, Message } from "@/components/ui/chat";
import { Card } from "@/components/ui/card";
import { Sparkles, Table as TableIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Slide6Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

interface TableRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  created_at: string;
}

export default function Slide6({ }: Slide6Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Olá! Posso preencher automaticamente tabelas com informações. Experimente: 'Adicione 3 novos clientes de empresas de tecnologia'",
      timestamp: new Date(),
    },
  ]);

  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    loadTableData();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("table-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
        },
        () => {
          loadTableData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadTableData = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setTableData(data);
    } catch (error) {
      console.error("Error loading table data:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_CHAT;
      if (!webhookUrl) {
        throw new Error("N8N_WEBHOOK_CHAT não configurado");
      }

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          context: "populate_table",
          timestamp: new Date().toISOString(),
        }),
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Perfeito! Estou gerando e adicionando os dados. Observe a tabela se preenchendo automaticamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua solicitação.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">
            Demonstração 3
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Preenchimento Automático
        </h2>
        <p className="text-lg text-white/70">
          IA gerando e inserindo dados estruturados
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
            placeholder="Diga o que adicionar..."
            className="h-full"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          className="lg:col-span-2 h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <TableIcon className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Base de Contatos</h3>
              <span className="ml-auto text-white/60 text-sm">
                {tableData.length} registros
              </span>
            </div>

            <div className="flex-1 overflow-auto">
              {tableData.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-white/5 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Telefone
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Empresa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.1 }}
                            className="text-white text-sm"
                          >
                            {row.name}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="text-white/80 text-sm"
                          >
                            {row.email}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="text-white/80 text-sm"
                          >
                            {row.phone}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            className="text-white/80 text-sm"
                          >
                            {row.company}
                          </motion.div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <TableIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">
                      Peça para a IA adicionar dados à tabela
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
