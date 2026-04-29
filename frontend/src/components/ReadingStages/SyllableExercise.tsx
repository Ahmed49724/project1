"use client";
import React, { useState } from "react";
import { speakAr } from "@/lib/speech";
import type { ReadingItem } from "@/data/readingData";

interface Props {
  items: ReadingItem[];
  onComplete: () => void;
}

export function SyllableExercise({ items, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const current = items[idx];

  const handleNext = () => {
    if (idx + 1 < items.length) {
      setIdx(idx + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="section-content" style={{ textAlign: "center", padding: "40px 20px" }}>
      <div className="section-heading" style={{ marginBottom: "24px" }}>
        <span className="section-badge">🔤</span> تدريب المقاطع — Syllables
      </div>
      
      <div style={{ 
        fontSize: "5rem", 
        fontFamily: "var(--font-noto-naskh), serif", 
        color: "var(--primary, #185FA5)",
        marginBottom: "20px",
        cursor: "pointer",
        padding: "30px",
        background: "var(--surface2, #f0fdf4)",
        borderRadius: "24px",
        display: "inline-block",
        minWidth: "200px"
      }} onClick={() => speakAr(current.ar)}>
        {current.ar}
      </div>
      
      <div style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "32px" }}>
        {current.en}
      </div>

      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <button className="btn-secondary" onClick={() => speakAr(current.ar)}>
          <i className="fas fa-volume-high" /> استمع — Listen
        </button>
        <button className="btn-primary" onClick={handleNext}>
          {idx + 1 < items.length ? "التالي — Next" : "إنهاء — Finish"} <i className="fas fa-arrow-left" />
        </button>
      </div>
      
      <div style={{ marginTop: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        {idx + 1} / {items.length}
      </div>
    </div>
  );
}
