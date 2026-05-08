"use client";

import { useEffect } from "react";
import { speakAr } from "@/lib/speech";
import type { StageData } from "@/data/stageData";

interface StageHeroProps {
  stageData: StageData;
  onNext: () => void;
}

export default function StageHero({ stageData, onNext }: StageHeroProps) {
  useEffect(() => {
    speakAr(stageData.symbol, 0.8);
  }, [stageData.symbol]);

  return (
    <div className="section-content" style={{ textAlign: "center" }}>
      <div className="section-heading">
        <span className="section-badge">🧬</span> اكتشاف المرحلة — {stageData.title}
      </div>
      <div style={{ fontSize: "5rem", margin: "16px 0" }}>{stageData.symbol}</div>
      <p style={{ maxWidth: "600px", margin: "0 auto 18px", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text, #1f2937)" }}>
        {stageData.description}
      </p>
      <p style={{ maxWidth: "600px", margin: "0 auto 18px", fontSize: "0.95rem", color: "var(--text-muted)" }}>
        {stageData.descriptionEn}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
        <div style={{ ...badgeStyle(stageData.color) }}>
          <span>قاعدة</span>
          <strong>{stageData.rule}</strong>
        </div>
        <div style={{ ...badgeStyle("#64748b") }}>
          <span>Rule</span>
          <strong>{stageData.ruleEn}</strong>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>
        لننطلق إلى المراحل التالية! <i className="fas fa-arrow-left" />
      </button>
    </div>
  );
}

function badgeStyle(color: string) {
  return {
    background: "rgba(255,255,255,0.82)",
    border: `1px solid ${color}`,
    borderRadius: "16px",
    padding: "14px 18px",
    minWidth: "180px",
    textAlign: "left" as const,
    boxShadow: "0 18px 55px rgba(15,23,42,0.06)",
  };
}
