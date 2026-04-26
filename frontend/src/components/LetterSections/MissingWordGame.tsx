"use client";
import React, { useState, useCallback } from "react";
import type { SectionProps } from "@/types/letter";
import { speakAr } from "@/lib/speech";

export function MissingWordGame({ letterData, onComplete }: SectionProps) {
  const { missingWords, shapes } = letterData;
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = missingWords[idx];

  const pick = useCallback((shapeIdx: number) => {
    if (chosen !== null) return;
    setChosen(shapeIdx);
    if (shapeIdx === current.correctShape) {
      setScore((s) => s + 1);
      speakAr(shapes[shapeIdx]);
    }
  }, [chosen, current, shapes]);

  const next = () => {
    if (idx + 1 >= missingWords.length) { setDone(true); return; }
    setIdx((i) => i + 1);
    setChosen(null);
  };

  if (done) {
    const pct = Math.round((score / missingWords.length) * 100);
    return (
      <div className="section-content" style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{pct >= 80 ? "🌟" : pct >= 50 ? "😊" : "💪"}</div>
        <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "var(--font-tajawal), sans-serif", marginBottom: "8px" }}>
          {score} / {missingWords.length} صحيح
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
          <button className="btn-secondary" onClick={() => { setIdx(0); setChosen(null); setScore(0); setDone(false); }}>
            <i className="fas fa-rotate-right" /> إعادة
          </button>
          <button className="btn-primary" onClick={onComplete}>التالي <i className="fas fa-arrow-left" /></button>
        </div>
      </div>
    );
  }

  const isCorrect = chosen === current.correctShape;
  const isWrong = chosen !== null && chosen !== current.correctShape;

  return (
    <div className="section-content">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "8px" }}>
        <span className="section-badge">🕵️</span> الكلمة الناقصة — Missing Shape
      </div>
      <div style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "24px" }}>
        السؤال {idx + 1} من {missingWords.length} — اختر الشكل الصحيح للحرف
      </div>

      {/* Progress */}
      <div style={{ maxWidth: "400px", margin: "0 auto 24px", background: "var(--border, #e5e7eb)", borderRadius: "100px", height: "6px" }}>
        <div style={{ width: `${((idx) / missingWords.length) * 100}%`, height: "100%", background: "var(--primary, #185FA5)", borderRadius: "100px", transition: "width 0.4s" }} />
      </div>

      {/* Word display with HTML gap */}
      <div
        style={{ textAlign: "center", fontFamily: "var(--font-noto-naskh), serif", fontSize: "3rem", direction: "rtl", lineHeight: 2, padding: "24px", background: "var(--surface2, #f8fafc)", border: "2px solid var(--border, #e5e7eb)", borderRadius: "20px", maxWidth: "500px", margin: "0 auto 32px" }}
        dangerouslySetInnerHTML={{ __html: current.display }}
      />

      {/* Shape choices */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
        {shapes.map((shape, i) => {
          let bg = "var(--surface, #fff)";
          let border = "2px solid var(--border, #e5e7eb)";
          let color = "var(--text, #1f2937)";
          if (chosen !== null) {
            if (i === current.correctShape) { bg = "#d1fae5"; border = "2.5px solid #10b981"; color = "#065f46"; }
            else if (i === chosen) { bg = "#fee2e2"; border = "2.5px solid #ef4444"; color = "#dc2626"; }
          }
          return (
            <button key={i} onClick={() => { pick(i); speakAr(shape); }}
              style={{ background: bg, border, color, borderRadius: "16px", padding: "20px 24px", cursor: chosen !== null ? "default" : "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "2.2rem", minWidth: "80px", transition: "all 0.2s", fontWeight: 700 }}>
              {shape}
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "sans-serif", marginTop: "4px" }}>
                {["بداية", "وسط", "نهاية", "منفصل"][i]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {chosen !== null && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{isCorrect ? "✅ ممتاز!" : "❌ حاول مرة أخرى"}</div>
          {isWrong && (
            <div style={{ color: "#065f46", fontFamily: "var(--font-noto-naskh), sans-serif" }}>
              الشكل الصحيح: <strong style={{ fontSize: "1.5rem" }}>{shapes[current.correctShape]}</strong>
            </div>
          )}
          <button className="btn-primary" onClick={next} style={{ marginTop: "16px" }}>
            {idx + 1 < missingWords.length ? "السؤال التالي" : "عرض النتيجة"} <i className="fas fa-arrow-left" />
          </button>
        </div>
      )}
    </div>
  );
}
