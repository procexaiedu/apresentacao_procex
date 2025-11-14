"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Chat, Message } from "@/components/ui/chat";
import { Kanban, Deal } from "@/components/ui/kanban";
import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";

interface Slide4Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

export default function Slide4({ }: Slide4Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Olá! Sou sua assistente de CRM. Posso criar novos deals, mover cards entre etapas e gerar relatórios. Experimente: 'Crie um deal para a empresa TechCorp no valor de R$ 50.000'",
      timestamp: new Date(),
    },
  ]);

  const [deals, setDeals] = useState<Deal[]>([]);

  // Load initial deals from Supabase
  useEffect(() => {
    loadDeals();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("deals-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "deals",
        },
        (payload) => {
          console.log("Realtime change:", payload);
          loadDeals(); // Reload all deals when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadDeals = async () => {
    try {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setDeals(data);
    } catch (error) {
      console.error("Error loading deals:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send to N8n webhook
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
          context: "crm_kanban",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem para N8n");
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Entendido! Estou processando sua solicitação. O Kanban será atualizado em instantes.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se as variáveis de ambiente estão configuradas corretamente.",
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
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">
            Demonstração 1
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          CRM Inteligente em Tempo Real
        </h2>
        <p className="text-lg text-white/70">
          Converse com a IA e veja o Kanban se atualizar automaticamente
        </p>
      </motion.div>

      {/* Main Content - Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Chat - Left Side */}
        <motion.div
          className="lg:col-span-1 h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            placeholder="Digite um comando..."
            className="h-full"
          />
        </motion.div>

        {/* Kanban - Right Side */}
        <motion.div
          className="lg:col-span-2 h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <Kanban deals={deals} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <motion.p
        className="text-center text-white/40 text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Isso é IA atuando direto na sua operação — sem clicks, sem processos
        manuais.
      </motion.p>
    </div>
  );
}
