"use client";

import { useState } from "react";
import type { StageData } from "@/data/stageData";

interface StageMissingMarkGameProps {
  stageData: StageData;
}

export default function StageMissingMarkGame({ stageData }: StageMissingMarkGameProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const item = stageData.missingItems[current];
  const correct = item.correct;
  const finished = selected !== null;

  return (
    <div className="section-content" style={{ textAlign: "center" }}>
      <div className="section-heading">
        <span className="section-badge">❓</span> أكمل العلامة — Fill the Mark
      </div>
      <p style={{ color: "var(--text-muted)", marginBottom: "20px", maxWidth: "660px", margin: "0 auto 20px" }}>
        ضع العلامة أو الحرف الصحيح في المكان الفارغ ثم اضغط تحقق.
      </p>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", minHeight: "100px", marginBottom: "24px", fontSize: "3rem", borderRadius: "28px", background: "var(--surface, #fff)", border: "1px solid var(--border, #e5e7eb)", boxShadow: "0 10px 24px rgba(15,23,42,0.08)" }}>
        {item.display}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(80px, 1fr))", gap: "12px", maxWidth: "520px", margin: "0 auto 24px" }}>
        {item.options.map((option, idx) => (
          <button key={idx} onClick={() => setSelected(idx)}
            style={choiceStyle(selected === idx, finished && idx === correct, finished && selected === idx && selected !== correct)}>
            {option}
          </button>
        ))}
      </div>
      {finished && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "1.2rem", color: finished && selected === correct ? "#065f46" : "#b91c1c", marginBottom: "10px" }}>
            {selected === correct ? "✅ ممتاز" : "❌ الإجابة غير صحيحة"}
          </div>
          {selected === correct ? (
            <button className="btn-primary" onClick={() => { setSelected(null); setCurrent((cur) => (cur + 1) % stageData.missingItems.length); }}>
              سؤال آخر
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setSelected(null)}>
              حاول مرة أخرى
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function choiceStyle(selected: boolean, correct: boolean, wrong: boolean) {
  const base = {
    padding: "16px 14px",
    borderRadius: "18px",
    border: "2px solid var(--border, #e5e7eb)",
    background: "var(--surface, #fff)",
    fontSize: "1.1rem",
    fontFamily: "var(--font-noto-naskh), serif",
    cursor: "pointer",
    minHeight: "60px",
  } as const;

  if (correct) return { ...base, background: "#d1fae5", border: "2px solid #10b981" };
  if (wrong) return { ...base, background: "#fee2e2", border: "2px solid #ef4444" };
  if (selected) return { ...base, background: "#e0f2fe", border: "2px solid #3b82f6" };
  return base;
}
