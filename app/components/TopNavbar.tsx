"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { setCurrency, loadDemoData, resetAccount } from "../Features/compteSlice";
import {
  Sparkles,
  RotateCcw,
  Clock,
} from "lucide-react";

export default function TopNavbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.compte.currency);
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

  const getPageTitle = () => {
    switch (pathname) {
      case "/operations":
        return { title: "Opérations & Virements", desc: "Dépôts, retraits et virements instantanés interbancaires" };
      case "/transactions":
        return { title: "Historique des Transactions", desc: "Suivi détaillé, recherche et export de relevé bancaire CSV" };
      case "/cards":
        return { title: "Mes Cartes Bancaires", desc: "Gestion des cartes virtuelles, sécurité NFC et plafonds" };
      case "/analytics":
        return { title: "Analytique & Budget", desc: "Score de santé financière et ventilation des dépenses" };
      default:
        return { title: "Tableau de bord", desc: "Vue d'ensemble de la trésorerie et flux financiers" };
    }
  };

  const pageMeta = getPageTitle();

  const handleReset = () => {
    if (window.confirm("Voulez-vous réinitialiser le compte et l'historique ?")) {
      dispatch(resetAccount());
    }
  };

  return (
    <header
      style={{
        height: "72px",
        background: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 40,
        boxShadow: "0 2px 14px rgba(15, 23, 42, 0.03)",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            margin: 0,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {pageMeta.title}
        </h1>
        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
          {pageMeta.desc}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Casablanca Live Clock */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            background: "var(--gray-100)",
            padding: "0.4rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid var(--border-card)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
          }}
        >
          <Clock size={13} color="var(--cyan)" />
          <span suppressHydrationWarning>{time || "12:00:00"} (Casablanca)</span>
        </div>

        {/* Currency Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--gray-100)",
            padding: "2px",
            borderRadius: "8px",
            border: "1px solid var(--border-card)",
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
                  background: isActive ? "var(--cyan)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: isActive ? 800 : 600,
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 1px 6px rgba(8, 145, 178, 0.25)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {curr}
              </button>
            );
          })}
        </div>

        {/* Demo Button */}
        <button
          onClick={() => dispatch(loadDemoData())}
          className="btn-action btn-beige"
          style={{ padding: "0.4rem 0.85rem", fontSize: "0.75rem" }}
          title="Charger un jeu de données de test"
        >
          <Sparkles size={13} color="#786447" />
          <span>Démo Portfolio</span>
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="btn-action btn-gray"
          style={{ padding: "0.4rem 0.85rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}
          title="Réinitialiser"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
}
