"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type ModalId = "quran" | "grammar" | "wordbuilder" | null;
type Theme = "light" | "dark";
type Language = "ar" | "en";

interface AppState {
  // ── Learner state ──────────────────────────────────────
  starsCount: number;
  studentName: string;
  theme: Theme;
  language: Language;
  addStars: (count: number) => void;
  setStudentName: (name: string) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;

  // ── Modal control ──────────────────────────────────────
  activeModal: ModalId;
  setActiveModal: (modal: ModalId) => void;

  // ── Auth state ─────────────────────────────────────────
  user: User | null;
  session: Session | null;
  isAuthLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithStudentCode: (code: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── Learner state ──────────────────────────────────────────────
  const [starsCount, setStarsCount] = useState(0);
  const [studentName, setStudentNameState] = useState("—");
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("ar");
  const [activeModal, setActiveModal] = useState<ModalId>(null);

  // ── Auth state ─────────────────────────────────────────────────
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // ── Bootstrap: localStorage + Supabase session ─────────────────
  useEffect(() => {
    // Load local preferences
    const savedStars = localStorage.getItem("jamea_stars");
    if (savedStars) setStarsCount(parseInt(savedStars, 10));

    const savedName = localStorage.getItem("jamea_student_name");
    if (savedName) setStudentNameState(savedName);

    const savedTheme = localStorage.getItem("jamea_theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }

    const savedLang = localStorage.getItem("jamea_lang") as Language | null;
    if (savedLang) {
      setLanguage(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }

    if (!isSupabaseConfigured) {
      // Offline / demo mode — restore student-code session from localStorage
      const offlineName = localStorage.getItem("jamea_student_name");
      if (offlineName && offlineName !== "—") {
        setStudentNameState(offlineName);
      }
      setIsAuthLoading(false);
      return;
    }

    // Check existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.full_name) {
        const name = session.user.user_metadata.full_name as string;
        setStudentNameState(name);
        localStorage.setItem("jamea_student_name", name);
      }
      setIsAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user?.user_metadata?.full_name) {
          const name = session.user.user_metadata.full_name as string;
          setStudentNameState(name);
          localStorage.setItem("jamea_student_name", name);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Learner actions ────────────────────────────────────────────
  const addStars = useCallback((count: number) => {
    setStarsCount((prev) => {
      const newStars = prev + count;
      localStorage.setItem("jamea_stars", newStars.toString());
      return newStars;
    });
  }, []);

  const setStudentName = useCallback((name: string) => {
    setStudentNameState(name);
    localStorage.setItem("jamea_student_name", name);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("jamea_theme", next);
      document.body.className = next;
      return next;
    });
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      localStorage.setItem("jamea_lang", next);
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  // ── Auth actions ───────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) {
      alert("Supabase is not configured yet. Please add your keys to .env.local");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  }, []);

  const signInWithStudentCode = useCallback(async (code: string): Promise<boolean> => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return false;

    if (!isSupabaseConfigured) {
      // Offline mode: accept any non-empty code as student name
      setStudentName(trimmed);
      return true;
    }

    // Query Supabase children table
    const { data, error } = await supabase
      .from("children")
      .select("display_name, code")
      .eq("code", trimmed)
      .single();

    if (error || !data) return false;

    setStudentName(data.display_name ?? trimmed);
    localStorage.setItem("jamea_student_code", trimmed);
    return true;
  }, [setStudentName]);

  const signOut = useCallback(async () => {
    localStorage.removeItem("jamea_student_name");
    localStorage.removeItem("jamea_student_code");
    localStorage.removeItem("jamea_stars");
    setStudentNameState("—");
    setStarsCount(0);
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        starsCount, studentName, theme, language,
        addStars, setStudentName, toggleTheme, toggleLanguage,
        user, session, isAuthLoading,
        signInWithGoogle, signInWithStudentCode, signOut,
        activeModal, setActiveModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
