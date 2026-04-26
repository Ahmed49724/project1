"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Pages where the nav is hidden entirely
const HIDDEN_PATHS = ["/", "/login"];

export const AppNav: React.FC = () => {
  const {
    starsCount, studentName, theme, language,
    toggleTheme, toggleLanguage, signOut, setActiveModal,
  } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // Hide on login screen
  if (HIDDEN_PATHS.includes(pathname)) return null;

  const handleBack = () => router.back();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <nav id="app-nav" role="navigation" aria-label="Main navigation">
        {/* ── Start slot: Back + Breadcrumb ── */}
        <div className="nav-start">
          <button id="nav-back-btn" onClick={handleBack} aria-label="رجوع">
            <i className="fas fa-chevron-right" aria-hidden="true" />
            <span>رجوع</span>
          </button>
          <nav id="nav-breadcrumb" aria-label="Breadcrumb">
            <span className="bc-crumb active">جامع</span>
          </nav>
        </div>

        {/* ── Center: Logo → /dashboard ── */}
        <div className="nav-mid">
          <Link href="/dashboard" className="nav-logo" aria-label="Jamea home">
            جامع
          </Link>
        </div>

        {/* ── End slot: Stars, Name, Theme, Lang, Logout, Tools ── */}
        <div className="nav-end">
          <div className="nav-chip nav-chip-stars" aria-label="النجوم المكتسبة">
            <i className="fas fa-star" aria-hidden="true" />
            <span id="nav-stars-count">{starsCount}</span>
          </div>
          <div className="nav-chip nav-chip-student" aria-label="اسم الطالب">
            <i className="fas fa-user-circle" aria-hidden="true" />
            <span id="nav-student-name">{studentName}</span>
          </div>
          <button className="nav-icon-btn" onClick={toggleTheme} aria-label="تبديل المظهر" title="Toggle theme">
            <i id="theme-icon" className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`} aria-hidden="true" />
          </button>
          <button className="nav-icon-btn" onClick={toggleLanguage} aria-label="Change language" title="عربي / English">
            <i className="fas fa-language" aria-hidden="true" />
          </button>
          <button className="nav-icon-btn" onClick={handleSignOut} aria-label="تسجيل الخروج" title="Log out">
            <i className="fas fa-right-from-bracket" aria-hidden="true" />
          </button>

          {/* Tools dropdown */}
          <div className="nav-tools-wrap">
            <button
              className="nav-icon-btn"
              onClick={() => setIsToolsOpen((o) => !o)}
              aria-label="الأدوات التعليمية"
              aria-expanded={isToolsOpen}
              id="nav-tools-trigger"
            >
              <i className="fas fa-th-large" aria-hidden="true" />
            </button>

            {isToolsOpen && (
              <div id="nav-tools-dropdown" role="menu" style={{ display: "block" }}>
                <button className="dropdown-item t-quran" onClick={() => { setIsToolsOpen(false); setActiveModal("quran"); }} role="menuitem">
                  <i className="fas fa-book-open" /> لغز القرآن
                </button>
                <div className="dropdown-sep" />
                <button className="dropdown-item t-grammar" onClick={() => { setIsToolsOpen(false); setActiveModal("grammar"); }} role="menuitem">
                  <i className="fas fa-book" /> القواعد النحوية
                </button>
                <div className="dropdown-sep" />
                <button className="dropdown-item t-words" onClick={() => { setIsToolsOpen(false); setActiveModal("wordbuilder"); }} role="menuitem">
                  <i className="fas fa-puzzle-piece" /> بناء الكلمات
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav id="bottom-tab-bar" role="navigation" aria-label="Bottom navigation">
        <button
          className={`tab-item ${pathname === "/dashboard" ? "active" : ""}`}
          onClick={() => router.push("/dashboard")}
        >
          <i className="fas fa-home" aria-hidden="true" />
          <span>الرئيسية</span>
        </button>
        <button className="tab-item">
          <i className="fas fa-chart-line" aria-hidden="true" />
          <span>التقدم</span>
        </button>
        <button className="tab-item" onClick={() => setIsToolsOpen((o) => !o)}>
          <i className="fas fa-th-large" aria-hidden="true" />
          <span>الأدوات</span>
        </button>
        <button className="tab-item">
          <i className="fas fa-user" aria-hidden="true" />
          <span>أنا</span>
        </button>
      </nav>
    </>
  );
};
