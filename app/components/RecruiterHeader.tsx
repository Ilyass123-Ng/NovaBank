"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "../Store/store";
import { deposit, withdraw } from "../Features/compteSlice";
import {
  Sparkles,
  Zap,
  Code2,
  ShieldCheck,
  CreditCard,
  BarChart3,
  CheckCircle2,
  X,
  Layers,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function RecruiterHeader() {
  const dispatch = useAppDispatch();
  const [showArchModal, setShowArchModal] = useState(false);

  // Quick simulation presets for recruiters to test Redux state changes with 1 click
  const handleQuickSim = (type: "deposit" | "withdraw", amount: number, title: string, category: any) => {
    if (type === "deposit") {
      dispatch(
        deposit({
          amount,
          title,
          category,
          note: "Simulation déclenchée via Scénario Démo Recruteur",
        })
      );
    } else {
      dispatch(
        withdraw({
          amount,
          title,
          category,
          note: "Simulation déclenchée via Scénario Démo Recruteur",
        })
      );
    }
  };

  return (
    <>
      <div
        className="slate-card"
        style={{
          padding: "1.75rem 2rem",
          marginBottom: "1.75rem",
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--border-beige)",
          background: "linear-gradient(135deg, #ffffff 0%, #fbf9f6 100%)",
          boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.05), 0 2px 8px -2px rgba(168, 148, 117, 0.08)",
        }}
      >
        {/* Soft atmospheric ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "350px",
            height: "100%",
            background: "radial-gradient(circle at 100% 0%, rgba(8, 145, 178, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top Badges Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "999px",
                background: "var(--cyan-bg)",
                border: "1px solid var(--cyan-border)",
                color: "var(--cyan-deep)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              <Zap size={13} color="var(--cyan)" />
              PROJET PORTFOLIO • INGÉNIERIE FINTECH
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "999px",
                background: "var(--beige-bg)",
                border: "1px solid var(--beige-border)",
                color: "#786447",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              <Sparkles size={13} color="#a89475" />
              Next.js 16 • Redux Toolkit • TypeScript
            </span>
          </div>

          <button
            onClick={() => setShowArchModal(true)}
            type="button"
            className="btn-action btn-white"
            style={{
              padding: "0.4rem 0.85rem",
              fontSize: "0.75rem",
              gap: "0.4rem",
            }}
          >
            <Code2 size={14} color="var(--cyan)" />
            <span>Architecture & Code Source</span>
          </button>
        </div>

        {/* Main Pitch Title & Description */}
        <div style={{ maxWidth: "880px", marginBottom: "1.25rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.65rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            NovaBank — Plateforme de Trésorerie Digitale & Simulation Bancaire
          </h2>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
            }}
          >
            Conçue pour illustrer l'architecture d'un système bancaire moderne et robuste : gestion d'état immuable et prédictible via <strong>Redux Toolkit</strong>, calculs de soldes temps réel, simulation d'émission de cartes Visa EMV avec verrouillage cryptographique, et analyse budgétaire automatisée.
          </p>
        </div>

        {/* 4 Architectural Highlight Pillars (Immediate clarity for recruiters) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-card)",
              borderRadius: "10px",
              padding: "0.75rem 0.85rem",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <Layers size={14} color="var(--cyan)" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Redux Toolkit Centralisé
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Mutations atomiques, actions typées & persistance sans effet de bord.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-card)",
              borderRadius: "10px",
              padding: "0.75rem 0.85rem",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <ShieldCheck size={14} color="var(--cyan)" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Solvabilité & Intégrité
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Contrôle strict des découverts et validation du format RIB normalisé.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-card)",
              borderRadius: "10px",
              padding: "0.75rem 0.85rem",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <CreditCard size={14} color="#a89475" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Simulation Carte EMV
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Puce NFC virtuelle, cryptogramme dynamique & gel instantané en 1 clic.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-card)",
              borderRadius: "10px",
              padding: "0.75rem 0.85rem",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <BarChart3 size={14} color="var(--cyan)" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Audit Budgétaire 50/30/20
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Classification automatique des dépenses et export de relevé bancaire CSV.
            </p>
          </div>
        </div>

        {/* 1-Click Interactive Recruiter Simulation Bar */}
        <div
          style={{
            padding: "0.85rem 1rem",
            background: "var(--beige-50)",
            borderRadius: "10px",
            border: "1px dashed var(--beige-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cyan-deep)" }}>
              ⚡ Scénarios Recruteur (1 Clic) :
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
              Testez la réactivité Redux en injectant des flux financiers réels :
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => handleQuickSim("deposit", 12500, "Virement Client E-Commerce", "freelance")}
              type="button"
              className="btn-action btn-white"
              style={{ padding: "0.35rem 0.65rem", fontSize: "0.7rem" }}
            >
              <ArrowDownLeft size={13} color="var(--cyan)" />
              <span>+ Facture Client (+12.5k)</span>
            </button>

            <button
              onClick={() => handleQuickSim("deposit", 5000, "Prime Performance Q3", "salary")}
              type="button"
              className="btn-action btn-white"
              style={{ padding: "0.35rem 0.65rem", fontSize: "0.7rem" }}
            >
              <ArrowDownLeft size={13} color="var(--cyan)" />
              <span>+ Prime (+5k)</span>
            </button>

            <button
              onClick={() => handleQuickSim("withdraw", 2300, "Achat Écran Dell 4K & Hub", "shopping")}
              type="button"
              className="btn-action btn-white"
              style={{ padding: "0.35rem 0.65rem", fontSize: "0.7rem" }}
            >
              <ArrowUpRight size={13} color="#a89475" />
              <span>- Matériel Dev (-2.3k)</span>
            </button>

            <button
              onClick={() => handleQuickSim("withdraw", 650, "Hébergement Cloud AWS & Vercel", "bills")}
              type="button"
              className="btn-action btn-white"
              style={{ padding: "0.35rem 0.65rem", fontSize: "0.7rem" }}
            >
              <ArrowUpRight size={13} color="#a89475" />
              <span>- Infra Cloud (-650)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recruiter Technical Architecture Modal */}
      {showArchModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setShowArchModal(false)}
        >
          <div
            className="slate-card"
            style={{
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "2rem",
              background: "#ffffff",
              border: "1px solid var(--border-card)",
              boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Code2 size={20} color="var(--cyan)" />
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  Spécifications Techniques • NovaBank
                </h3>
              </div>
              <button
                onClick={() => setShowArchModal(false)}
                type="button"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  padding: "0.25rem",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <div style={{ background: "var(--gray-50)", border: "1px solid var(--border-card)", padding: "1rem", borderRadius: "10px" }}>
                <h4 style={{ color: "var(--cyan-deep)", margin: "0 0 0.5rem 0", fontSize: "0.95rem" }}>
                  1. Architecture du State Management (Redux Toolkit)
                </h4>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  Le store global est géré via <code>compteSlice.ts</code> configuré avec <code>configureStore</code>. Les reducers implémentent Immer pour garantir une immuabilité parfaite tout en autorisant une écriture directe lisible. Le calcul du solde disponible et le débit sur carte sont atomiques.
                </p>
              </div>

              <div style={{ background: "var(--beige-50)", border: "1px solid var(--beige-border)", padding: "1rem", borderRadius: "10px" }}>
                <h4 style={{ color: "#786447", margin: "0 0 0.5rem 0", fontSize: "0.95rem" }}>
                  2. Simulation Carte EMV & Cryptographie
                </h4>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  Simulation d'une carte Visa Infinite intégrant une puce physique interactive, validation de l'algorithme de Luhn pour la numérotation, basculement sécurisé du cryptogramme CVV et mécanisme de gel instantané prévenant tout débit frauduleux.
                </p>
              </div>

              <div style={{ background: "var(--gray-50)", border: "1px solid var(--border-card)", padding: "1rem", borderRadius: "10px" }}>
                <h4 style={{ color: "var(--cyan-deep)", margin: "0 0 0.5rem 0", fontSize: "0.95rem" }}>
                  3. Export Comptable & Analytics Budgétaire
                </h4>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  Moteur d'export de relevé bancaire générant des fichiers CSV conformes aux normes d'audit comptable. L'analytique budgétaire applique la règle universelle 50/30/20 (Besoins, Envies, Épargne) avec calcul du score de santé financière.
                </p>
              </div>

              <div style={{ background: "var(--gray-50)", border: "1px solid var(--border-card)", padding: "1rem", borderRadius: "10px" }}>
                <h4 style={{ color: "var(--text-primary)", margin: "0 0 0.5rem 0", fontSize: "0.95rem" }}>
                  4. Stack Technique & Optimisations
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <span className="status-pill status-cyan">Next.js 16 (App Router)</span>
                  <span className="status-pill status-cyan">Redux Toolkit 2.x</span>
                  <span className="status-pill status-gray">TypeScript 5 Strict</span>
                  <span className="status-pill status-beige">Blanc • Gris Fateh • Cyan • Beige</span>
                  <span className="status-pill status-gray">Lucide React Pro Icons</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowArchModal(false)}
                type="button"
                className="btn-action btn-cyan"
                style={{ padding: "0.5rem 1.25rem" }}
              >
                Fermer la vue d'architecture
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
