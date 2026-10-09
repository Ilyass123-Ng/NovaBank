"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { setCurrency, loadDemoData, resetAccount } from "../Features/compteSlice";
import {
  Wallet,
  Sparkles,
  RotateCcw,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.compte.currency);
  const isCardFrozen = useAppSelector((state) => state.compte.card.isFrozen);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    if (window.confirm("Réinitialiser les données du compte à zéro ?")) {
      dispatch(resetAccount());
    }
  };

  return (
    <header
      className="glass-panel"
      style={{
        padding: "0.75rem 1.25rem",
        marginBottom: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      {/* Brand & Identity (Crisp, Monochromatic, Professional) */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "#ffffff",
            color: "#090a0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <Wallet size={19} color="#090a0f" />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h1
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                margin: 0,
                color: "#ffffff",
              }}
            >
              NovaBank
            </h1>
            <span
              className="status-pill status-neutral"
              style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem" }}
            >
              Redux Core
            </span>
          </div>
          <p
            style={{
              fontSize: "0.725rem",
              color: "var(--text-muted)",
              margin: 0,
              fontFamily: "var(--font-mono)",
            }}
          >
            Casablanca • {time || "12:00:00"}
          </p>
        </div>
      </div>

      {/* Center Controls: Currency Switcher & Demo Tools */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* Currency Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.4)",
            padding: "2px",
            borderRadius: "8px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {(["MAD", "EUR", "USD"] as const).map((curr) => {
            const isActive = currency === curr;
            return (
              <button
                key={curr}
                onClick={() => dispatch(setCurrency(curr))}
                style={{
                  border: "none",
                  background: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--text-muted)",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {curr}
              </button>
            );
          })}
        </div>

        {/* Load Demo Data Button */}
        <button
          onClick={() => dispatch(loadDemoData())}
          className="btn-action btn-secondary"
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
          title="Charger un jeu de données de test"
        >
          <Sparkles size={13} color="#ffffff" />
          <span>Démo Portfolio</span>
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="btn-action btn-secondary"
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", color: "var(--text-muted)" }}
          title="Réinitialiser"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* User Profile Capsule (Clean & Minimalist) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          background: "rgba(255, 255, 255, 0.02)",
          padding: "0.3rem 0.625rem 0.3rem 0.35rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            background: "#1f2430",
            color: "#e4e4e7",
            fontWeight: 700,
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          IE
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ffffff" }}>
              Ilyas Ennajy
            </span>
            <ShieldCheck size={13} color="#10b981" />
          </div>
          <p style={{ margin: 0, fontSize: "0.675rem", color: "var(--text-muted)" }}>
            {isCardFrozen ? "Carte verrouillée" : "Compte vérifié"}
          </p>
        </div>
      </div>
    </header>
  );
}
