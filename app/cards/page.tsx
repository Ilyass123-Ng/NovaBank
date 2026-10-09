"use client";

import React, { useState } from "react";
import VirtualCard from "../components/VirtualCard";
import { useAppDispatch, useAppSelector } from "../Store/store";
import {
  Shield,
  Crown,
} from "lucide-react";

export default function CardsPage() {
  const dispatch = useAppDispatch();
  const { card, currency } = useAppSelector((state) => state.compte);

  const [contactless, setContactless] = useState(true);
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [atmWithdrawals, setAtmWithdrawals] = useState(true);
  const [monthlyLimit, setMonthlyLimit] = useState(50000);

  const spentAmount = 32000;
  const percentageUsed = Math.min(100, Math.round((spentAmount / monthlyLimit) * 100));

  return (
    <div>
      {/* Recruiter Concept Banner for Cards Page */}
      <div
        className="slate-card"
        style={{
          padding: "1.25rem 1.5rem",
          marginBottom: "1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          background: "linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)",
          border: "1px solid var(--border-beige)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--cyan-bg)",
              border: "1px solid var(--cyan-border)",
              color: "var(--cyan)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={18} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Simulation Carte EMV & Contrôle Cryptographique
              </h3>
              <span className="status-pill status-cyan" style={{ fontSize: "0.6875rem" }}>
                Redux State Synced
              </span>
            </div>
            <p style={{ margin: "0.15rem 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Démontre le verrouillage d'état immuable, le basculement sans contact et le contrôle des plafonds TPE
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <span className="status-pill status-beige" style={{ fontSize: "0.725rem" }}>
            <Crown size={12} color="#786447" /> Visa Infinite Gold VIP
          </span>
          <span className="status-pill status-gray" style={{ fontSize: "0.725rem" }}>
            3D Secure v2.2
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.75rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Virtual Card & Limit Slider */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <VirtualCard />

          {/* Interactive Monthly Limit Slider */}
          <div className="slate-card" style={{ padding: "1.5rem", background: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Plafond de Dépenses Mensuel
              </span>
              <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--cyan-deep)", fontFamily: "var(--font-mono)" }}>
                {monthlyLimit.toLocaleString("fr-FR")} {currency}
              </span>
            </div>

            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--cyan)",
                cursor: "pointer",
                marginBottom: "0.85rem",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.725rem", color: "var(--text-secondary)" }}>
              <span>Dépenses en cours : <strong>{spentAmount.toLocaleString("fr-FR")} {currency}</strong></span>
              <span>Utilisation : <strong>{percentageUsed}%</strong></span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "var(--gray-200)",
                borderRadius: "999px",
                overflow: "hidden",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${percentageUsed}%`,
                  background: percentageUsed > 80 ? "#a89475" : "var(--cyan)",
                  borderRadius: "999px",
                  transition: "width 0.25s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Security Controls & Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Card Security Controls */}
          <div className="slate-card" style={{ padding: "1.75rem", background: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Shield size={18} color="var(--cyan)" />
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                Paramètres de Sécurité de la Carte
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Toggle 1: Contactless */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  background: "var(--gray-50)",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Paiements Sans Contact (NFC)
                  </p>
                  <p style={{ margin: "0.1rem 0 0 0", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                    Règlements rapides TPE jusqu'à 600 DH
                  </p>
                </div>
                <button
                  onClick={() => setContactless(!contactless)}
                  className={`status-pill ${contactless ? "status-cyan" : "status-gray"}`}
                  style={{ cursor: "pointer", border: "none" }}
                >
                  {contactless ? "Activé" : "Désactivé"}
                </button>
              </div>

              {/* Toggle 2: Online Payments */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  background: "var(--gray-50)",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Paiements sur Internet (3D Secure)
                  </p>
                  <p style={{ margin: "0.1rem 0 0 0", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                    E-commerce et abonnements internationaux
                  </p>
                </div>
                <button
                  onClick={() => setOnlinePayments(!onlinePayments)}
                  className={`status-pill ${onlinePayments ? "status-cyan" : "status-gray"}`}
                  style={{ cursor: "pointer", border: "none" }}
                >
                  {onlinePayments ? "Activé" : "Désactivé"}
                </button>
              </div>

              {/* Toggle 3: ATM Withdrawals */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  background: "var(--gray-50)",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Retraits aux Distributeurs DAB
                  </p>
                  <p style={{ margin: "0.1rem 0 0 0", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                    Guichets automatiques interbancaires
                  </p>
                </div>
                <button
                  onClick={() => setAtmWithdrawals(!atmWithdrawals)}
                  className={`status-pill ${atmWithdrawals ? "status-cyan" : "status-gray"}`}
                  style={{ cursor: "pointer", border: "none" }}
                >
                  {atmWithdrawals ? "Activé" : "Désactivé"}
                </button>
              </div>
            </div>
          </div>

          {/* Physical Metal Card Upgrade */}
          <div
            className="slate-card"
            style={{
              padding: "1.75rem",
              background: "linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)",
              border: "1px solid var(--border-beige)",
              color: "var(--text-primary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Crown size={18} color="#786447" />
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                  Carte Métal Physique Champagne Prestige
                </h3>
              </div>
              <span className="status-pill status-beige" style={{ fontSize: "0.65rem" }}>
                Gold VIP
              </span>
            </div>
            <p style={{ fontSize: "0.775rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 1.25rem 0" }}>
              Carte en acier satiné beige/sable découpée au laser avec conciergerie VIP 24/7 et assurance voyage internationale.
            </p>
            <button
              onClick={() => alert("Simulation de commande : Votre carte physique NovaBank Champagne Métal est en cours de production !")}
              className="btn-action btn-beige"
              style={{ width: "100%", padding: "0.75rem", fontSize: "0.875rem" }}
            >
              Commander ma carte Métal Champagne gratuite (VIP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
