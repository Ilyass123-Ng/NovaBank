"use client";

import React, { useMemo } from "react";
import { useAppSelector } from "../Store/store";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
} from "lucide-react";

export default function StatsCards() {
  const { solde, currency, transactions } = useAppSelector((state) => state.compte);

  const stats = useMemo(() => {
    let totalDeposits = 0;
    let totalExpenses = 0;
    let transferCount = 0;

    transactions.forEach((tx) => {
      if (tx.type === "deposit") {
        totalDeposits += tx.amount;
      } else {
        totalExpenses += tx.amount;
      }
      if (tx.type === "transfer") transferCount++;
    });

    const netCashflow = totalDeposits - totalExpenses;
    const savingsRate =
      totalDeposits > 0
        ? Math.max(0, Math.min(100, Math.round((netCashflow / totalDeposits) * 100)))
        : 0;

    return {
      totalDeposits,
      totalExpenses,
      netCashflow,
      savingsRate,
      transferCount,
    };
  }, [transactions]);

  const formatAmount = (num: number) => {
    return num.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.25rem",
        marginBottom: "1.75rem",
      }}
    >
      {/* 1. Main Solde Card (Crisp White with Soft Cyan & Beige Highlight) */}
      <div
        className="slate-card"
        style={{
          padding: "1.75rem 2rem",
          gridColumn: "span 2",
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--border-beige)",
          background: "linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)",
          boxShadow: "0 6px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(168, 148, 117, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--cyan)",
                boxShadow: "0 0 10px var(--cyan)",
              }}
            />
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--cyan-deep)",
                margin: 0,
              }}
            >
              Solde Total Disponible
            </p>
          </div>
          <span className="status-pill status-cyan">
            <ShieldCheck size={13} /> Garanti Bank Al-Maghrib
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.75rem",
            margin: "0.75rem 0",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
              lineHeight: 1,
            }}
          >
            {formatAmount(solde)}
          </span>
          <span
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--cyan)",
            }}
          >
            {currency}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1.25rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-subtle)",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)" }}>
            RIB : 230 780 0001234567890123 45
          </span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            {transactions.length} mouvement(s) comptable(s)
          </span>
        </div>
      </div>

      {/* 2. Total Inflows (Comfortable Cyan Badge, Crisp Number) */}
      <div className="slate-card" style={{ padding: "1.5rem", background: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Revenus & Dépôts
          </span>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--cyan-bg)",
              border: "1px solid var(--cyan-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowDownLeft size={16} color="var(--cyan)" />
          </div>
        </div>

        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 0.4rem 0",
            fontFamily: "var(--font-mono)",
          }}
        >
          +{formatAmount(stats.totalDeposits)} <span style={{ fontSize: "1rem", color: "var(--cyan)" }}>{currency}</span>
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <TrendingUp size={14} color="var(--cyan)" />
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            Entrées totales validées
          </span>
        </div>
      </div>

      {/* 3. Total Outflows (Comfortable Beige Accent) */}
      <div className="slate-card" style={{ padding: "1.5rem", background: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Dépenses & Débits
          </span>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--beige-bg)",
              border: "1px solid var(--beige-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={16} color="#a89475" />
          </div>
        </div>

        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 0.4rem 0",
            fontFamily: "var(--font-mono)",
          }}
        >
          -{formatAmount(stats.totalExpenses)} <span style={{ fontSize: "1rem", color: "#a89475" }}>{currency}</span>
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <TrendingDown size={14} color="#a89475" />
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            Taux d'épargne net : {stats.savingsRate}%
          </span>
        </div>
      </div>
    </div>
  );
}
