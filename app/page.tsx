"use client";

import React from "react";
import Link from "next/link";
import RecruiterHeader from "./components/RecruiterHeader";
import StatsCards from "./components/StatsCards";
import CashFlowChart from "./components/CashFlowChart";
import VirtualCard from "./components/VirtualCard";
import TransactionHistory from "./components/TransactionHistory";
import AnalyticsBreakdown from "./components/AnalyticsBreakdown";
import {
  ArrowDownLeft,
  Send,
  Receipt,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* 1. Recruiter Project Showcase & Architecture Hero Header */}
      <RecruiterHeader />

      {/* 2. Aggregate Balance & Inflow/Outflow Metrics */}
      <StatsCards />

      {/* 3. Interactive Cash Flow Activity SVG Chart */}
      <CashFlowChart />

      {/* 4. Quick Action Shortcuts Banner */}
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
            <Zap size={18} color="var(--cyan)" />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Raccourcis d'Opérations Bancaires
            </p>
            <p style={{ margin: "0.15rem 0 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Exécutez vos mouvements de fonds instantanément avec mise à jour du store Redux
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
          <Link
            href="/operations"
            className="btn-action btn-cyan"
            style={{ padding: "0.5rem 1.1rem", fontSize: "0.8125rem" }}
          >
            <ArrowDownLeft size={15} />
            <span>Nouveau Dépôt</span>
          </Link>

          <Link
            href="/operations"
            className="btn-action btn-white"
            style={{ padding: "0.5rem 1.1rem", fontSize: "0.8125rem" }}
          >
            <Send size={15} />
            <span>Virement Express</span>
          </Link>

          <Link
            href="/transactions"
            className="btn-action btn-gray"
            style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
          >
            <Receipt size={15} />
            <span>Relevé Complet</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Left (Transactions & History), Right (Card & Analytics) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.75rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Recent Transactions Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <TransactionHistory limit={5} />

          <div style={{ textAlign: "center" }}>
            <Link
              href="/transactions"
              className="btn-action btn-gray"
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              <span>Consulter l'historique complet et exporter</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Column: Card Preview & Analytics Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <VirtualCard />
          <AnalyticsBreakdown />

          {/* Portfolio Project Showcase Footer Card */}
          <div
            className="slate-card"
            style={{
              padding: "1.5rem",
              background: "linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)",
              border: "1px solid var(--border-beige)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Sparkles size={18} color="var(--cyan)" />
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--text-primary)",
                }}
              >
                Projet Portfolio • Ilyas Ennajy
              </h3>
            </div>
            <p style={{ fontSize: "0.775rem", color: "var(--text-secondary)", margin: "0 0 1rem 0", lineHeight: 1.5 }}>
              Application bancaire complète propulsée par <strong>Next.js 16</strong> et <strong>Redux Toolkit</strong>.
              Architecture multi-pages interactive, typage strict et design exécutif haute performance.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginBottom: "1.25rem",
              }}
            >
              <span className="status-pill status-cyan" style={{ fontSize: "0.675rem" }}>
                Next.js 16
              </span>
              <span className="status-pill status-cyan" style={{ fontSize: "0.675rem" }}>
                Redux Toolkit
              </span>
              <span className="status-pill status-gray" style={{ fontSize: "0.675rem" }}>
                TypeScript
              </span>
              <span className="status-pill status-beige" style={{ fontSize: "0.675rem" }}>
                Blanc • Gris Fateh • Cyan • Beige
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://portfolio-7v49.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="btn-action btn-cyan"
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.75rem" }}
              >
                <ExternalLink size={13} />
                <span>Voir Mon Portfolio</span>
              </a>
              <a
                href="https://github.com/Ilyass123-Ng"
                target="_blank"
                rel="noreferrer"
                className="btn-action btn-gray"
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.75rem" }}
              >
                <span>GitHub Profil</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
