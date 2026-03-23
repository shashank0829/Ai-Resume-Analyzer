import { useEffect, useState } from 'react'

function ScoreRing({ score }) {
  const [display, setDisplay] = useState(0)
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (display / 100) * circ
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171'
  const glow  = score >= 80 ? '0 0 20px rgba(52,211,153,0.45)' : score >= 60 ? '0 0 20px rgba(251,191,36,0.4)' : '0 0 20px rgba(248,113,113,0.4)'

  useEffect(() => {
    let cur = 0
    const step = score / 60
    const t = setInterval(() => {
      cur += step
      if (cur >= score) { setDisplay(score); clearInterval(t) }
      else setDisplay(Math.floor(cur))
    }, 16)
    return () => clearInterval(t)
  }, [score])

  return (
    <div className="relative flex-shrink-0" style={{ width: 148, height: 148 }}>
      <svg width="148" height="148" viewBox="0 0 148 148">
        <circle cx="74" cy="74" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9"/>
        <circle cx="74" cy="74" r={r} fill="none"
          stroke={color} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 74 74)"
          style={{ transition: 'stroke-dashoffset 0.05s linear', filter: `drop-shadow(${glow})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold leading-none" style={{ fontSize: 40, color }}>{display}</span>
        <span className="font-body text-[12px] mt-1" style={{ color: 'rgba(226,228,240,0.3)' }}>/100</span>
      </div>
    </div>
  )
}

export default function ScoreCard({ score, summary, breakdown }) {
  const label  = score >= 80 ? 'Strong profile'      : score >= 65 ? 'Needs improvement' : 'Needs major work'
  const lColor = score >= 80 ? 'rgba(52,211,153,1)'  : score >= 65 ? 'rgba(251,191,36,1)' : 'rgba(248,113,113,1)'
  const lBg    = score >= 80 ? 'rgba(52,211,153,0.08)': score >= 65 ? 'rgba(251,191,36,0.08)': 'rgba(248,113,113,0.08)'
  const lBorder= score >= 80 ? 'rgba(52,211,153,0.2)': score >= 65 ? 'rgba(251,191,36,0.2)': 'rgba(248,113,113,0.2)'

  return (
    <div className="card-base p-6 sm:p-8 animate-fade-up">
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-8">
        <ScoreRing score={score} />
        <div className="flex-1 min-w-[160px]">
          <span className="badge mb-4"
            style={{ background: lBg, color: lColor, border: `1px solid ${lBorder}` }}>
            {label}
          </span>
          <p className="font-body leading-[1.75] text-[15px]" style={{ color: 'rgba(226,228,240,0.55)' }}>
            {summary}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-6" style={{ height: 1, background: 'rgba(99,102,241,0.12)' }} />

      {/* Score breakdown */}
      <p className="section-label mb-4">Score breakdown</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {Object.entries(breakdown).map(([key, val]) => {
          const c = val >= 20 ? '#34d399' : val >= 12 ? '#fbbf24' : '#f87171'
          const pct = (val / 25) * 100
          return (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-display font-600 text-[12px] capitalize" style={{ color: 'rgba(226,228,240,0.5)' }}>{key}</span>
                <span className="font-code text-[12px] font-500 text-white">{val}<span style={{ color: 'rgba(226,228,240,0.3)' }}>/25</span></span>
              </div>
              <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full bar-animate"
                  style={{ width: `${pct}%`, background: c, boxShadow: `0 0 6px ${c}60` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
