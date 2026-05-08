"use client";

import { useEffect } from "react";
import { speakAr } from "@/lib/speech";
import type { StageData } from "@/data/stageData";

interface StageMotorsSectionProps {
  stageData: StageData;
  onNext?: () => void;
}

export default function StageMotorsSection({ stageData, onNext }: StageMotorsSectionProps) {
  useEffect(() => {
    speakAr(stageData.symbol, 0.7);
  }, [stageData.symbol]);

  return (
    <div className="section-content">
      <div className="section-heading">
        <span className="section-badge">⚙️</span> المحركات الصوتية — Stage Sounds
      </div>
      <div style={{ display: "grid", gap: "16px", maxWidth: "700px", margin: "0 auto" }}>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          هذه المرحلة تركز على العلامات الصوتية الخاصة بها. لاحظ الأمثلة التالية ثم جرّب قراءتها بصوت مرتفع.
        </p>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          {stageData.examples.slice(0, 4).map((word) => (
            <button key={word} onClick={() => speakAr(word, 0.75)}
              style={{ minWidth: "130px", padding: "18px 12px", borderRadius: "22px", border: "1px solid var(--border, #e5e7eb)", background: "var(--surface, #fff)", fontFamily: "var(--font-noto-naskh), serif", fontSize: "2rem", boxShadow: "0 12px 28px rgba(15,23,42,0.08)" }}>
              {word}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={infoBox(stageData.color)}>
            <strong style={{ display: "block", marginBottom: "6px" }}>قاعدة المرحلة</strong>
            <span>{stageData.rule}</span>
          </div>
          <div style={infoBox("#94a3b8")}>
            <strong style={{ display: "block", marginBottom: "6px" }}>نصائح</strong>
            <span>رؤية الحرف بصرياً ثم سماعه يساعد على تثبيت القاعدة.</span>
          </div>
        </div>
        {onNext && (
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <button className="btn-primary" onClick={onNext}>
              التالي <i className="fas fa-arrow-left" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function infoBox(color: string) {
  return {
    background: "rgba(255,255,255,0.92)",
    border: `1px solid ${color}`,
    borderRadius: "18px",
    padding: "16px 18px",
    minWidth: "240px",
    boxShadow: "0 12px 24px rgba(15,23,42,0.06)",
    textAlign: "left" as const,
  };
}
