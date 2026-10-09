"use client";

import React, { useMemo } from "react";
import TransactionHistory from "../components/TransactionHistory";
import { useAppSelector } from "../Store/store";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Send,
} from "lucide-react";

export default function TransactionsPage() {
  const { transactions, currency } = useAppSelector((state) => state.compte);

  const summary = useMemo(() => {
    let deposits = 0;
    let withdrawals = 0;
    let transfers = 0;

    transactions.forEach((tx) => {
      if (tx.type === "deposit") deposits += tx.amount;
      else if (tx.type === "withdraw") withdrawals += tx.amount;
      else if (tx.type === "transfer") transfers += tx.amount;
    });

    return { deposits, withdrawals, transfers };
  }, [transactions]);

  return (
    <div>
      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        <div className="slate-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--gray-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Total des Dépôts
            </span>
            <div
              style={{
                width: "30px",
                height: "30px",
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
          <p style={{ margin: 0, fontSize: "1.65rem", fontWeight: 800, color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>
            +{summary.deposits.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {currency}
          </p>
        </div>

        <div className="slate-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Total des Retraits
            </span>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "var(--beige-50)",
                border: "1px solid var(--beige-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowUpRight size={16} color="#786447" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "1.65rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
            -{summary.withdrawals.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {currency}
          </p>
        </div>

        <div className="slate-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--gray-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Total des Virements
            </span>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "var(--cyan-bg)",
                border: "1px solid var(--cyan-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={15} color="var(--cyan)" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "1.65rem", fontWeight: 800, color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>
            -{summary.transfers.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {currency}
          </p>
        </div>
      </div>

      {/* Complete Transaction Table Component */}
      <TransactionHistory />
    </div>
  );
}
