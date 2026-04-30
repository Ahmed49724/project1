"use client";

import { useMemo, useState } from "react";
import { speakAr } from "@/lib/speak";
import type { StageData } from "@/data/stageData";

interface StageDetectiveSectionProps {
  stageData: StageData;
}

export default function StageDetectiveSection({ stageData }: StageDetectiveSectionProps) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const entry = stageData.detectivePairs[index];
  const options = useMemo(() => shuffle([entry.target, entry.compare]), [entry]);
  const correct = entry.target;
  const isCorrect = answer === correct;
  const finished = answer !== null;

  return (
    <div className="section-content" style={{ textAlign: "center" }}>
      <div className="section-heading">
        <span className="section-badge">🕵️</span> كشف الفرق — Detective
      </div>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "620px", margin: "0 auto 18px" }}>
        {entry.hint} اختر الكلمة الصحيحة أو الشكل الذي يعبر عن القاعدة الخاصة بهذه المرحلة.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
        {options.map((option) => (
          <button key={option} onClick={() => { setAnswer(option); speakAr(option, 0.7); }}
            style={optionStyle(answer, option, correct)}>
            {option}
          </button>
        ))}
      </div>
      {finished && (
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
            {isCorrect ? "✅ صحيح!" : "❌ جرب مرة أخرى"}
          </div>
          {isCorrect && (
            <button className="btn-primary" onClick={() => { setAnswer(null); setIndex((prev) => (prev + 1) % stageData.detectivePairs.length); }}>
              السؤال التالي
            </button>
          )}
        </div>
      )}
      <div style={{ marginTop: "26px", display: "flex", justifyContent: "center", gap: "12px" }}>
        {stageData.detectivePairs.map((_, idx) => (
          <span key={idx} style={{ width: "10px", height: "10px", borderRadius: "50%", background: idx === index ? "#3b82f6" : "#d1d5db" }} />
        ))}
      </div>
    </div>
  );
}

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function optionStyle(answer: string | null, option: string, correct: string) {
  let base = {
    minWidth: "120px",
    padding: "18px 16px",
    borderRadius: "20px",
    border: "2px solid var(--border, #e5e7eb)",
    background: "var(--surface, #fff)",
    boxShadow: "0 10px 22px rgba(15,23,42,0.08)",
    fontFamily: "var(--font-noto-naskh), serif",
    fontSize: "2rem",
    cursor: answer ? "default" : "pointer",
  } as const;

  if (answer) {
    if (option === correct) {
      return { ...base, background: "#d1fae5", border: "2px solid #10b981" };
    }
    if (option === answer) {
      return { ...base, background: "#fee2e2", border: "2px solid #ef4444" };
    }
  }

  return base;
}
