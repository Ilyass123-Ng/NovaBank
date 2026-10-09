"use client";

import React from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import ToastNotification from "./ToastNotification";
import AntigravityGridBackground from "./AntigravityGridBackground";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", display: "flex", minHeight: "100vh", background: "var(--bg-app)" }}>
      <AntigravityGridBackground />
      <div style={{ position: "relative", zIndex: 1, display: "flex", width: "100%" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <TopNavbar />
          <main
            style={{
              flex: 1,
              padding: "2rem",
              maxWidth: "1360px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {children}
          </main>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
}
