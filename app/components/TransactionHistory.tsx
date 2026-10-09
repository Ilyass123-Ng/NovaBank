"use client";

import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { deleteTransaction } from "../Features/compteSlice";
import {
  Search,
  Download,
  Trash2,
  Briefcase,
  Laptop,
  ShoppingCart,
  Zap,
  Coffee,
  ShoppingBag,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
} from "lucide-react";

export default function TransactionHistory({ limit }: { limit?: number }) {
  const dispatch = useAppDispatch();
  const { transactions, currency } = useAppSelector((state) => state.compte);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdraw" | "transfer">("all");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "highest">("recent");

  const filteredTransactions = useMemo(() => {
    let result = transactions
      .filter((tx) => {
        const matchesType = filterType === "all" || tx.type === filterType;
        const matchesSearch =
          tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tx.recipient && tx.recipient.toLowerCase().includes(searchTerm.toLowerCase())) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "recent") return b.timestamp - a.timestamp;
        if (sortBy === "oldest") return a.timestamp - b.timestamp;
        if (sortBy === "highest") return b.amount - a.amount;
        return 0;
      });

    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }, [transactions, filterType, searchTerm, sortBy, limit]);

  const handleExportCSV = () => {
    if (transactions.length === 0) return;

    const headers = ["ID", "Date", "Type", "Titre", "Categorie", "Destinataire", "Montant", "Devise", "Statut"];
    const rows = transactions.map((tx) => [
      tx.id,
      new Date(tx.timestamp).toLocaleString("fr-FR"),
      tx.type,
      `"${tx.title.replace(/"/g, '""')}"`,
      tx.category,
      `"${(tx.recipient || "").replace(/"/g, '""')}"`,
      tx.amount,
      currency,
      tx.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `releve_compte_novabank_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryIcon = (category: string, type: string) => {
    switch (category) {
      case "salary":
        return <Briefcase size={16} color="var(--cyan)" />;
      case "freelance":
        return <Laptop size={16} color="var(--cyan)" />;
      case "groceries":
        return <ShoppingCart size={16} color="#64748b" />;
      case "bills":
        return <Zap size={16} color="#64748b" />;
      case "leisure":
        return <Coffee size={16} color="#64748b" />;
      case "shopping":
        return <ShoppingBag size={16} color="#64748b" />;
      case "transfer":
        return <Send size={16} color="var(--cyan)" />;
      default:
        return type === "deposit" ? (
          <ArrowDownLeft size={16} color="var(--cyan)" />
        ) : (
          <ArrowUpRight size={16} color="#64748b" />
        );
    }
  };

  return (
    <div className="slate-card" style={{ padding: "1.75rem", background: "#ffffff" }}>
      {/* Header & CSV Export */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            Historique des Flux Financiers
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: "0.2rem 0 0 0" }}>
            {filteredTransactions.length} transaction(s) affichée(s) sur {transactions.length}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={transactions.length === 0}
          className="btn-action btn-gray"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.8125rem" }}
          title="Exporter le relevé complet en fichier CSV"
        >
          <Download size={14} color="var(--cyan)" />
          <span>Exporter Relevé (CSV)</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.625rem",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search
            size={15}
            color="#94a3b8"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="custom-input"
            style={{ paddingLeft: "36px", paddingBlock: "0.5rem", fontSize: "0.8125rem", borderRadius: "8px" }}
            placeholder="Rechercher libellé, destinataire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {[
            { label: "Tous", val: "all" },
            { label: "Dépôts", val: "deposit" },
            { label: "Retraits", val: "withdraw" },
            { label: "Virements", val: "transfer" },
          ].map((item) => {
            const isActive = filterType === item.val;
            return (
              <button
                key={item.val}
                onClick={() => setFilterType(item.val as any)}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "8px",
                  border: isActive ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                  background: isActive ? "var(--cyan)" : "var(--gray-100)",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          style={{
            background: "var(--gray-50)",
            border: "1px solid var(--border-card)",
            color: "var(--text-secondary)",
            fontSize: "0.75rem",
            padding: "0.45rem 0.75rem",
            borderRadius: "8px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="recent">Plus récent</option>
          <option value="oldest">Plus ancien</option>
          <option value="highest">Montant élevé</option>
        </select>
      </div>

      {/* Transaction List */}
      <div style={{ maxHeight: "500px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {filteredTransactions.length === 0 ? (
          <div
            style={{
              padding: "2.5rem 1rem",
              textAlign: "center",
              background: "var(--gray-50)",
              borderRadius: "12px",
              border: "1px dashed var(--border-card)",
            }}
          >
            <Calendar size={28} color="#94a3b8" style={{ marginBottom: "0.5rem" }} />
            <p style={{ margin: 0, fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9375rem" }}>
              Aucune opération trouvée
            </p>
            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Ajustez vos filtres ou effectuez un nouveau dépôt.
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isDeposit = tx.type === "deposit";
            const isTransfer = tx.type === "transfer";

            return (
              <div
                key={tx.id}
                style={{
                  padding: "0.875rem 1.125rem",
                  background: "var(--gray-50)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  border: "1px solid var(--border-subtle)",
                  transition: "all 0.15s ease",
                }}
              >
                {/* Left: Icon and Details */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      background: isDeposit ? "var(--cyan-bg)" : "var(--gray-200)",
                      border: `1px solid ${isDeposit ? "var(--cyan-border)" : "var(--border-card)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {getCategoryIcon(tx.category, tx.type)}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {tx.title}
                      </p>
                      {tx.recipient && (
                        <span
                          className="status-pill status-cyan"
                          style={{ fontSize: "0.625rem", padding: "1px 6px" }}
                        >
                          {tx.recipient}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.2rem" }}>
                      <span
                        suppressHydrationWarning
                        style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                      >
                        {new Date(tx.timestamp).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Africa/Casablanca",
                        })}
                      </span>
                      {tx.note && (
                        <>
                          <span style={{ color: "#cbd5e1" }}>•</span>
                          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                            {tx.note}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Delete Button */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9375rem",
                        fontWeight: 800,
                        fontFamily: "var(--font-mono)",
                        color: isDeposit ? "var(--cyan-deep)" : "var(--text-primary)",
                      }}
                    >
                      {isDeposit ? "+" : "-"}
                      {tx.amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {currency}
                    </p>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      {tx.status}
                    </span>
                  </div>

                  <button
                    onClick={() => dispatch(deleteTransaction(tx.id))}
                    title="Supprimer cette transaction"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      padding: "4px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rose)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
