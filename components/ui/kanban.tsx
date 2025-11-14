"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./card";
import { DollarSign, User, Calendar } from "lucide-react";

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  status: "lead" | "qualified" | "proposal" | "negotiation" | "closed";
  created_at: string;
}

interface KanbanProps {
  deals: Deal[];
  className?: string;
}

const columns = [
  { id: "lead", title: "Leads", color: "from-gray-500 to-gray-600" },
  { id: "qualified", title: "Qualificados", color: "from-blue-500 to-blue-600" },
  { id: "proposal", title: "Proposta", color: "from-purple-500 to-purple-600" },
  { id: "negotiation", title: "Negociação", color: "from-orange-500 to-orange-600" },
  { id: "closed", title: "Fechados", color: "from-green-500 to-green-600" },
];

export function Kanban({ deals, className = "" }: KanbanProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className={`w-full h-full overflow-x-auto ${className}`}>
      <div className="flex gap-4 h-full min-w-max p-4">
        {columns.map((column) => {
          const columnDeals = deals.filter((deal) => deal.status === column.id);
          const columnValue = columnDeals.reduce((sum, deal) => sum + deal.value, 0);

          return (
            <div key={column.id} className="flex flex-col w-72 flex-shrink-0">
              {/* Column Header */}
              <div className={`bg-gradient-to-r ${column.color} rounded-t-xl p-4 mb-2`}>
                <h3 className="text-white font-semibold text-lg">
                  {column.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/80 text-sm">
                    {columnDeals.length} deal{columnDeals.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-white/60 text-xs">•</span>
                  <span className="text-white/80 text-sm font-medium">
                    {formatCurrency(columnValue)}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-b-xl p-2 space-y-2 overflow-y-auto">
                <AnimatePresence>
                  {columnDeals.map((deal) => (
                    <motion.div
                      key={deal.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-white/20 transition-all cursor-pointer hover:shadow-lg">
                        {/* Deal Title */}
                        <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">
                          {deal.title}
                        </h4>

                        {/* Company */}
                        <div className="flex items-center gap-2 text-white/60 text-xs mb-3">
                          <User className="w-3 h-3" />
                          <span className="truncate">{deal.company}</span>
                        </div>

                        {/* Value */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-green-400 font-semibold text-sm">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatCurrency(deal.value)}</span>
                          </div>

                          {/* Date */}
                          <div className="flex items-center gap-1 text-white/40 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(deal.created_at).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {columnDeals.length === 0 && (
                  <div className="h-full flex items-center justify-center text-white/30 text-sm">
                    Nenhum deal
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
