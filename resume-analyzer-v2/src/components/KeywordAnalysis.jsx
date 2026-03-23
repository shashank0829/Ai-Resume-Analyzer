export default function KeywordAnalysis({ missing, strengths }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-up-2">

      {/* Missing keywords */}
      <div className="card-base p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h2 className="font-display font-bold text-[15px] text-white tracking-tight">Missing keywords</h2>
        </div>
        <p className="font-body text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(226,228,240,0.38)' }}>
          Add these to your skills section or bullet points to increase ATS match rate.
        </p>
        <div className="flex flex-wrap gap-2">
          {missing.map((kw, i) => (
            <span key={i} className="font-display font-600 text-[11px] px-3 py-1.5 rounded-lg tracking-wide"
              style={{ background: 'rgba(248,113,113,0.08)', color: '#fca5a5', border: '1px solid rgba(248,113,113,0.18)' }}>
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="card-base p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="font-display font-bold text-[15px] text-white tracking-tight">What's working</h2>
        </div>
        <p className="font-body text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(226,228,240,0.38)' }}>
          These elements are already strong in your resume.
        </p>
        <ul className="flex flex-col gap-3">
          {strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[7px] flex-shrink-0 w-[5px] h-[5px] rounded-full"
                style={{ background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.5)' }} />
              <span className="font-body text-[14px] leading-relaxed" style={{ color: 'rgba(226,228,240,0.55)' }}>{s}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
