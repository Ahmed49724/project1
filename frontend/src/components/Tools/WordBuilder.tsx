"use client";
import React, { useState } from "react";
import { overlayStyle, cardStyle, headerStyle, closeBtn } from "./QuranPuzzle";
import { speakAr } from "@/lib/speech";

const HARAKAT = [
  { sym: "\u064e", label: "فتحة", color: "#ef4444" },
  { sym: "\u0650", label: "كسرة", color: "#3b82f6" },
  { sym: "\u064f", label: "ضمة", color: "#10b981" },
  { sym: "\u0652", label: "سكون", color: "#6b7280" },
  { sym: "\u0651", label: "شدة", color: "#f59e0b" },
  { sym: "\u064b", label: "فتحتان", color: "#ef4444" },
  { sym: "\u064d", label: "كسرتان", color: "#3b82f6" },
  { sym: "\u064c", label: "ضمتان", color: "#10b981" },
];

const KEYBOARD_ROWS = [
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
  ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
  ["ئ", "ء", "ؤ", "ر", "ى", "ة", "و", "ز", "ظ", "ذ"],
];

export function WordBuilder({ onClose }: { onClose: () => void }) {
  const [word, setWord] = useState("");

  // Use Array.from for correct Unicode handling of Arabic combining chars
  const chars = Array.from(word);

  const addLetter = (letter: string) => {
    setWord((w) => {
      const arr = Array.from(w);
      // Shadda: if last char (strip harakat) matches this letter, merge
      if (arr.length > 0) {
        const last = arr[arr.length - 1].replace(/[\u064B-\u065F]/g, "");
        if (last === letter) {
          arr.pop();
          return arr.join("") + letter + "\u0651"; // add with shadda
        }
      }
      return w + letter;
    });
  };

  const addHaraka = (sym: string) => {
    if (chars.length === 0) return;
    // Don't double-add the same haraka
    const last = chars[chars.length - 1];
    if (/[\u064B-\u065F]/.test(last)) {
      // Replace last haraka
      setWord(chars.slice(0, -1).join("") + sym);
    } else {
      setWord(word + sym);
    }
  };

  const removeLast = () => setWord(chars.slice(0, -1).join(""));
  const clear = () => setWord("");

  const keyBtn = (label: string, onClick: () => void, bg = "#f3f4f6", color = "#1f2937", minW = "44px") => (
    <button onClick={onClick}
      style={{ background: bg, border: "1px solid #e5e7eb", borderRadius: "10px", padding: "10px 4px", cursor: "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", color, minWidth: minW, transition: "all 0.1s", fontWeight: 700 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
      onMouseLeave={(e) => (e.currentTarget.style.background = bg)}>
      {label}
    </button>
  );

  return (
    <div style={overlayStyle}>
      <div style={{ ...cardStyle, maxWidth: "760px" }}>
        <div style={headerStyle}>
          <h2 style={{ fontFamily: "var(--font-tajawal), sans-serif", color: "#7c3aed", margin: 0 }}>
            🧩 بناء الكلمات — Word Builder
          </h2>
          <button onClick={onClose} style={closeBtn}>✕ إغلاق</button>
        </div>

        {/* Word display */}
        <div
          onClick={() => word && speakAr(word)}
          style={{ minHeight: "90px", background: "#faf5ff", border: "3px solid #7c3aed", borderRadius: "20px", padding: "20px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl", cursor: word ? "pointer" : "default", position: "relative" }}>
          <span style={{ fontFamily: "var(--font-noto-naskh), serif", fontSize: "3rem", color: "#7c3aed", letterSpacing: "0.05em" }}>
            {word || <span style={{ color: "#d8b4fe", fontSize: "1.2rem", fontFamily: "sans-serif" }}>ابدأ بالضغط على الحروف...</span>}
          </span>
          {word && (
            <span style={{ position: "absolute", bottom: "8px", left: "12px", fontSize: "0.75rem", color: "#9ca3af", fontFamily: "sans-serif" }}>
              🔊 اضغط للاستماع
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
          {keyBtn("⌫ حذف", removeLast, "#fee2e2", "#dc2626", "100px")}
          {keyBtn("🗑 مسح الكل", clear, "#fef3c7", "#92400e", "120px")}
          {word && keyBtn("🔊 استمع", () => speakAr(word), "#dbeafe", "#1d4ed8", "110px")}
        </div>

        {/* Harakat */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "0.8rem", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>الحركات — Vowel Marks:</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {HARAKAT.map((h) => (
              <button key={h.sym} onClick={() => addHaraka(h.sym)}
                style={{ background: `${h.color}15`, border: `2px solid ${h.color}`, borderRadius: "10px", padding: "8px 14px", cursor: "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.1rem", color: h.color, fontWeight: 900, direction: "rtl" }}
                title={h.label}>
                {"ب" + h.sym} <span style={{ fontSize: "0.65rem", fontFamily: "sans-serif", display: "block", textAlign: "center" }}>{h.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Arabic keyboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
              {row.map((letter) => (
                <button key={letter} onClick={() => addLetter(letter)}
                  style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "10px", width: "48px", height: "48px", cursor: "pointer", fontFamily: "var(--font-noto-naskh), serif", fontSize: "1.3rem", color: "#1f2937", fontWeight: 700, transition: "all 0.1s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#185FA5"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.color = "#1f2937"; }}>
                  {letter}
                </button>
              ))}
            </div>
          ))}
          {/* Space */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => setWord((w) => w + " ")}
              style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "10px 60px", cursor: "pointer", fontSize: "0.85rem", color: "#6b7280", fontFamily: "sans-serif" }}>
              مسافة (Space)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
