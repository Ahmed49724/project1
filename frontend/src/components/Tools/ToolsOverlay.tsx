"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { QuranPuzzle } from "./QuranPuzzle";
import { GrammarRules } from "./GrammarRules";
import { WordBuilder }  from "./WordBuilder";

export function ToolsOverlay() {
  const { activeModal, setActiveModal } = useAppContext();
  const close = () => setActiveModal(null);

  if (!activeModal) return null;

  return (
    <>
      {activeModal === "quran"      && <QuranPuzzle onClose={close} />}
      {activeModal === "grammar"    && <GrammarRules onClose={close} />}
      {activeModal === "wordbuilder"&& <WordBuilder  onClose={close} />}
    </>
  );
}
