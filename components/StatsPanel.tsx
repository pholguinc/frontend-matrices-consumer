"use client";

import { MatrixStats } from '@/lib/types';

interface StatsPanelProps {
  stats: MatrixStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const cards = [
    {
      label: "Máximo",
      value: stats.max.toFixed(4),
      icon: "↑",
      color: "text-emerald-400",
    },
    {
      label: "Mínimo",
      value: stats.min.toFixed(4),
      icon: "↓",
      color: "text-rose-400",
    },
    {
      label: "Promedio",
      value: stats.avg.toFixed(4),
      icon: "≈",
      color: "text-cyan-400",
    },
    {
      label: "Suma Total",
      value: stats.sum.toFixed(4),
      icon: "Σ",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="p-4 glass rounded-2xl border border-white/10 flex flex-col items-center text-center"
          >
            <span className={`text-2xl mb-1 ${card.color}`}>{card.icon}</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
              {card.label}
            </span>
            <span className="text-xl font-mono text-white mt-1">
              {card.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
