"use client";

import React from "react";
import Navbar from "./Navbar";
import StatsCards from "./StatsCards";
import VirtualCard from "./VirtualCard";
import OperationPanel from "./OperationPanel";
import TransactionHistory from "./TransactionHistory";
import AnalyticsBreakdown from "./AnalyticsBreakdown";
import ToastNotification from "./ToastNotification";
import { Code2, ExternalLink, Sparkles } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function BankAccount() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.5rem",
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Toast Notification Container */}
      <ToastNotification />

      {/* Modern Top Header / Navbar */}
      <Navbar />

      {/* Aggregate Financial Metrics */}
      <StatsCards />

      {/* Main Grid: Operations + History on the Left, Virtual Card + Analytics on the Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.75rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Interactive Operations & History */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <OperationPanel />
          <TransactionHistory />
        </div>

        {/* Right Column: Virtual Card, Category Analytics & Portfolio Metadata */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <VirtualCard />
          <AnalyticsBreakdown />

          {/* Portfolio Showcase Badge */}
          <div
            className="glass-panel"
            style={{
              padding: "1.25rem",
              background: "rgba(255, 255, 255, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Sparkles size={15} color="#ffffff" />
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0, color: "#ffffff" }}>
                Architecture & Stack • Ilyas Ennajy
              </h3>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.75rem 0", lineHeight: 1.5 }}>
              Architecture bancaire propulsée par <strong>Redux Toolkit</strong> et{" "}
              <strong>Next.js 16</strong>. Gestion des états immuables, validation stricte, simulation de transactions et carte bancaire titanium.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.375rem",
                marginBottom: "0.875rem",
              }}
            >
              <span className="status-pill status-neutral" style={{ fontSize: "0.675rem" }}>
                Next.js 16
              </span>
              <span className="status-pill status-neutral" style={{ fontSize: "0.675rem" }}>
                Redux Toolkit
              </span>
              <span className="status-pill status-neutral" style={{ fontSize: "0.675rem" }}>
                TypeScript
              </span>
              <span className="status-pill status-neutral" style={{ fontSize: "0.675rem" }}>
                Titanium UI
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://portfolio-7v49.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="btn-action btn-secondary"
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", borderRadius: "8px" }}
              >
                <ExternalLink size={13} />
                <span>Voir Portfolio</span>
              </a>
              <a
                href="https://github.com/Ilyass123-Ng"
                target="_blank"
                rel="noreferrer"
                className="btn-action btn-secondary"
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", borderRadius: "8px" }}
              >
                <GithubIcon size={13} />
                <span>GitHub Profil</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
