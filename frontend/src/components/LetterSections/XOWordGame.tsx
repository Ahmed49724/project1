"use client";
import React, { useState, useCallback } from "react";
import { speakAr } from "@/lib/speech";

type TileState = "unclaimed" | "X" | "O";

interface XOWordGameProps {
  words: string[];
  title: string;
  badge: string;
  onComplete: () => void;
}

const TILE_COLORS: Record<TileState, React.CSSProperties> = {
  unclaimed: { background: "var(--surface, #fff)", border: "2px solid var(--border, #e5e7eb)", color: "var(--text, #1f2937)" },
  X: { background: "#dbeafe", border: "2.5px solid #3b82f6", color: "#1d4ed8" },
  O: { background: "#fee2e2", border: "2.5px solid #ef4444", color: "#dc2626" },
};

export function XOWordGame({ words, title, badge, onComplete }: XOWordGameProps) {
  const [tiles, setTiles] = useState<TileState[]>(() => words.map(() => "unclaimed"));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [gameOver, setGameOver] = useState(false);
  const [lastRead, setLastRead] = useState<string | null>(null);

  const claimTile = useCallback((idx: number) => {
    if (tiles[idx] !== "unclaimed" || gameOver) return;
    speakAr(words[idx]);
    setLastRead(words[idx]);
    const next = [...tiles];
    next[idx] = turn;
    setTiles(next);
    const remaining = next.filter((t) => t === "unclaimed").length;
    if (remaining === 0) { setGameOver(true); return; }
    setTurn((t) => (t === "X" ? "O" : "X"));
  }, [tiles, turn, gameOver, words]);

  const reset = () => { setTiles(words.map(() => "unclaimed")); setTurn("X"); setGameOver(false); setLastRead(null); };

  const xCount = tiles.filter((t) => t === "X").length;
  const oCount = tiles.filter((t) => t === "O").length;
  const winner = xCount > oCount ? "❌ X" : oCount > xCount ? "⭕ O" : null;

  return (
    <div className="section-content">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "16px" }}>
        <span className="section-badge">{badge}</span> {title}
      </div>

      {/* Turn + instruction */}
      {!gameOver && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ background: turn === "X" ? "#dbeafe" : "#fee2e2", border: `2px solid ${turn === "X" ? "#3b82f6" : "#ef4444"}`, borderRadius: "100px", padding: "8px 20px", fontWeight: 900, color: turn === "X" ? "#1d4ed8" : "#dc2626", fontSize: "1.1rem" }}>
            {turn === "X" ? "❌ X" : "⭕ O"} — دورك
          </div>
          <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem" }}>
            اضغط كلمة واقرأها بصوت عالٍ، ثم احتلّها!
          </div>
        </div>
      )}

      {/* Last word read */}
      {lastRead && !gameOver && (
        <div style={{ textAlign: "center", fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem", color: "var(--primary, #185FA5)", marginBottom: "16px", cursor: "pointer" }} onClick={() => speakAr(lastRead)}>
          {lastRead} 🔊
        </div>
      )}

      {/* Word grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", maxWidth: "600px", margin: "0 auto 28px" }}>
        {words.map((word, i) => (
          <button key={i} onClick={() => claimTile(i)} disabled={tiles[i] !== "unclaimed" || gameOver}
            style={{ ...TILE_COLORS[tiles[i]], borderRadius: "14px", padding: "16px 20px", cursor: tiles[i] === "unclaimed" && !gameOver ? "pointer" : "default", fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.4rem", fontWeight: 700, minWidth: "90px", transition: "all 0.2s", position: "relative" }}>
            {tiles[i] !== "unclaimed" && (
              <span style={{ position: "absolute", top: "4px", right: "6px", fontSize: "0.7rem", fontFamily: "sans-serif" }}>{tiles[i]}</span>
            )}
            {word}
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "20px" }}>
        <div style={{ color: "#1d4ed8", fontWeight: 900 }}>❌ X: {xCount}</div>
        <div style={{ color: "#dc2626", fontWeight: 900 }}>⭕ O: {oCount}</div>
      </div>

      {/* Game over */}
      {gameOver && (
        <div style={{ textAlign: "center", padding: "24px", background: "var(--surface2, #f0fdf4)", borderRadius: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>{winner ? "🎉" : "🤝"}</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, fontFamily: "var(--font-tajawal), sans-serif" }}>
            {winner ? `${winner} فاز!` : "تعادل!"}
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px" }}>
            <button className="btn-secondary" onClick={reset}><i className="fas fa-rotate-right" /> إعادة</button>
            <button className="btn-primary" onClick={onComplete}>التالي <i className="fas fa-arrow-left" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
