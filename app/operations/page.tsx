"use client";

import React from "react";
import OperationPanel from "../components/OperationPanel";
import { useAppSelector } from "../Store/store";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function OperationsPage() {
  const { solde, currency, beneficiaries, card } = useAppSelector(
    (state) => state.compte
  );

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
        {/* Left Column: Operation Form */}
        <div>
          <OperationPanel />
        </div>

        {/* Right Column: Status & Beneficiaries */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Account Status Capsule */}
          <div className="slate-card" style={{ padding: "1.5rem" }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--gray-400)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Solde opérationnel disponible
            </p>
            <p
              style={{
                margin: "0.25rem 0 1rem 0",
                fontSize: "2.25rem",
                fontWeight: 800,
                color: "var(--cyan)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "-0.02em",
              }}
            >
              {solde.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {currency}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span className={`status-pill ${card.isFrozen ? "status-rose" : "status-cyan"}`}>
                <ShieldCheck size={13} /> {card.isFrozen ? "Carte Verrouillée" : "Carte Active"}
              </span>
              <span className="status-pill status-gray">
                <Zap size={13} color="var(--cyan)" /> Virements Instantanés 0.00 DH
              </span>
            </div>
          </div>

          {/* Registered Beneficiaries Directory */}
          <div className="slate-card" style={{ padding: "1.5rem", background: "#ffffff" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "var(--text-primary)" }}>
              Carnet des Bénéficiaires ({beneficiaries.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {beneficiaries.map((ben) => (
                <div
                  key={ben.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem",
                    background: "var(--gray-50)",
                    borderRadius: "10px",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "var(--beige-100)",
                        color: "#786447",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--beige-border)",
                      }}
                    >
                      {ben.name[0]}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {ben.name}
                      </p>
                      <p style={{ margin: "0.1rem 0 0 0", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                        {ben.bank}
                      </p>
                    </div>
                  </div>
                  <span
                    className="status-pill status-cyan"
                    style={{ fontSize: "0.675rem" }}
                  >
                    RIB Vérifié
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Rules Card */}
          <div className="slate-card" style={{ padding: "1.5rem", background: "#ffffff" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.75rem 0", color: "var(--text-primary)" }}>
              Sécurité & Architecture Redux
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", fontSize: "0.775rem", color: "var(--gray-400)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={15} color="var(--cyan)" style={{ flexShrink: 0 }} />
                <span>Tous les dépôts sont crédités en temps réel via Redux Toolkit.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={15} color="var(--cyan)" style={{ flexShrink: 0 }} />
                <span>Interdiction stricte des découverts non autorisés.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={15} color="var(--cyan)" style={{ flexShrink: 0 }} />
                <span>Le gel de carte bloque instantanément toute tentative de débit.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
