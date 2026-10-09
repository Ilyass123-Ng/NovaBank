"use client";

import React, { useMemo } from "react";
import AnalyticsBreakdown from "../components/AnalyticsBreakdown";
import { useAppSelector } from "../Store/store";

export default function AnalyticsPage() {
  const { transactions, currency } = useAppSelector((state) => state.compte);

  const stats = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach((tx) => {
      if (tx.type === "deposit") income += tx.amount;
      else expenses += tx.amount;
    });

    const netSavings = income - expenses;
    const savingsRatio = income > 0 ? Math.max(0, Math.round((netSavings / income) * 100)) : 0;

    return { income, expenses, netSavings, savingsRatio };
  }, [transactions]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.75rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Spending Breakdown */}
        <div>
          <AnalyticsBreakdown />
        </div>

        {/* Right Column: Financial Health & Budget Advice */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Savings Ratio Indicator */}
          <div className="slate-card" style={{ padding: "1.75rem", background: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Capacité d'épargne mensuelle
              </span>
              <span className="status-pill status-beige">
                {stats.savingsRatio}% d'épargne
              </span>
            </div>

            <p style={{ margin: "0 0 0.75rem 0", fontSize: "2rem", fontWeight: 800, color: "var(--cyan-deep)", fontFamily: "var(--font-mono)" }}>
              +{stats.netSavings.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {currency}
            </p>

            <div
              style={{
                height: "8px",
                background: "var(--gray-200)",
                borderRadius: "999px",
                overflow: "hidden",
                marginBottom: "0.875rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, Math.max(10, stats.savingsRatio))}%`,
                  background: "var(--cyan)",
                  borderRadius: "999px",
                }}
              />
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Recommandation : Viser un ratio minimum de 20% pour constituer votre fonds d'urgence.
            </p>
          </div>

          {/* Budgeting Rule 50/30/20 Breakdown */}
          <div className="slate-card" style={{ padding: "1.75rem", background: "#ffffff" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "var(--text-primary)" }}>
              Règle Budgétaire Recommandée (50 / 30 / 20)
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.775rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Besoins essentiels (50%)</span>
                  <span style={{ color: "var(--text-secondary)" }}>Alimentation, Factures, Loyer</span>
                </div>
                <div style={{ height: "6px", background: "var(--gray-200)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: "45%", height: "100%", background: "var(--cyan)", borderRadius: "999px" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.775rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Envies & Loisirs (30%)</span>
                  <span style={{ color: "var(--text-secondary)" }}>Sorties, Shopping, Abonnements</span>
                </div>
                <div style={{ height: "6px", background: "var(--gray-200)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: "25%", height: "100%", background: "#a89475", borderRadius: "999px" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.775rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Épargne & Investissement (20%)</span>
                  <span style={{ color: "var(--cyan-deep)", fontWeight: 600 }}>Trésorerie Pro, Placements</span>
                </div>
                <div style={{ height: "6px", background: "var(--gray-200)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: "30%", height: "100%", background: "var(--cyan)", borderRadius: "999px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
