"use client";
import React, { useState, useEffect } from "react";
import { speakAr } from "@/lib/speech";
import type { ReadingItem } from "@/data/readingData";

interface Props {
  items: ReadingItem[];
  onComplete: () => void;
}

export function SentenceBuilder({ items, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [currentSentence, setCurrentSentence] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const current = items[idx];

  useEffect(() => {
    const words = current.ar.split(" ");
    setScrambled([...words].sort(() => Math.random() - 0.5));
    setCurrentSentence([]);
    setIsCorrect(false);
  }, [idx, current]);

  const addWord = (word: string, sIdx: number) => {
    const newSentence = [...currentSentence, word];
    setCurrentSentence(newSentence);
    setScrambled(scrambled.filter((_, i) => i !== sIdx));
    
    if (newSentence.join(" ") === current.ar) {
      setIsCorrect(true);
      speakAr(current.ar);
    }
  };

  const reset = () => {
    const words = current.ar.split(" ");
    setScrambled([...words].sort(() => Math.random() - 0.5));
    setCurrentSentence([]);
    setIsCorrect(false);
  };

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
        <span className="section-badge">📝</span> بناء الجمل — Sentence Builder
      </div>
      
      <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
        رتّب الكلمات لتكوين جملة صحيحة — Arrange words to form a sentence
      </p>

      {/* Target Area */}
      <div style={{ 
        minHeight: "80px", 
        background: "var(--surface2, #f8fafc)", 
        border: `2px dashed ${isCorrect ? "#10b981" : "#cbd5e1"}`, 
        borderRadius: "20px",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "32px",
        flexWrap: "wrap",
        direction: "rtl"
      }}>
        {currentSentence.map((word, i) => (
          <div key={i} style={{ 
            padding: "10px 20px", 
            background: "#fff", 
            border: "2px solid #10b981", 
            borderRadius: "12px",
            fontFamily: "var(--font-noto-naskh), serif",
            fontSize: "1.8rem"
          }}>
            {word}
          </div>
        ))}
      </div>

      {/* Choices Area */}
      {!isCorrect && (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "12px", 
          marginBottom: "32px",
          flexWrap: "wrap",
          direction: "rtl"
        }}>
          {scrambled.map((word, i) => (
            <button key={i} className="btn-secondary" onClick={() => addWord(word, i)} style={{ 
              fontFamily: "var(--font-noto-naskh), serif", 
              fontSize: "1.8rem",
              padding: "10px 20px"
            }}>
              {word}
            </button>
          ))}
        </div>
      )}

      {isCorrect && (
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "2rem", color: "#10b981", marginBottom: "8px" }}>✅ ممتاز! — Excellent!</div>
          <div style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>{current.en}</div>
        </div>
      )}

      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        {!isCorrect && currentSentence.length > 0 && (
          <button className="btn-secondary" onClick={reset}>
            <i className="fas fa-rotate-right" /> إعادة — Reset
          </button>
        )}
        {isCorrect && (
          <button className="btn-primary" onClick={handleNext}>
            {idx + 1 < items.length ? "الجملة التالية — Next" : "إنهاء — Finish"} <i className="fas fa-arrow-left" />
          </button>
        )}
      </div>
      
      <div style={{ marginTop: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        {idx + 1} / {items.length}
      </div>
    </div>
  );
}
