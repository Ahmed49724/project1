"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { WordGameProps } from "@/types/letter";
import { speakAr } from "@/lib/speech";

type Phase = "start" | "playing" | "results";
const LEVELS = [
  { label: "🐢 سهل", ms: 4000 },
  { label: "🚗 متوسط", ms: 2500 },
  { label: "🚀 صعب", ms: 1500 },
];

export function SpeedReadGame({ letterData, onComplete }: WordGameProps) {
  const words = [...letterData.splitWords, ...letterData.xoWords].slice(0, 10);
  const [phase, setPhase] = useState<Phase>("start");
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeMs, setTimeMs] = useState(2500);
  const [levelLabel, setLevelLabel] = useState("متوسط");
  const [fillPct, setFillPct] = useState(100);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animRef.current) clearInterval(animRef.current);
  };

  const startWord = useCallback((idx: number, ms: number) => {
    clearTimers();
    setFillPct(100);
    speakAr(words[idx], 0.9);

    const steps = 50;
    const stepMs = ms / steps;
    let step = 0;
    animRef.current = setInterval(() => {
      step++;
      setFillPct(Math.max(0, 100 - (step / steps) * 100));
      if (step >= steps) clearInterval(animRef.current!);
    }, stepMs);

    timerRef.current = setTimeout(() => {
      answer(false, idx, ms);
    }, ms);
  }, [words]); // eslint-disable-line

  const answer = useCallback((read: boolean, currentIdx: number, ms: number) => {
    clearTimers();
    if (read) setScore((s) => s + 1);
    const nextIdx = currentIdx + 1;
    if (nextIdx >= words.length) { setPhase("results"); return; }
    setWordIdx(nextIdx);
    startWord(nextIdx, ms);
  }, [words.length, startWord]);

  const startGame = (ms: number, label: string) => {
    setTimeMs(ms); setLevelLabel(label); setWordIdx(0); setScore(0);
    setPhase("playing");
    startWord(0, ms);
  };

  useEffect(() => () => clearTimers(), []);

  if (phase === "start") return (
    <div className="section-content" style={{ textAlign: "center" }}>
      <div className="section-heading" style={{ marginBottom: "20px" }}><span className="section-badge">⚡</span> القراءة السريعة</div>
      <p style={{ color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "28px" }}>ستظهر كلمة لفترة قصيرة — اقرأها ثم اضغط ✓ أو ✗</p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
        {LEVELS.map((lv) => (
          <button key={lv.ms} onClick={() => startGame(lv.ms, lv.label)}
            style={{ background: "var(--surface2,#f0fdf4)", border: "2px solid var(--border,#e5e7eb)", borderRadius: "16px", padding: "20px 28px", cursor: "pointer", fontFamily: "var(--font-tajawal),sans-serif", fontWeight: 900, fontSize: "1rem" }}>
            {lv.label}<br /><span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lv.ms / 1000} ثانية</span>
          </button>
        ))}
      </div>
    </div>
  );

  if (phase === "results") {
    const pct = Math.round((score / words.length) * 100);
    return (
      <div className="section-content" style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{pct >= 80 ? "⚡🌟" : pct >= 50 ? "👍" : "💪"}</div>
        <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "var(--font-tajawal),sans-serif" }}>{score} / {words.length}</div>
        <div style={{ color: "var(--text-muted)", marginBottom: "24px", fontFamily: "sans-serif" }}>{levelLabel}</div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button className="btn-secondary" onClick={() => setPhase("start")}><i className="fas fa-rotate-right" /> مرة أخرى</button>
          <button className="btn-primary" onClick={onComplete}>التالي <i className="fas fa-arrow-left" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content" style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "16px", fontFamily: "sans-serif", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        <span>كلمة {wordIdx + 1}/{words.length}</span>
        <span>⭐ {score}</span>
        <span>{levelLabel}</span>
      </div>

      {/* Timer bar */}
      <div style={{ height: "8px", background: "var(--border,#e5e7eb)", borderRadius: "100px", maxWidth: "400px", margin: "0 auto 32px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${fillPct}%`, background: fillPct > 50 ? "#10b981" : fillPct > 20 ? "#f59e0b" : "#ef4444", borderRadius: "100px", transition: "width 0.1s linear, background 0.3s" }} />
      </div>

      {/* Word display */}
      <div style={{ fontFamily: "var(--font-noto-naskh),serif", fontSize: "4rem", color: "var(--primary,#185FA5)", direction: "rtl", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px" }}>
        {words[wordIdx]}
      </div>

      {/* Answer buttons */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button onClick={() => answer(true, wordIdx, timeMs)}
          style={{ background: "#d1fae5", border: "2px solid #10b981", color: "#065f46", borderRadius: "16px", padding: "18px 36px", fontSize: "1.3rem", cursor: "pointer", fontWeight: 900 }}>
          ✓ قرأتها
        </button>
        <button onClick={() => answer(false, wordIdx, timeMs)}
          style={{ background: "#fee2e2", border: "2px solid #ef4444", color: "#dc2626", borderRadius: "16px", padding: "18px 36px", fontSize: "1.3rem", cursor: "pointer", fontWeight: 900 }}>
          ✗ صعبة
        </button>
      </div>
    </div>
  );
}
