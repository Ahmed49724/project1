"use client";
import React, { useState, useMemo } from "react";
import { QURAN_VERSES } from "@/data/db";
import { speakAr } from "@/lib/speech";

type Phase = "pick" | "puzzle" | "done";

function parseVerse(raw: string) {
  return raw
    .replace(/[﴿﴾۝]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_ENTRIES = Object.entries(QURAN_VERSES) as [string, string][];

export function QuranPuzzle({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("pick");
  const [letter, setLetter] = useState<string | null>(null);
  const [available, setAvailable] = useState<{ word: string; id: number }[]>([]);
  const [placed, setPlaced] = useState<{ word: string; id: number }[]>([]);
  const [originalWords, setOriginalWords] = useState<string[]>([]);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const start = (entry: [string, string]) => {
    const [l, verse] = entry;
    const words = parseVerse(verse);
    setLetter(l);
    setOriginalWords(words);
    setAvailable(shuffle(words.map((w, i) => ({ word: w, id: i }))));
    setPlaced([]);
    setResult(null);
    setPhase("puzzle");
  };

  const pickWord = (item: { word: string; id: number }) => {
    setAvailable((a) => a.filter((w) => w.id !== item.id));
    setPlaced((p) => [...p, item]);
    speakAr(item.word, 0.8);
  };

  const returnWord = (item: { word: string; id: number }) => {
    setPlaced((p) => p.filter((w) => w.id !== item.id));
    setAvailable((a) => [...a, item]);
  };

  const check = () => {
    const correct = placed.map((p) => p.word).join(" ") === originalWords.join(" ");
    setResult(correct ? "correct" : "wrong");
    if (correct) speakAr(originalWords.join(" "), 0.75);
  };

  const tileStyle = (bg: string, border: string): React.CSSProperties => ({
    background: bg,
    border: `2px solid ${border}`,
    borderRadius: "12px",
    padding: "10px 16px",
    cursor: "pointer",
    fontFamily: "var(--font-noto-naskh), serif",
    fontSize: "1.2rem",
    direction: "rtl",
    transition: "all 0.15s",
    fontWeight: 700,
  });

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={{ fontFamily: "var(--font-tajawal), sans-serif", color: "#27ae60", margin: 0 }}>
            🕌 لغز القرآن — Quran Puzzle
          </h2>
          <button onClick={onClose} style={closeBtn}>✕ إغلاق</button>
        </div>

        {/* Phase: Pick a letter */}
        {phase === "pick" && (
          <>
            <p style={{ color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "20px" }}>
              اختر حرفاً لترتيب الآية الكريمة
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {ALL_ENTRIES.map((entry) => (
                <button key={entry[0]} onClick={() => start(entry)}
                  style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.6rem", padding: "12px 18px", borderRadius: "14px", border: "2px solid #27ae60", background: "#eaf3de", color: "#1a6b3a", cursor: "pointer", fontWeight: 700 }}>
                  {entry[0]}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Phase: Puzzle */}
        {phase === "puzzle" && (
          <>
            <div style={{ textAlign: "center", marginBottom: "12px", color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem" }}>
              حرف: <strong style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.4rem" }}>{letter}</strong> — رتّب كلمات الآية
            </div>

            {/* Placed area */}
            <div style={{ minHeight: "70px", background: "#f0fdf4", border: "2px dashed #27ae60", borderRadius: "16px", padding: "12px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", direction: "rtl", marginBottom: "16px" }}>
              {placed.length === 0 && <span style={{ color: "#9ca3af", fontFamily: "sans-serif", fontSize: "0.85rem", alignSelf: "center" }}>اضغط كلمة لإضافتها هنا</span>}
              {placed.map((item) => (
                <button key={item.id} onClick={() => returnWord(item)} style={tileStyle("#bbf7d0", "#10b981")}>
                  {item.word}
                </button>
              ))}
            </div>

            {/* Available words */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", direction: "rtl", marginBottom: "20px", padding: "12px", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
              {available.map((item) => (
                <button key={item.id} onClick={() => pickWord(item)} style={tileStyle("#fff", "#e5e7eb")}>
                  {item.word}
                </button>
              ))}
            </div>

            {result && (
              <div style={{ textAlign: "center", marginBottom: "16px", padding: "16px", borderRadius: "14px", background: result === "correct" ? "#d1fae5" : "#fee2e2", border: `2px solid ${result === "correct" ? "#10b981" : "#ef4444"}` }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{result === "correct" ? "🌟 ممتاز!" : "❌ حاول مجدداً"}</div>
                {result === "wrong" && (
                  <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1rem", direction: "rtl", color: "#1f2937" }}>
                    الترتيب الصحيح: {originalWords.join(" — ")}
                  </div>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              {placed.length === originalWords.length && !result && (
                <button className="btn-primary" style={{ background: "#27ae60" }} onClick={check}>✓ تحقق</button>
              )}
              <button className="btn-secondary" onClick={() => setPhase("pick")}>← اختر آية أخرى</button>
              {result === "correct" && <button className="btn-primary" style={{ background: "#27ae60" }} onClick={() => setPhase("pick")}>التالي</button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Shared overlay styles ────────────────────────────────────────────
export const overlayStyle: React.CSSProperties = {
  position: "fixed", inset: 0, zIndex: 200000, background: "rgba(0,0,0,0.6)",
  display: "flex", alignItems: "flex-start", justifyContent: "center",
  overflowY: "auto", padding: "20px",
};
export const cardStyle: React.CSSProperties = {
  background: "var(--surface, #fff)", borderRadius: "24px", padding: "32px",
  width: "100%", maxWidth: "700px", margin: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
};
export const headerStyle: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  marginBottom: "20px", flexWrap: "wrap", gap: "10px",
};
export const closeBtn: React.CSSProperties = {
  background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "10px",
  padding: "8px 16px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "0.85rem",
};
