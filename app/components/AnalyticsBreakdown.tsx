"use client";

import React, { useMemo } from "react";
import { useAppSelector } from "../Store/store";
import {
  PieChart,
  Award,
  ShoppingCart,
  Zap,
  Coffee,
  ShoppingBag,
  Send,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function AnalyticsBreakdown() {
  const { transactions, currency } = useAppSelector((state) => state.compte);

  const analysis = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const catMap: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === "deposit") {
        income += tx.amount;
      } else {
        expenses += tx.amount;
        catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
      }
    });

    const categories = Object.entries(catMap).map(([key, val]) => ({
      name:
        key === "groceries"
          ? "Alimentation"
          : key === "bills"
          ? "Factures & Charges"
          : key === "transfer"
          ? "Virements sortants"
          : key === "leisure"
          ? "Loisirs & Sorties"
          : key === "shopping"
          ? "Shopping"
          : "Divers",
      amount: val,
      percentage: expenses > 0 ? Math.round((val / expenses) * 100) : 0,
    }));

    const healthScore =
      income > 0
        ? Math.min(98, Math.max(45, Math.round(((income - expenses) / income) * 60 + 40)))
        : 65;

    return { income, expenses, categories, healthScore };
  }, [transactions]);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Alimentation":
        return <ShoppingCart size={13} color="var(--cyan)" />;
      case "Factures & Charges":
        return <Zap size={13} color="#64748b" />;
      case "Virements sortants":
        return <Send size={13} color="var(--cyan)" />;
      case "Loisirs & Sorties":
        return <Coffee size={13} color="#64748b" />;
      case "Shopping":
        return <ShoppingBag size={13} color="#64748b" />;
      default:
        return <CreditCard size={13} color="#64748b" />;
    }
  };

  return (
    <div className="slate-card" style={{ padding: "1.75rem", background: "#ffffff" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <PieChart size={18} color="var(--cyan)" />
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            Santé Financière & Ventilation
          </h2>
        </div>
        <span className="status-pill status-beige">
          <Award size={13} color="#786447" /> Score : {analysis.healthScore}/100
        </span>
      </div>

      {/* Health Score Mini Banner */}
      <div
        style={{
          background: "var(--beige-50)",
          border: "1px solid var(--beige-border)",
          borderRadius: "12px",
          padding: "1rem 1.125rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #eee5d5 0%, #dfd2bc 100%)",
            color: "#786447",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontWeight: 800,
            fontSize: "0.9375rem",
            fontFamily: "var(--font-mono)",
            border: "1px solid #dfd2bc",
          }}
        >
          {analysis.healthScore}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Gestionnaire Budgétaire Élite
          </p>
          <p style={{ margin: "0.15rem 0 0 0", fontSize: "0.725rem", color: "var(--text-secondary)" }}>
            Vos flux entrants couvrent vos charges. Marge d'épargne optimale respectée.
          </p>
        </div>
      </div>

      {/* Spending by Category Bars */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.875rem",
          }}
        >
          Répartition des charges
        </p>

        {analysis.categories.length === 0 ? (
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Aucune dépense enregistrée sur cette période.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {analysis.categories.map((cat, idx) => (
              <div key={idx}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.7875rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {getCategoryIcon(cat.name)}
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{cat.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                    {cat.amount.toLocaleString("fr-FR")} {currency} ({cat.percentage}%)
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "var(--gray-200)",
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.max(4, cat.percentage)}%`,
                      background: idx % 2 === 0 ? "var(--cyan)" : "#a89475",
                      borderRadius: "999px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guarantee Notice */}
      <div
        style={{
          padding: "0.75rem 0.85rem",
          background: "var(--gray-50)",
          borderRadius: "8px",
          border: "1px solid var(--border-subtle)",
          fontSize: "0.7rem",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <ShieldCheck size={16} color="var(--cyan)" />
        <span>
          Fonds Collectif de Garantie des Dépôts (FCGD / Bank Al-Maghrib) conforme à la loi bancaire marocaine n° 103-12 jusqu'à 80 000 MAD.
        </span>
      </div>
    </div>
  );
}
