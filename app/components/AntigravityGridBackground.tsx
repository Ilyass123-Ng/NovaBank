"use client";

import React, { useEffect, useState } from "react";

export default function AntigravityGridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Layer 1: Ambient Luminous Radial Lights (Cyan & Champagne Beige) */}
      <div
        className="antigravity-ambient-glow"
        style={{
          position: "absolute",
          top: "-15%",
          left: "25%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8, 145, 178, 0.07) 0%, rgba(8, 145, 178, 0.02) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="antigravity-ambient-glow-alt"
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "5%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(223, 210, 188, 0.35) 0%, rgba(245, 240, 230, 0.15) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Layer 2: Infinite Drifting Squares Grid (Mourabba3at Antigravity) */}
      <div
        className="antigravity-moving-grid"
        style={{
          position: "absolute",
          inset: "-96px",
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 95%)",
        }}
      />

      {/* Layer 3: Secondary Sub-Grid with Cyan Intersection Accents */}
      <div
        className="antigravity-moving-grid-cyan"
        style={{
          position: "absolute",
          inset: "-192px",
          backgroundImage: `
            linear-gradient(to right, rgba(8, 145, 178, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(8, 145, 178, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "192px 192px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 90%)",
        }}
      />

      {/* Layer 4: Antigravity Floating Squares (Mourabba3at li kayt7erko en lévitation) */}
      {mounted && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Floating Square 1 (Cyan outline) */}
          <div
            className="antigravity-square square-1"
            style={{
              top: "18%",
              left: "14%",
              width: "48px",
              height: "48px",
              border: "1.5px solid rgba(8, 145, 178, 0.35)",
              background: "rgba(8, 145, 178, 0.04)",
              borderRadius: "6px",
            }}
          />

          {/* Floating Square 2 (Beige luxury filled) */}
          <div
            className="antigravity-square square-2"
            style={{
              top: "42%",
              right: "12%",
              width: "64px",
              height: "64px",
              border: "1.5px solid rgba(223, 210, 188, 0.7)",
              background: "rgba(245, 240, 230, 0.5)",
              borderRadius: "8px",
            }}
          />

          {/* Floating Square 3 (Mini Cyan accent) */}
          <div
            className="antigravity-square square-3"
            style={{
              top: "70%",
              left: "22%",
              width: "32px",
              height: "32px",
              border: "1px solid rgba(8, 145, 178, 0.4)",
              background: "rgba(8, 145, 178, 0.06)",
              borderRadius: "4px",
            }}
          />

          {/* Floating Square 4 (Gris clair soft outline) */}
          <div
            className="antigravity-square square-4"
            style={{
              top: "28%",
              right: "28%",
              width: "48px",
              height: "48px",
              border: "1.5px solid rgba(203, 213, 225, 0.6)",
              background: "rgba(255, 255, 255, 0.4)",
              borderRadius: "6px",
            }}
          />

          {/* Floating Square 5 (Warm Champagne accent) */}
          <div
            className="antigravity-square square-5"
            style={{
              top: "60%",
              right: "18%",
              width: "40px",
              height: "40px",
              border: "1.5px solid rgba(223, 210, 188, 0.6)",
              background: "rgba(245, 240, 230, 0.3)",
              borderRadius: "6px",
            }}
          />

          {/* Floating Square 6 (Subtle small cyan tile) */}
          <div
            className="antigravity-square square-6"
            style={{
              top: "85%",
              left: "38%",
              width: "24px",
              height: "24px",
              border: "1px solid rgba(8, 145, 178, 0.3)",
              background: "rgba(8, 145, 178, 0.05)",
              borderRadius: "3px",
            }}
          />
        </div>
      )}
    </div>
  );
}
