"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter, usePathname } from "next/navigation";

const HIDDEN_PATHS = ["/", "/login"];

export const AppNav: React.FC = () => {
  const {
    starsCount,
    studentName,
    theme,
    toggleTheme,
    toggleLanguage,
    signOut,
    setActiveModal,
  } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  const handleBack = () => router.back();
  const handleHome = () => router.push("/dashboard");
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const openTool = (tool: "quran" | "grammar" | "wordbuilder") => {
    setActiveModal(tool);
    setIsToolsOpen(false);
  };

  return (
    <nav id="app-nav" role="navigation" aria-label="Main navigation">
      {/* Start slot (RTL = right side): Back + Breadcrumb */}
      <div className="nav-start">
        <button id="nav-back-btn" onClick={handleBack} aria-label="رجوع">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
        <nav id="nav-breadcrumb" aria-label="Breadcrumb">
          <span className="bc-crumb active">جامع</span>
        </nav>
      </div>

      {/* Center: Logo */}
      <div className="nav-mid">
        <span className="nav-logo" aria-label="Jamea platform">جامع</span>
      </div>

      {/* End slot (RTL = left side): Stars, Student, Theme, Tools */}
      <div className="nav-end">
        <div className="nav-chip nav-chip-stars" aria-label="النجوم المكتسبة">
          <i className="fas fa-star" aria-hidden="true"></i>
          <span id="nav-stars-count">{starsCount}</span>
          {/* Hidden original starsCount for JS compat */}
          <span id="starsCount" style={{ display: "none" }}>{starsCount}</span>
        </div>
        <div className="nav-chip nav-chip-student" aria-label="اسم الطالب">
          <i className="fas fa-user-circle" aria-hidden="true"></i>
          <span id="nav-student-name">{studentName || "—"}</span>
          <span id="studentName" style={{ display: "none" }}>{studentName || "—"}</span>
        </div>
        <button className="nav-icon-btn" onClick={handleHome} aria-label="الرئيسية" title="الرئيسية">
          <i className="fas fa-home" aria-hidden="true"></i>
        </button>
        <button className="nav-icon-btn" onClick={toggleTheme} aria-label="تبديل المظهر" title="Toggle theme">
          <i id="theme-icon" className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
        </button>
        <button className="nav-icon-btn" onClick={toggleLanguage} aria-label="Change language" title="عربي / English">
          <i className="fas fa-language" aria-hidden="true"></i>
        </button>
        <button className="nav-icon-btn" onClick={handleSignOut} aria-label="تسجيل الخروج" title="Log out">
          <i className="fas fa-right-from-bracket" aria-hidden="true"></i>
        </button>
        <div className="nav-tools-wrap">
          <button
            className="nav-icon-btn"
            onClick={(event) => {
              event.stopPropagation();
              setIsToolsOpen((open) => !open);
            }}
            aria-label="الأدوات التعليمية"
            aria-expanded={isToolsOpen}
            aria-haspopup="true"
            id="nav-tools-trigger"
          >
            <i className="fas fa-th-large" aria-hidden="true"></i>
          </button>
          {/* Desktop dropdown (shown on >=768px) */}
          <div
            id="nav-tools-dropdown"
            role="menu"
            aria-labelledby="nav-tools-trigger"
            style={{ display: isToolsOpen ? "block" : undefined }}
          >
            <button className="dropdown-item t-quran" onClick={() => openTool("quran")} role="menuitem">
              <i className="fas fa-book-open"></i> لغز القرآن
            </button>
            <div className="dropdown-sep"></div>
            <button className="dropdown-item t-grammar" onClick={() => openTool("grammar")} role="menuitem">
              <i className="fas fa-book"></i> القواعد النحوية
            </button>
            <div className="dropdown-sep"></div>
            <button className="dropdown-item t-words" onClick={() => openTool("wordbuilder")} role="menuitem">
              <i className="fas fa-puzzle-piece"></i> بناء الكلمات
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
