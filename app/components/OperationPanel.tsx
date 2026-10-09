"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import {
  deposit,
  withdraw,
  transfer,
  TransactionCategory,
} from "../Features/compteSlice";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Send,
  AlertCircle,
  Briefcase,
  Laptop,
  Building2,
  ShoppingCart,
  Zap,
  Coffee,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

export default function OperationPanel() {
  const dispatch = useAppDispatch();
  const { solde, currency, card, beneficiaries } = useAppSelector(
    (state) => state.compte
  );

  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "transfer">("deposit");

  // Form states
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<TransactionCategory>("salary");
  const [note, setNote] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<string>("");

  const numAmount = parseFloat(amount) || 0;

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
  };

  const depositCategories = [
    { id: "salary" as TransactionCategory, label: "Salaire Mensuel", icon: Briefcase },
    { id: "freelance" as TransactionCategory, label: "Facture Freelance", icon: Laptop },
    { id: "other" as TransactionCategory, label: "Dépôt d'Espèces", icon: Building2 },
  ];

  const withdrawCategories = [
    { id: "groceries" as TransactionCategory, label: "Supermarché", icon: ShoppingCart },
    { id: "bills" as TransactionCategory, label: "Factures & Charges", icon: Zap },
    { id: "leisure" as TransactionCategory, label: "Loisirs & Restauration", icon: Coffee },
    { id: "shopping" as TransactionCategory, label: "Shopping & Matériel", icon: ShoppingBag },
    { id: "other" as TransactionCategory, label: "Retrait DAB", icon: CreditCard },
  ];

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount > 0) {
      dispatch(
        deposit({
          amount: numAmount,
          category,
          title:
            category === "salary"
              ? "Salaire / Revenu Fixe"
              : category === "freelance"
              ? "Encaissement Client Freelance"
              : "Dépôt d'espèces ou chèque",
          note: note.trim() || undefined,
        })
      );
      setAmount("");
      setNote("");
    }
  };

  const handleSubmitWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount > 0) {
      dispatch(
        withdraw({
          amount: numAmount,
          category,
          title:
            category === "groceries"
              ? "Supermarché & Alimentation"
              : category === "bills"
              ? "Facture / Services Publics"
              : category === "leisure"
              ? "Sortie & Restauration"
              : category === "shopping"
              ? "Achats & Équipements"
              : "Retrait d'espèces DAB",
          note: note.trim() || undefined,
        })
      );
      setAmount("");
      setNote("");
    }
  };

  const handleSubmitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRecipient = recipient.trim() || "Bénéficiaire";
    if (numAmount > 0 && finalRecipient) {
      dispatch(
        transfer({
          amount: numAmount,
          recipient: finalRecipient,
          note: note.trim() || "Virement instantané NovaBank",
        })
      );
      setAmount("");
      setRecipient("");
      setNote("");
      setSelectedBeneficiaryId("");
    }
  };

  return (
    <div className="slate-card" style={{ padding: "1.75rem", background: "#ffffff" }}>
      {/* Tab Switcher: Light Gray & Beige Pill Bar */}
      <div
        style={{
          display: "flex",
          background: "var(--gray-100)",
          padding: "4px",
          borderRadius: "12px",
          border: "1px solid var(--border-card)",
          marginBottom: "1.5rem",
          gap: "4px",
        }}
      >
        <button
          onClick={() => {
            setActiveTab("deposit");
            setCategory("salary");
          }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.625rem",
            border: "none",
            borderRadius: "8px",
            background: activeTab === "deposit" ? "var(--cyan)" : "transparent",
            color: activeTab === "deposit" ? "#ffffff" : "var(--text-secondary)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "all 0.15s ease",
            boxShadow: activeTab === "deposit" ? "0 2px 8px rgba(8, 145, 178, 0.25)" : "none",
          }}
        >
          <ArrowDownLeft size={16} />
          <span>Dépôt / Crédit</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("withdraw");
            setCategory("groceries");
          }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.625rem",
            border: "none",
            borderRadius: "8px",
            background: activeTab === "withdraw" ? "#ffffff" : "transparent",
            color: activeTab === "withdraw" ? "var(--text-primary)" : "var(--text-secondary)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "all 0.15s ease",
            boxShadow: activeTab === "withdraw" ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none",
          }}
        >
          <ArrowUpRight size={16} />
          <span>Retrait / Débit</span>
        </button>

        <button
          onClick={() => setActiveTab("transfer")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.625rem",
            border: "none",
            borderRadius: "8px",
            background: activeTab === "transfer" ? "var(--cyan)" : "transparent",
            color: activeTab === "transfer" ? "#ffffff" : "var(--text-secondary)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "all 0.15s ease",
            boxShadow: activeTab === "transfer" ? "0 2px 8px rgba(8, 145, 178, 0.25)" : "none",
          }}
        >
          <Send size={16} />
          <span>Virement Express</span>
        </button>
      </div>

      {/* FORM: DEPOSIT */}
      {activeTab === "deposit" && (
        <form onSubmit={handleSubmitDeposit}>
          {/* Quick Amounts */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Montants rapides prédéfinis
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[100, 500, 1000, 2500, 5000].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleQuickAmount(val)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "8px",
                    border: numAmount === val ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                    background: numAmount === val ? "var(--cyan-bg)" : "var(--gray-50)",
                    color: numAmount === val ? "var(--cyan-deep)" : "var(--text-primary)",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    transition: "all 0.15s ease",
                  }}
                >
                  +{val.toLocaleString()} {currency}
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Montant à déposer ({currency})
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              required
              className="custom-input"
              placeholder="2500.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Professional Category Selector */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Catégorie de revenu
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
              {depositCategories.map((item) => {
                const Icon = item.icon;
                const isSelected = category === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.625rem 0.75rem",
                      borderRadius: "8px",
                      border: isSelected ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                      background: isSelected ? "var(--cyan-bg)" : "var(--gray-50)",
                      color: isSelected ? "var(--cyan-deep)" : "var(--text-primary)",
                      cursor: "pointer",
                      fontSize: "0.8125rem",
                      fontWeight: isSelected ? 700 : 500,
                      transition: "all 0.15s ease",
                      textAlign: "left",
                    }}
                  >
                    <Icon size={16} color={isSelected ? "var(--cyan)" : "#64748b"} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Note ou Libellé (Optionnelle)
            </label>
            <input
              type="text"
              className="custom-input"
              placeholder="Ex: Facture prestation validée"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={numAmount <= 0}
            className="btn-action btn-cyan"
            style={{ width: "100%", padding: "0.875rem", fontSize: "0.9375rem" }}
          >
            <ArrowDownLeft size={18} />
            <span>
              Créditer le compte (+{numAmount > 0 ? numAmount.toLocaleString() : "0.00"} {currency})
            </span>
          </button>
        </form>
      )}

      {/* FORM: WITHDRAW */}
      {activeTab === "withdraw" && (
        <form onSubmit={handleSubmitWithdraw}>
          {card.isFrozen && (
            <div
              style={{
                background: "var(--rose-bg)",
                border: "1px solid var(--rose-border)",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--rose)",
                fontSize: "0.8125rem",
              }}
            >
              <AlertCircle size={16} />
              <span>Carte verrouillée : débloquez la carte pour effectuer un débit.</span>
            </div>
          )}

          {/* Quick Amounts */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Montants rapides
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[100, 200, 500, 1000, 2000].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleQuickAmount(val)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "8px",
                    border: numAmount === val ? "1px solid #a89475" : "1px solid var(--border-card)",
                    background: numAmount === val ? "var(--beige-bg)" : "var(--gray-50)",
                    color: numAmount === val ? "#786447" : "var(--text-primary)",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    transition: "all 0.15s ease",
                  }}
                >
                  -{val.toLocaleString()} {currency}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Montant à retirer ({currency})
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              required
              className="custom-input"
              placeholder="500.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Category Selector */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Catégorie de dépense
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
              {withdrawCategories.map((item) => {
                const Icon = item.icon;
                const isSelected = category === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.625rem 0.75rem",
                      borderRadius: "8px",
                      border: isSelected ? "1px solid #a89475" : "1px solid var(--border-card)",
                      background: isSelected ? "var(--beige-bg)" : "var(--gray-50)",
                      color: isSelected ? "#786447" : "var(--text-primary)",
                      cursor: "pointer",
                      fontSize: "0.8125rem",
                      fontWeight: isSelected ? 700 : 500,
                      transition: "all 0.15s ease",
                      textAlign: "left",
                    }}
                  >
                    <Icon size={16} color={isSelected ? "#786447" : "#64748b"} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Note ou Justificatif (Optionnelle)
            </label>
            <input
              type="text"
              className="custom-input"
              placeholder="Ex: Achat fournitures bureau"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={numAmount <= 0 || numAmount > solde || card.isFrozen}
            className="btn-action btn-beige"
            style={{ width: "100%", padding: "0.875rem", fontSize: "0.9375rem" }}
          >
            <ArrowUpRight size={18} />
            <span>
              Débiter le compte (-{numAmount > 0 ? numAmount.toLocaleString() : "0.00"} {currency})
            </span>
          </button>
        </form>
      )}

      {/* FORM: TRANSFER */}
      {activeTab === "transfer" && (
        <form onSubmit={handleSubmitTransfer}>
          {/* Quick Beneficiaries */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Bénéficiaires enregistrés
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.625rem" }}>
              {beneficiaries.map((ben) => {
                const isSelected = selectedBeneficiaryId === ben.id;
                return (
                  <button
                    type="button"
                    key={ben.id}
                    onClick={() => {
                      setSelectedBeneficiaryId(ben.id);
                      setRecipient(ben.name);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.625rem",
                      borderRadius: "10px",
                      background: isSelected ? "var(--cyan-bg)" : "var(--gray-50)",
                      border: isSelected ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: isSelected ? "var(--cyan)" : "var(--beige-200)",
                        color: isSelected ? "#ffffff" : "#786447",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {ben.name[0]}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ben.name.split(" ")[0]}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.65rem", color: "var(--text-secondary)" }}>
                        {ben.bank.split(" ")[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.35rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Destinataire ou RIB
              </label>
              <input
                type="text"
                required
                className="custom-input"
                placeholder="Ex: Fatima Zahra"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setSelectedBeneficiaryId("");
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.35rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Montant ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                className="custom-input"
                placeholder="1200.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Motif du virement
            </label>
            <input
              type="text"
              className="custom-input"
              placeholder="Ex: Remboursement projet"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
            }}
          >
            <span>Frais interbancaires :</span>
            <span style={{ color: "var(--cyan-deep)", fontWeight: 700 }}>0.00 {currency} (GRATUIT)</span>
          </div>

          <button
            type="submit"
            disabled={numAmount <= 0 || numAmount > solde || !recipient.trim()}
            className="btn-action btn-cyan"
            style={{
              width: "100%",
              padding: "0.875rem",
              fontSize: "0.9375rem",
            }}
          >
            <Send size={18} />
            <span>
              Valider le virement ({numAmount > 0 ? numAmount.toLocaleString() : "0.00"} {currency})
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
