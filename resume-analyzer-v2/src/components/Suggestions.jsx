export default function Suggestions({ suggestions }) {
  return (
    <div className="card-base p-6 sm:p-8 animate-fade-up-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 className="font-display font-bold text-[15px] text-white tracking-tight">Actionable suggestions</h2>
      </div>
      <p className="font-body text-[13px] leading-relaxed mb-6" style={{ color: 'rgba(226,228,240,0.38)' }}>
        Specific steps ranked by impact. Do these in order for the fastest score improvement.
      </p>

      <ol className="flex flex-col gap-3">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-4 rounded-xl px-4 py-3.5 transition-colors duration-150"
            style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)' }}>
            <span className="font-code font-500 text-[12px] w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>
              {i + 1}
            </span>
            <span className="font-body text-[14px] leading-relaxed" style={{ color: 'rgba(226,228,240,0.62)' }}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
