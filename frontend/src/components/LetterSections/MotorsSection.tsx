"use client";
import React from "react";
import type { SectionProps } from "@/types/letter";
import { speakAr } from "@/lib/speech";

const HARAKAT = [
  { symbol: "\u064e", name: "فتحة", nameEn: "Fatha", color: "#ef4444", desc: 'Short "a" sound' },
  { symbol: "\u0650", name: "كسرة", nameEn: "Kasra", color: "#3b82f6", desc: 'Short "i" sound' },
  { symbol: "\u064f", name: "ضمة",  nameEn: "Damma", color: "#10b981", desc: 'Short "u" sound' },
  { symbol: "\u0652", name: "سكون", nameEn: "Sukoon", color: "#6b7280", desc: "No vowel — stop!" },
  { symbol: "\u0651", name: "شدة",  nameEn: "Shadda", color: "#f59e0b", desc: "Double consonant!" },
];

export function MotorsSection({ letterId, onComplete }: SectionProps) {
  return (
    <div className="section-content">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "28px" }}>
        <span className="section-badge">⚡</span> الحركات — Vowel Marks
      </div>
      <p style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "28px", fontSize: "0.95rem" }}>
        Tap each tile to hear how the letter sounds with each vowel mark
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", maxWidth: "700px", margin: "0 auto 36px" }}>
        {HARAKAT.map((h) => {
          const combined = letterId + h.symbol;
          return (
            <button
              key={h.symbol}
              onClick={() => speakAr(combined, 0.7)}
              style={{
                background: `${h.color}12`,
                border: `2.5px solid ${h.color}`,
                borderRadius: "20px",
                padding: "24px 16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "3.5rem", color: h.color, lineHeight: 1, direction: "rtl" }}>
                {combined}
              </div>
              <div style={{ fontWeight: 900, color: h.color, fontFamily: "var(--font-tajawal), sans-serif" }}>{h.name}</div>
              <div style={{ fontSize: "0.8rem", color: h.color, fontFamily: "sans-serif" }}>{h.nameEn}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>{h.desc}</div>
              <div style={{ fontSize: "1.4rem" }}>🔊</div>
            </button>
          );
        })}
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="btn-primary" onClick={onComplete}>
          التالي <i className="fas fa-arrow-left" />
        </button>
      </div>
    </div>
  );
}
