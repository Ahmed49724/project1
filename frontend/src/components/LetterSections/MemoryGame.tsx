"use client";
import React, { useState, useCallback } from "react";
import type { SectionProps } from "@/types/letter";
import { speakAr } from "@/lib/speech";

interface Card { id: number; word: string; pairId: number; flipped: boolean; matched: boolean; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function createDeck(words: string[]): Card[] {
  const selected = words.slice(0, 6);
  const pairs = shuffle([...selected.map((w, i) => ({ word: w, pairId: i })), ...selected.map((w, i) => ({ word: w, pairId: i }))]);
  return pairs.map((p, id) => ({ ...p, id, flipped: false, matched: false }));
}

export function MemoryGame({ letterData, onComplete }: SectionProps) {
  const words = letterData.xoWords.length >= 6 ? letterData.xoWords : letterData.cardWords;
  const [cards, setCards] = useState<Card[]>(() => createDeck(words));
  const [selected, setSelected] = useState<number[]>([]);
  const [checking, setChecking] = useState(false);
  const [moves, setMoves] = useState(0);

  const matchCount = cards.filter((c) => c.matched).length / 2;
  const totalPairs = cards.length / 2;
  const done = matchCount === totalPairs;

  const flip = useCallback((id: number) => {
    if (checking || selected.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    speakAr(card.word);
    const newSel = [...selected, id];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves((m) => m + 1);
      setChecking(true);
      const [a, b] = newSel.map((sid) => cards.find((c) => c.id === sid)!);
      if (a.pairId === b.pairId) {
        setCards((prev) => prev.map((c) => newSel.includes(c.id) ? { ...c, matched: true } : c));
        setSelected([]);
        setChecking(false);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newSel.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
          setChecking(false);
        }, 1000);
      }
    }
  }, [cards, selected, checking]);

  const reset = () => { setCards(createDeck(words)); setSelected([]); setMoves(0); setChecking(false); };

  return (
    <div className="section-content">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "8px" }}>
        <span className="section-badge">🧠</span> لعبة الذاكرة — Memory
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "20px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        <span>✅ أزواج: {matchCount}/{totalPairs}</span>
        <span>🎯 محاولات: {moves}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", maxWidth: "500px", margin: "0 auto 28px" }}>
        {cards.map((card) => (
          <div key={card.id} onClick={() => flip(card.id)}
            style={{ height: "90px", borderRadius: "14px", cursor: card.matched || card.flipped ? "default" : "pointer",
              perspective: "600px", position: "relative", transition: "transform 0.1s" }}>
            {/* Back */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "14px",
              background: card.matched ? "#d1fae5" : card.flipped ? "#dbeafe" : "linear-gradient(135deg,#185FA5,#047857)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${card.matched ? "#10b981" : card.flipped ? "#3b82f6" : "transparent"}`,
              transition: "background 0.3s, border 0.3s",
            }}>
              {card.flipped || card.matched ? (
                <span style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", color: card.matched ? "#065f46" : "#1d4ed8", fontWeight: 700, direction: "rtl" }}>
                  {card.word}
                </span>
              ) : (
                <span style={{ fontSize: "1.6rem" }}>❓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        {done ? (
          <div style={{ padding: "20px", background: "#f0fdf4", borderRadius: "16px", marginBottom: "16px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎉</div>
            <div style={{ fontFamily: "var(--font-tajawal), sans-serif", fontWeight: 900, fontSize: "1.3rem" }}>أحسنت! في {moves} محاولة</div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "16px" }}>
              <button className="btn-secondary" onClick={reset}><i className="fas fa-rotate-right" /> إعادة</button>
              <button className="btn-primary" onClick={onComplete}>التالي <i className="fas fa-arrow-left" /></button>
            </div>
          </div>
        ) : (
          <button className="btn-secondary" onClick={reset}><i className="fas fa-rotate-right" /> إعادة اللعبة</button>
        )}
      </div>
    </div>
  );
}
