"use client";
import React, { useState, useCallback, useMemo } from "react";
import { generateQuiz } from "@/data/verbLabData";
import { speakAr } from "@/lib/speech";

export function VerbQuiz() {
  const questions = useMemo(() => generateQuiz(10), []);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const pick = useCallback((i: number) => {
    if (answer !== null) return;
    setAnswer(i);
    if (i === q.correct) setScore((s) => s + 1);
    speakAr(q.options[i], 0.7);
  }, [answer, q]);

  const next = () => {
    if (idx + 1 >= questions.length) { setDone(true); return; }
    setIdx((i) => i + 1);
    setAnswer(null);
  };

  const restart = () => { setIdx(0); setAnswer(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ fontSize: "5rem", marginBottom: "12px" }}>{pct >= 80 ? "🌟🧪" : pct >= 50 ? "👍" : "💪"}</div>
        <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-tajawal), sans-serif", color: "var(--primary, #185FA5)" }}>
          {score}/{questions.length}
        </div>
        <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "24px" }}>
          {pct >= 80 ? "Excellent! — ممتاز!" : pct >= 50 ? "Good job! — جيد جداً!" : "Keep trying! — حاول مرة أخرى!"}
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button className="btn-secondary" onClick={restart}><i className="fas fa-rotate-right" /> إعادة — Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginBottom: "16px" }}>
        سؤال {idx + 1} / {questions.length} — ⭐ {score}
      </div>
      {/* Progress */}
      <div style={{ maxWidth: "300px", margin: "0 auto 24px", background: "var(--border, #e5e7eb)", borderRadius: "100px", height: "6px" }}>
        <div style={{ width: `${(idx / questions.length) * 100}%`, height: "100%", background: "#10b981", borderRadius: "100px", transition: "width 0.4s" }} />
      </div>

      <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{q.icon}</div>
      <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", direction: "rtl", marginBottom: "6px" }}>{q.prompt}</div>
      <div style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "24px" }}>{q.promptEn}</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "400px", margin: "0 auto 24px" }}>
        {q.options.map((opt, i) => {
          let bg = "var(--surface, #fff)";
          let border = "2px solid var(--border, #e5e7eb)";
          if (answer !== null) {
            if (i === q.correct) { bg = "#d1fae5"; border = "2.5px solid #10b981"; }
            else if (i === answer) { bg = "#fee2e2"; border = "2.5px solid #ef4444"; }
          }
          return (
            <button key={i} onClick={() => pick(i)}
              style={{ background: bg, border, borderRadius: "14px", padding: "16px", cursor: answer !== null ? "default" : "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", direction: "rtl", fontWeight: 700, transition: "all 0.2s" }}>
              {opt}
            </button>
          );
        })}
      </div>

      {answer !== null && (
        <button className="btn-primary" onClick={next} style={{ marginTop: "8px" }}>
          {idx + 1 < questions.length ? "التالي — Next" : "النتيجة — Results"} <i className="fas fa-arrow-left" />
        </button>
      )}
    </div>
  );
}
