"use client";
import React, { useState } from "react";
import { speakAr } from "@/lib/speech";
import type { ReadingItem } from "@/data/readingData";

interface Props {
  items: ReadingItem[];
  onComplete: () => void;
}

export function WordReadExercise({ items, onComplete }: Props) {
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
        <span className="section-badge">📖</span> قراءة الكلمات — Words
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
        {current.image && <div style={{ fontSize: "6rem" }}>{current.image}</div>}
        
        <div style={{ 
          fontSize: "4rem", 
          fontFamily: "var(--font-noto-naskh), serif", 
          color: "var(--green, #10b981)",
          cursor: "pointer",
          padding: "20px 40px",
          background: "var(--surface2, #f0fdf4)",
          borderRadius: "24px",
          border: "2px solid #10b981"
        }} onClick={() => speakAr(current.ar)}>
          {current.ar}
        </div>
        
        <div style={{ color: "var(--text-muted)", fontSize: "1.4rem", fontWeight: 700 }}>
          {current.en}
        </div>
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
