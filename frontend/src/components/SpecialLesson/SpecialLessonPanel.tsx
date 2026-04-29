"use client";
import React from "react";
import { speakAr } from "@/lib/speech";

export interface SpecialCard {
  icon: string;
  title: string;
  text: string;
}

export interface SpecialLessonConfig {
  type: "trial" | "review";
  kicker: string;
  title: string;
  body: string;
  heroLetters?: string[];  // review: letters to display big
  heroIsTrial?: boolean;   // trial: show car demo
  cards: SpecialCard[];
  stripLabel: string;
  readingText: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  onClose: () => void;
}

export function SpecialLessonPanel({
  type, kicker, title, body, heroLetters, heroIsTrial,
  cards, stripLabel, readingText, primaryLabel, onPrimary, onClose,
}: SpecialLessonConfig) {
  const accentColor = type === "trial" ? "#185FA5" : "#059669";

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.shell}>
        {/* Back button */}
        <button style={s.backBtn} onClick={onClose}>
          <i className="fas fa-chevron-right" /> رجوع
        </button>

        {/* Hero panel */}
        <section style={{ ...s.panel, borderColor: `${accentColor}30` }}>
          <div style={s.copy}>
            <span style={{ ...s.kicker, background: `${accentColor}15`, color: accentColor }}>
              {kicker}
            </span>
            <h1 style={{ ...s.h1, color: accentColor }}>{title}</h1>
            <p style={s.body}>{body}</p>
          </div>

          {/* Hero visual */}
          {heroIsTrial ? (
            <div style={s.trialHero} aria-hidden="true">
              <div style={s.arabicWindow}>
                <span style={{ fontSize: "1rem", opacity: 0.7 }}>نافذة</span>
                <strong style={{ fontSize: "1.6rem" }}>العربية</strong>
              </div>
              <div style={s.carDemo}>
                <span style={s.wheel} />
                <span style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "3.5rem", color: accentColor, fontWeight: 900 }}>أ</span>
                <span style={s.wheel} />
              </div>
            </div>
          ) : heroLetters && (
            <div style={s.reviewHero} aria-hidden="true">
              {heroLetters.map((l) => (
                <span key={l} onClick={() => speakAr(l)}
                  style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "3.5rem", color: accentColor, cursor: "pointer", background: `${accentColor}12`, border: `2px solid ${accentColor}40`, borderRadius: "16px", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {l}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Cards grid */}
        <div style={s.cardsGrid}>
          {cards.map((card, i) => (
            <article key={i} style={{ ...s.card, borderColor: `${accentColor}25` }}>
              <i className={`fas ${card.icon}`} style={{ fontSize: "1.8rem", color: accentColor, marginBottom: "10px" }} />
              <h3 style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 900, fontSize: "1rem", color: "var(--text, #1f2937)", margin: "0 0 6px", direction: "rtl" }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "0.85rem", color: "var(--text-muted, #6b7280)", margin: 0, lineHeight: 1.7, direction: "rtl" }}>
                {card.text}
              </p>
            </article>
          ))}
        </div>

        {/* Reading strip */}
        <section style={{ ...s.strip, borderColor: `${accentColor}30`, background: `${accentColor}08` }}>
          <div style={{ fontSize: "0.75rem", color: accentColor, fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "sans-serif" }}>
            {stripLabel}
          </div>
          <div onClick={() => speakAr(readingText.replace(/[+\s=]/g, " ").trim(), 0.6)}
            style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem", color: "var(--text, #1f2937)", direction: "rtl", cursor: "pointer", lineHeight: 1.6 }}>
            {readingText}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginTop: "6px" }}>
            🔊 اضغط للاستماع — Tap to listen
          </div>
        </section>

        {/* Actions */}
        <div style={s.actions}>
          {primaryLabel && onPrimary && (
            <button style={{ ...s.primaryBtn, background: accentColor }} onClick={onPrimary}>
              {primaryLabel} <i className="fas fa-arrow-left" />
            </button>
          )}
          <button style={s.secondaryBtn} onClick={onClose}>
            العودة للخريطة <i className="fas fa-map" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 200,
    overflowY: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
  },
  shell: {
    background: "var(--bg, #f8fafc)",
    borderRadius: "28px",
    maxWidth: "1000px",
    width: "100%",
    padding: "28px 24px 40px",
    position: "relative",
    margin: "auto",
    boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
  },
  backBtn: {
    background: "transparent",
    border: "1.5px solid var(--border, #e5e7eb)",
    borderRadius: "12px",
    padding: "8px 18px",
    cursor: "pointer",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontWeight: 700,
    fontSize: "0.9rem",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  panel: {
    background: "#fff",
    border: "2px solid",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "20px",
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  copy: {
    flex: 1,
    minWidth: "200px",
    textAlign: "right",
    direction: "rtl",
  },
  kicker: {
    display: "inline-block",
    borderRadius: "100px",
    padding: "4px 14px",
    fontSize: "0.75rem",
    fontWeight: 700,
    fontFamily: "var(--font-tajawal), sans-serif",
    marginBottom: "10px",
  },
  h1: {
    fontFamily: "var(--font-tajawal), sans-serif",
    fontSize: "1.6rem",
    fontWeight: 900,
    margin: "0 0 8px",
  },
  body: {
    fontFamily: "var(--font-noto-naskh), serif",
    fontSize: "1rem",
    color: "var(--text, #1f2937)",
    lineHeight: 1.8,
    margin: 0,
  },
  trialHero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  arabicWindow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f0fdf4",
    border: "2px solid #10b981",
    borderRadius: "16px",
    padding: "12px 24px",
    fontFamily: "var(--font-tajawal), sans-serif",
  },
  carDemo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  wheel: {
    display: "inline-block",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "3px solid #185FA5",
    background: "#185FA520",
  },
  reviewHero: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    border: "2px solid",
    borderRadius: "16px",
    padding: "18px 16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  strip: {
    border: "2px solid",
    borderRadius: "16px",
    padding: "20px 24px",
    textAlign: "center",
    marginBottom: "24px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    padding: "12px 28px",
    fontWeight: 900,
    cursor: "pointer",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  },
  secondaryBtn: {
    background: "transparent",
    border: "1.5px solid var(--border, #e5e7eb)",
    borderRadius: "14px",
    padding: "12px 24px",
    cursor: "pointer",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontWeight: 700,
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};
