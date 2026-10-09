"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../Store/store";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Receipt,
  CreditCard,
  BarChart3,
  Wallet,
  ExternalLink,
  Crown,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { solde, currency } = useAppSelector((state) => state.compte);

  const navItems = [
    { label: "Tableau de bord", href: "/", icon: LayoutDashboard },
    { label: "Opérations", href: "/operations", icon: ArrowLeftRight },
    { label: "Transactions", href: "/transactions", icon: Receipt },
    { label: "Mes Cartes", href: "/cards", icon: CreditCard },
    { label: "Analytique & Budget", href: "/analytics", icon: BarChart3 },
  ];

  return (
    <aside
      className="sidebar-glass"
      style={{
        width: "260px",
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.25rem 1rem",
        zIndex: 50,
        boxShadow: "4px 0 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Antigravity Moving Squares Grid Layer & Ambient Glows */}
      <div className="sidebar-grid-pattern" aria-hidden="true" />
      <div className="sidebar-glow-cyan" aria-hidden="true" />
      <div className="sidebar-glow-beige" aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
            color: "inherit",
            marginBottom: "1.75rem",
            paddingLeft: "0.5rem",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(8, 145, 178, 0.25)",
            }}
          >
            <Wallet size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                NovaBank
              </span>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 8px var(--cyan)",
                }}
              />
            </div>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>
              Banque Digitale Redux
            </p>
          </div>
        </Link>

        {/* Live Balance Widget in Sidebar */}
        <div
          style={{
            background: "rgba(250, 248, 245, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--beige-border)",
            borderRadius: "12px",
            padding: "0.875rem",
            marginBottom: "1.5rem",
            borderLeft: "3px solid var(--cyan)",
            boxShadow: "0 2px 10px rgba(223, 210, 188, 0.25)",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Solde disponible
          </p>
          <p style={{ margin: "0.2rem 0 0 0", fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
            {solde.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}{" "}
            <span style={{ fontSize: "0.8125rem", color: "var(--cyan)", fontWeight: 700 }}>{currency}</span>
          </p>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--cyan-deep)" : "var(--text-secondary)",
                  background: isActive ? "rgba(8, 145, 178, 0.1)" : "transparent",
                  border: isActive ? "1px solid rgba(8, 145, 178, 0.25)" : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={17} color={isActive ? "var(--cyan)" : "#64748b"} />
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--cyan)",
                      boxShadow: "0 0 8px var(--cyan)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Profile Badge */}
      <div
        style={{
          borderTop: "1px solid rgba(226, 232, 240, 0.8)",
          paddingTop: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "var(--beige-100)",
              border: "1px solid var(--beige-border)",
              color: "#786447",
              fontSize: "0.75rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            IE
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Ilyas Ennajy
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <span
                className="status-pill status-beige"
                style={{ fontSize: "0.625rem", padding: "1px 6px" }}
              >
                <Crown size={10} color="#786447" />
                <span>Titulaire Gold VIP</span>
              </span>
            </div>
          </div>
        </div>

        <a
          href="https://portfolio-7v49.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="btn-action btn-gray"
          style={{
            width: "100%",
            fontSize: "0.75rem",
            padding: "0.45rem",
            borderRadius: "8px",
            gap: "0.35rem",
          }}
        >
          <span>Portfolio Développeur</span>
          <ExternalLink size={12} color="var(--cyan)" />
        </a>
      </div>
    </aside>
  );
}
