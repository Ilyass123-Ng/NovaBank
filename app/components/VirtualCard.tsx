"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { toggleFreezeCard } from "../Features/compteSlice";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  Eye,
  EyeOff,
  Wifi,
  CreditCard,
} from "lucide-react";

export default function VirtualCard() {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.compte.card);
  const currency = useAppSelector((state) => state.compte.currency);
  const solde = useAppSelector((state) => state.compte.solde);

  const [showFullNumber, setShowFullNumber] = useState(false);
  const [copiedRib, setCopiedRib] = useState(false);

  const ribNumber = "230 780 0001234567890123 45";

  const handleCopyRib = () => {
    navigator.clipboard.writeText(ribNumber.replace(/\s/g, ""));
    setCopiedRib(true);
    setTimeout(() => setCopiedRib(false), 2000);
  };

  return (
    <div className="slate-card" style={{ padding: "1.5rem", background: "#ffffff" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CreditCard size={18} color="var(--cyan)" />
          <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            Carte Visa Infinite
          </h2>
        </div>
        <span
          className={`status-pill ${card.isFrozen ? "status-rose" : "status-cyan"}`}
        >
          {card.isFrozen ? "Carte Gelée" : "Active & Sécurisée"}
        </span>
      </div>

      {/* Luxury Pearl Platinum & Champagne Beige Debit Card */}
      <div className="virtual-card-wrapper" style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: 1.586,
            borderRadius: "18px",
            padding: "1.5rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #fbf9f5 0%, #f4ede3 50%, #e8dcce 100%)",
            border: "1px solid #dfd2bc",
            boxShadow: "0 14px 30px -6px rgba(168, 148, 117, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            userSelect: "none",
          }}
        >
          {/* Frozen State Overlay */}
          {card.isFrozen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(4px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.375rem",
                zIndex: 10,
                borderRadius: "18px",
                border: "1px solid var(--rose-border)",
              }}
            >
              <Lock size={32} color="var(--rose)" />
              <p
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--rose)",
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                CARTE VERROUILLÉE
              </p>
              <p style={{ fontSize: "0.725rem", color: "var(--text-secondary)", margin: 0 }}>
                Débits et retraits suspendus
              </p>
            </div>
          )}

          {/* Card Top: Bank Title + Contactless */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  fontSize: "1.05rem",
                  color: "#1e293b",
                }}
              >
                NOVABANK
              </span>
              <span
                style={{
                  fontSize: "0.625rem",
                  background: "var(--beige-200)",
                  border: "1px solid var(--beige-300)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  color: "#786447",
                  fontWeight: 700,
                }}
              >
                GOLD VIP
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Wifi size={17} color="var(--cyan)" style={{ transform: "rotate(90deg)" }} />
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: "#64748b",
                }}
              >
                DEBIT
              </span>
            </div>
          </div>

          {/* Card Chip & Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              margin: "0.75rem 0",
              zIndex: 2,
            }}
          >
            {/* Metallic Gold EMV Chip */}
            <div
              style={{
                width: "42px",
                height: "32px",
                borderRadius: "5px",
                background: "linear-gradient(135deg, #ffd700 0%, #f59e0b 50%, #b45309 100%)",
                border: "1px solid rgba(255, 215, 0, 0.6)",
                boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "2px",
                padding: "2px",
              }}
            >
              <div style={{ border: "1px solid rgba(146, 64, 14, 0.45)", borderRadius: "2px" }} />
              <div style={{ border: "1px solid rgba(146, 64, 14, 0.45)", borderRadius: "2px" }} />
              <div style={{ border: "1px solid rgba(146, 64, 14, 0.45)", borderRadius: "2px" }} />
              <div style={{ border: "1px solid rgba(146, 64, 14, 0.45)", borderRadius: "2px" }} />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullNumber(!showFullNumber);
              }}
              style={{
                background: "rgba(255, 255, 255, 0.75)",
                border: "1px solid #dfd2bc",
                color: "#1e293b",
                padding: "3px 8px",
                borderRadius: "5px",
                fontSize: "0.6875rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              {showFullNumber ? <EyeOff size={11} /> : <Eye size={11} />}
              {showFullNumber ? "Masquer" : "Afficher"}
            </button>
          </div>

          {/* Card Number */}
          <div style={{ zIndex: 2 }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#0f172a",
                margin: 0,
              }}
            >
              {showFullNumber ? "4234 8920 1145 8892" : card.number}
            </p>
          </div>

          {/* Card Bottom: Holder, Expiry & Visa */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              zIndex: 2,
              marginTop: "0.5rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  color: "#64748b",
                  margin: 0,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                }}
              >
                TITULAIRE
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {card.holder}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  color: "#64748b",
                  margin: 0,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                }}
              >
                EXPIRATION
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {card.expiry}
              </p>
            </div>

            <div
              style={{
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "1.375rem",
                letterSpacing: "-0.03em",
                color: "#786447",
              }}
            >
              VISA
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.875rem" }}>
        <button
          onClick={() => dispatch(toggleFreezeCard())}
          className="btn-action btn-gray"
          style={{
            padding: "0.55rem 0.75rem",
            fontSize: "0.8125rem",
            color: card.isFrozen ? "var(--rose)" : "var(--text-primary)",
          }}
        >
          {card.isFrozen ? <Unlock size={14} /> : <Lock size={14} />}
          <span>{card.isFrozen ? "Débloquer" : "Geler carte"}</span>
        </button>

        <button
          onClick={handleCopyRib}
          className="btn-action btn-gray"
          style={{ padding: "0.55rem 0.75rem", fontSize: "0.8125rem" }}
        >
          {copiedRib ? <Check size={14} color="var(--cyan)" /> : <Copy size={14} />}
          <span>{copiedRib ? "Copié !" : "Copier RIB"}</span>
        </button>
      </div>

      {/* Monthly Limit Bar */}
      <div
        style={{
          background: "var(--beige-50)",
          padding: "0.6875rem 0.875rem",
          borderRadius: "10px",
          border: "1px solid var(--beige-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.725rem",
            marginBottom: "0.375rem",
          }}
        >
          <span style={{ color: "var(--text-secondary)" }}>Plafond mensuel utilisé</span>
          <span style={{ fontWeight: 700, color: "var(--cyan-deep)", fontFamily: "var(--font-mono)" }}>
            {Math.min(100, Math.round((Math.max(0, 50000 - solde) / 50000) * 100))}% (50 000 {currency})
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
              width: `${Math.min(100, Math.max(12, Math.round((Math.max(0, 50000 - solde) / 50000) * 100)))}%`,
              background: "linear-gradient(90deg, #0891b2 0%, #06b6d4 100%)",
              borderRadius: "999px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
