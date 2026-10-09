"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { clearNotification, clearError } from "../Features/compteSlice";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export default function ToastNotification() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.compte.notification);
  const error = useAppSelector((state) => state.compte.error);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!notification && !error) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "400px",
        width: "calc(100vw - 3rem)",
      }}
    >
      {error && (
        <div
          className="toast-animate"
          style={{
            background: "#ffffff",
            border: "1px solid var(--rose-border)",
            borderRadius: "12px",
            padding: "0.85rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <AlertTriangle size={18} color="var(--rose)" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.8125rem", color: "var(--rose)" }}>
                Opération Refusée
              </p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)" }}>{error}</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(clearError())}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {notification && (
        <div
          className="toast-animate"
          style={{
            background: "#ffffff",
            border: `1px solid ${
              notification.type === "success"
                ? "var(--cyan-border)"
                : notification.type === "error"
                ? "var(--rose-border)"
                : "var(--border-subtle)"
            }`,
            borderRadius: "12px",
            padding: "0.85rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            {notification.type === "success" ? (
              <CheckCircle2 size={18} color="var(--cyan)" style={{ flexShrink: 0 }} />
            ) : notification.type === "error" ? (
              <AlertTriangle size={18} color="var(--rose)" style={{ flexShrink: 0 }} />
            ) : (
              <Info size={18} color="var(--cyan)" style={{ flexShrink: 0 }} />
            )}
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-primary)", fontWeight: 600 }}>
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => dispatch(clearNotification())}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
