"use client";
import React, { useState, useRef, useEffect } from "react";
import type { SectionProps } from "@/types/letter";
import { speakAr } from "@/lib/speech";

const COLORS = ["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#84cc16"];

function polarToXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function slicePath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToXY(cx, cy, r, start);
  const e = polarToXY(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M${cx},${cy} L${s.x},${s.y} A${r},${r},0,${large},1,${e.x},${e.y}Z`;
}

export function SpinWheelGame({ letterData, onComplete }: SectionProps) {
  const words = letterData.xoWords.slice(0, 8);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<SVGGElement>(null);

  const n = words.length;
  const sliceSize = 360 / n;
  const cx = 200; const cy = 200; const r = 180;

  const spin = () => {
    if (spinning) return;
    const extra = 720 + Math.floor(Math.random() * 720);
    const newRot = rotation + extra;
    setRotation(newRot);
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setSpinning(false);
      const finalAngle = newRot % 360;
      const idx = Math.floor(finalAngle / sliceSize) % n;
      const word = words[n - 1 - idx < 0 ? 0 : n - 1 - idx];
      setResult(word);
      speakAr(word);
    }, 3200);
  };

  return (
    <div className="section-content" style={{ textAlign: "center" }}>
      <div className="section-heading" style={{ marginBottom: "20px" }}>
        <span className="section-badge">🎡</span> العجلة — Spin &amp; Read
      </div>
      <p style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.9rem", marginBottom: "20px" }}>
        دوّر العجلة واقرأ الكلمة بصوت عالٍ!
      </p>

      <div style={{ position: "relative", width: "420px", maxWidth: "100%", margin: "0 auto" }}>
        {/* Pointer */}
        <div style={{ position: "absolute", top: "6px", left: "50%", transform: "translateX(-50%)", zIndex: 10, fontSize: "2rem", lineHeight: 1 }}>▼</div>

        <svg viewBox="0 0 400 400" style={{ width: "100%", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}>
          <g ref={wheelRef} style={{ transformOrigin: "200px 200px", transform: `rotate(${rotation}deg)`, transition: spinning ? "transform 3.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none" }}>
            {words.map((word, i) => {
              const start = i * sliceSize;
              const end = start + sliceSize;
              const mid = start + sliceSize / 2;
              const textPos = polarToXY(cx, cy, r * 0.62, mid);
              return (
                <g key={i}>
                  <path d={slicePath(cx, cy, r, start, end)} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth="2" />
                  <text x={textPos.x} y={textPos.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={word.length > 3 ? "13" : "16"} fill="#fff" fontWeight="bold"
                    fontFamily="serif" transform={`rotate(${mid}, ${textPos.x}, ${textPos.y})`}>
                    {word}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx={cx} cy={cy} r={28} fill="#fff" stroke="#e5e7eb" strokeWidth="3" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#6b7280">⭐</text>
          </g>
        </svg>
      </div>

      <button onClick={spin} disabled={spinning}
        style={{ marginTop: "20px", background: spinning ? "#9ca3af" : "linear-gradient(135deg,#7c3aed,#5b21b6)", border: "none", color: "#fff", borderRadius: "16px", padding: "14px 36px", fontSize: "1.1rem", fontWeight: 900, cursor: spinning ? "not-allowed" : "pointer", fontFamily: "var(--font-tajawal), sans-serif", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
        {spinning ? "⏳ جاري الدوران..." : "🎡 دوّر!"}
      </button>

      {result && (
        <div style={{ marginTop: "24px", padding: "20px", background: "#f0fdf4", border: "2px solid #10b981", borderRadius: "16px", cursor: "pointer" }} onClick={() => speakAr(result)}>
          <div style={{ fontSize: "0.85rem", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "6px" }}>الكلمة — اضغط للاستماع</div>
          <div style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "2.8rem", color: "#065f46", direction: "rtl" }}>{result} 🔊</div>
        </div>
      )}

      <div style={{ marginTop: "32px" }}>
        <button className="btn-primary" onClick={onComplete}>التالي <i className="fas fa-arrow-left" /></button>
      </div>
    </div>
  );
}
