'use client'

import { useState, useCallback } from 'react'
import { speakAr } from '@/lib/speech'

// ── Data ──────────────────────────────────────────────────────────────────────

interface ColorWord {
  id: string
  arabic: string
  hex: string
}

const COLOR_WORDS: ColorWord[] = [
  { id: 'rose',    arabic: 'بَثَتَ', hex: '#fb7185' },
  { id: 'violet',  arabic: 'كَتَبَ', hex: '#a78bfa' },
  { id: 'fuchsia', arabic: 'ذَهَبَ', hex: '#e879f9' },
  { id: 'teal',    arabic: 'سَمِعَ', hex: '#2dd4bf' },
  { id: 'amber',   arabic: 'فَعَلَ', hex: '#fbbf24' },
  { id: 'sky',     arabic: 'نَظَرَ', hex: '#38bdf8' },
  { id: 'lime',    arabic: 'رَسَمَ', hex: '#a3e635' },
  { id: 'pink',    arabic: 'لَعِبَ', hex: '#f472b6' },
  { id: 'indigo',  arabic: 'قَرَأَ', hex: '#818cf8' },
]

interface Level {
  number: 1 | 2 | 3
  labelAr: string
  required: number
  available: string[]
}

const LEVELS: Level[] = [
  { number: 1, labelAr: 'المستوى الأول',  required: 3, available: ['rose', 'violet', 'fuchsia', 'teal', 'amber'] },
  { number: 2, labelAr: 'المستوى الثاني', required: 5, available: ['rose', 'violet', 'fuchsia', 'teal', 'amber', 'sky', 'lime'] },
  { number: 3, labelAr: 'المستوى الثالث', required: 7, available: ['rose', 'violet', 'fuchsia', 'teal', 'amber', 'sky', 'lime', 'pink', 'indigo'] },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function pickTargetColors(available: string[], count: number): string[] {
  return [...available].sort(() => Math.random() - 0.5).slice(0, count)
}

function mixHexColors(hexList: string[]): string {
  if (hexList.length === 0) return '#fce7f3'
  const parse = (h: string, pos: number) => parseInt(h.slice(pos, pos + 2), 16)
  const avg = (pos: number) =>
    Math.round(hexList.reduce((s, h) => s + parse(h, pos), 0) / hexList.length)
      .toString(16).padStart(2, '0')
  return `#${avg(1)}${avg(3)}${avg(5)}`
}

// ── State ─────────────────────────────────────────────────────────────────────

type GameStatus = 'playing' | 'win' | 'lose'

interface GameState {
  levelIndex: number
  targetIds: string[]
  addedIds: string[]
  status: GameStatus
  potPulse: boolean
}

function buildInitialState(levelIndex: number): GameState {
  const level = LEVELS[levelIndex]
  return {
    levelIndex,
    targetIds: pickTargetColors(level.available, level.required),
    addedIds: [],
    status: 'playing',
    potPulse: false,
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ColorMixerGameProps {
  onComplete?: () => void
}

export function ColorMixerGame({ onComplete }: ColorMixerGameProps) {
  const [state, setState] = useState<GameState>(() => buildInitialState(0))

  const level        = LEVELS[state.levelIndex]
  const words        = COLOR_WORDS.filter((w) => level.available.includes(w.id))
  const targetColors = state.targetIds.map((id) => COLOR_WORDS.find((w) => w.id === id)!)
  const targetHex    = mixHexColors(targetColors.map((c) => c.hex))
  const mixedHex     = mixHexColors(
    state.addedIds.map((id) => COLOR_WORDS.find((w) => w.id === id)!.hex),
  )
  const progressPct  = Math.min((state.addedIds.length / level.required) * 100, 100)

  const handleWordClick = useCallback((word: ColorWord) => {
    if (state.status !== 'playing') return
    if (state.addedIds.includes(word.id)) return

    speakAr(word.arabic)

    // Wrong word → immediate lose
    if (!state.targetIds.includes(word.id)) {
      setState((prev) => ({ ...prev, status: 'lose' }))
      return
    }

    setState((prev) => {
      const nextAdded = [...prev.addedIds, word.id]
      const won       = prev.targetIds.every((id) => nextAdded.includes(id))
      return { ...prev, addedIds: nextAdded, status: won ? 'win' : 'playing', potPulse: true }
    })
    setTimeout(() => setState((p) => ({ ...p, potPulse: false })), 600)
  }, [state])

  const handleReset = useCallback(
    () => setState(buildInitialState(state.levelIndex)),
    [state.levelIndex],
  )

  const handleNext = useCallback(() => {
    if (state.levelIndex >= LEVELS.length - 1) {
      onComplete?.()
    } else {
      setState(buildInitialState(state.levelIndex + 1))
    }
  }, [state.levelIndex, onComplete])

  return (
    <div dir="rtl" style={{ textAlign: 'center' }}>

      {/* Header */}
      <div className="section-heading" style={{ marginBottom: '20px' }}>
        <span className="section-badge">🎨</span> مزج الألوان — Color Mixer
      </div>

      {/* Level tabs */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {LEVELS.map((l, idx) => (
          <button
            key={l.number}
            onClick={() => setState(buildInitialState(idx))}
            style={{
              padding: '6px 18px',
              borderRadius: '999px',
              border: idx === state.levelIndex ? '2px solid #e879f9' : '2px solid #e5e7eb',
              background: idx === state.levelIndex
                ? 'linear-gradient(135deg,#e879f9,#a78bfa)'
                : '#fff',
              color: idx === state.levelIndex ? '#fff' : '#a78bfa',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: idx === state.levelIndex ? '0 4px 12px #e879f955' : 'none',
            }}>
            {l.labelAr}
          </button>
        ))}
      </div>

      {/* Pots */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '36px', marginBottom: '28px',
      }}>
        {/* Target pot */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a78bfa' }}>الهدف 🎯</span>
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%',
            background: targetHex,
            boxShadow: `0 0 0 4px #ede9fe, 0 8px 24px ${targetHex}66`,
            transition: 'background 0.5s',
          }} />
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '88px' }}>
            {targetColors.map((c) => (
              <span key={c.id} style={{
                width: '13px', height: '13px', borderRadius: '50%',
                background: c.hex, border: '2px solid #fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                display: 'inline-block',
              }} />
            ))}
          </div>
        </div>

        <span style={{ fontSize: '2rem' }}>⚡</span>

        {/* Mixing pot */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fb7185' }}>وعاء المزج 🪄</span>
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%',
            background: state.addedIds.length ? mixedHex : '#fce7f3',
            boxShadow: `0 0 0 4px #fce7f3, 0 8px 24px ${mixedHex}66`,
            transition: 'background 0.5s',
            animation: state.potPulse ? 'bounce 0.4s ease' : 'none',
          }} />
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '88px' }}>
            {state.addedIds.length === 0
              ? <span style={{ fontSize: '0.72rem', color: '#f9a8d4' }}>فارغ</span>
              : state.addedIds.map((id) => {
                  const c = COLOR_WORDS.find((w) => w.id === id)!
                  return (
                    <span key={id} style={{
                      width: '13px', height: '13px', borderRadius: '50%',
                      background: c.hex, border: '2px solid #fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      display: 'inline-block',
                    }} />
                  )
                })}
          </div>
        </div>
      </div>

      {/* Win / Lose card */}
      {state.status !== 'playing' && (
        <div style={{
          margin: '0 auto 24px',
          maxWidth: '360px',
          borderRadius: '22px',
          padding: '28px 24px',
          background: state.status === 'win'
            ? 'linear-gradient(135deg,#ccfbf1,#fce7f3)'
            : 'linear-gradient(135deg,#fee2e2,#fce7f3)',
          border: state.status === 'win' ? '2px solid #2dd4bf' : '2px solid #fb7185',
          boxShadow: '0 16px 40px rgba(15,23,42,0.12)',
        }}>
          <div style={{ fontSize: '3.2rem', marginBottom: '10px' }}>
            {state.status === 'win' ? '🌟' : '💔'}
          </div>
          <div style={{
            fontFamily: 'var(--font-tajawal),sans-serif',
            fontWeight: 900,
            fontSize: '1.25rem',
            color: state.status === 'win' ? '#0d9488' : '#e11d48',
            marginBottom: '6px',
          }}>
            {state.status === 'win' ? 'أحسنتِ! ممتاز! 🎉' : 'حاولي مرة أخرى! 💪'}
          </div>
          <div style={{ fontSize: '0.88rem', color: '#a78bfa', marginBottom: '22px' }}>
            {state.status === 'win'
              ? 'مزجتِ الألوان الصحيحة تماماً'
              : 'الألوان لم تتطابق، لا تستسلمي!'}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={handleReset}>
              <i className="fas fa-rotate-right" /> مرة أخرى
            </button>
            {state.status === 'win' && (
              <button className="btn-primary" onClick={handleNext}>
                {state.levelIndex < LEVELS.length - 1 ? 'المستوى التالي ✨' : 'التالي'}
                {' '}<i className="fas fa-arrow-left" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Progress bar */}
      {state.status === 'playing' && (
        <div style={{ margin: '0 auto 22px', maxWidth: '320px' }}>
          <div style={{ fontSize: '0.8rem', color: '#a78bfa', marginBottom: '8px', fontWeight: 600 }}>
            {state.addedIds.length} / {level.required} ألوان مضافة
          </div>
          <div style={{ height: '10px', background: '#f3e8ff', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg,#e879f9,#a78bfa)',
              borderRadius: '999px',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      )}

      {/* Word buttons */}
      {state.status === 'playing' && (
        <div style={{
          display: 'flex', gap: '10px', flexWrap: 'wrap',
          justifyContent: 'center', maxWidth: '600px', margin: '0 auto',
        }}>
          {words.map((word) => {
            const isAdded = state.addedIds.includes(word.id)
            return (
              <button
                key={word.id}
                onClick={() => handleWordClick(word)}
                disabled={isAdded}
                style={{
                  position: 'relative',
                  padding: '14px 22px',
                  borderRadius: '20px',
                  border: isAdded ? '2px solid #e5e7eb' : `2px solid ${word.hex}`,
                  background: isAdded ? '#f9f9fb' : `${word.hex}18`,
                  color: isAdded ? '#c4b5fd' : word.hex,
                  fontFamily: 'var(--font-noto-naskh),serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  cursor: isAdded ? 'default' : 'pointer',
                  opacity: isAdded ? 0.45 : 1,
                  boxShadow: isAdded ? 'none' : `0 6px 18px ${word.hex}33`,
                  transform: isAdded ? 'scale(0.94)' : 'scale(1)',
                  transition: 'all 0.25s ease',
                  direction: 'rtl',
                }}>
                {word.arabic}
                {isAdded && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    fontSize: '0.75rem',
                    background: '#10b981', color: '#fff',
                    borderRadius: '50%', width: '18px', height: '18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'sans-serif', fontWeight: 900,
                  }}>✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}

    </div>
  )
}
