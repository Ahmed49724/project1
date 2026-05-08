"use client";

import React from "react";

export function WordBuilder({ onClose }: { onClose: () => void }) {
  return (
    <div id="wb-overlay" style={{ display: "flex" }}>
      <div className="wb-container">
        <button className="wb-close" onClick={onClose}>
          <i className="fas fa-times"></i> Close / إغلاق
        </button>
        <div className="wb-app-header">
          <h1>🧩 Arabic Word Builder — مُكَوِّن الكلمات</h1>
          <p>
            Combine letter tiles and watch grammar rules apply! / قم بتجميع الحروف ولاحظ تطبيق القواعد
            التلقائي
          </p>
        </div>
        <div className="wb-result-card">
          <span className="wb-result-label">
            Result
            <br />
            النتيجة
          </span>
          <div className="wb-result-word empty" id="wb-resultWord">
            Start adding letters below - ابدأ بإضافة الحروف
          </div>
          <div className="wb-badges">
            <span className="wb-rule-badge shadda" id="wb-shaddaBadge">
              Shadda applied / شـدة
            </span>
            <span className="wb-rule-badge tanwin" id="wb-tanwinBadge">
              Tanwin applied / تنويـن
            </span>
          </div>
        </div>
        <div className="wb-board-wrap">
          <span className="wb-board-label">Letter tiles / قطع الحروف</span>
          <div className="wb-board-section" id="wb-boardSection">
            <div className="wb-board-empty" id="wb-boardEmpty">
              Your letter tiles will appear here - ستظهر الحروف هنا
            </div>
          </div>
        </div>
        <div id="wb-explainShadda" className="wb-explain-box shadda"></div>
        <div id="wb-explainTanwin" className="wb-explain-box tanwin"></div>
        <div className="wb-actions">
          <button className="wb-btn danger" onClick={() => { /* TODO: implement handler */ }}>
            ↩ Remove last / مسح الأخير
          </button>
          <button className="wb-btn" onClick={() => { /* TODO: implement handler */ }}>
            Clear all / مسح الكل
          </button>
          <span className="wb-counter" id="wb-counter"></span>
        </div>
        <div className="wb-kbd-section">
          <div className="wb-kbd-header">
            <span className="wb-kbd-dot" style={{ background: "#EF9F27" }}></span> Vowel marks /
            الحـركات
          </div>
          <div className="wb-kbd-body" id="wb-harakatKbd" style={{ direction: "ltr", gap: "6px" }}></div>
        </div>
        <div className="wb-kbd-section">
          <div className="wb-kbd-header">
            <span className="wb-kbd-dot" style={{ background: "#185FA5" }}></span> Arabic letters /
            الحـروف
            <select id="wb-kbd-layout" className="wb-select">
              <option value="auto">لوحة المفاتيح (عربي)</option>
              <option value="win">ويندوز (إنجليزي ⬅️ عربي)</option>
              <option value="mac">ماك (إنجليزي ⬅️ عربي)</option>
            </select>
          </div>
          <div className="wb-kbd-body" id="wb-lettersKbd"></div>
          <div style={{ padding: "0 10px 10px" }}>
            <button className="wb-space-btn" onClick={() => { /* TODO: implement handler */ }}>
              Word space / مسافة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
