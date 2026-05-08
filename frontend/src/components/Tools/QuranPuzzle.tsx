"use client";

import React from "react";

export function QuranPuzzle({ onClose }: { onClose: () => void }) {
  return (
    <div
      id="quran-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300000,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <div className="wb-container">
        <button
          className="wb-close"
          style={{ borderColor: "#27ae60", color: "#27ae60", background: "#eaf3de" }}
          onClick={onClose}
        >
          <i className="fas fa-times"></i> Close
        </button>
        <div className="wb-app-header">
          <h1 style={{ color: "#27ae60" }}>🕌 Holy Quran Memorization</h1>
          <p>Order the words to complete the Ayah!</p>
        </div>
        <div
          id="quran-completed-board"
          style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}
        ></div>
        <div className="wb-board-wrap" style={{ marginTop: "25px" }}>
          <span className="wb-board-label" style={{ color: "#27ae60" }}>
            Drop Area — اضغط على كلمة لإزالتها
          </span>
          <div
            className="wb-board-section"
            id="quran-target-area"
            style={{
              minHeight: "100px",
              justifyContent: "center",
              borderColor: "#27ae60",
              background: "var(--surface)",
            }}
          ></div>
        </div>
        <div className="wb-kbd-section" style={{ marginTop: "20px", borderColor: "#27ae60" }}>
          <div className="wb-kbd-header" style={{ background: "#eaf3de", color: "#27500A" }}>
            Available Words — الكلمات المتاحة
          </div>
          <div
            className="wb-kbd-body"
            id="quran-pieces-area"
            style={{ justifyContent: "center", padding: "25px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 200000,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  overflowY: "auto",
  padding: "20px",
};

export const cardStyle: React.CSSProperties = {
  background: "var(--surface, #fff)",
  borderRadius: "24px",
  padding: "32px",
  width: "100%",
  maxWidth: "700px",
  margin: "auto",
  boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
};

export const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "10px",
};

export const closeBtn: React.CSSProperties = {
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "8px 16px",
  cursor: "pointer",
  fontFamily: "sans-serif",
  fontSize: "0.85rem",
};
