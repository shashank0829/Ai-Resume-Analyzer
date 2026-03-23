export default function BulletRewriter({ weak, rewritten }) {
  return (
    <div className="card-base p-6 sm:p-8 animate-fade-up-3">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <h2 className="font-display font-bold text-[15px] text-white tracking-tight">Bullet point rewrites</h2>
      </div>
      <p className="font-body text-[13px] leading-relaxed mb-6" style={{ color: 'rgba(226,228,240,0.38)' }}>
        AI-improved versions with stronger action verbs, specificity, and measurable impact.
      </p>

      <div className="flex flex-col gap-4">
        {weak.map((bullet, i) => (
          <div key={i} className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(99,102,241,0.12)', background: 'rgba(7,8,15,0.6)' }}>

            {/* Before */}
            <div className="px-5 py-4 flex items-start gap-3"
              style={{ borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
              <span className="badge flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(248,113,113,0.08)', color: '#fca5a5', border: '1px solid rgba(248,113,113,0.2)' }}>
                Before
              </span>
              <p className="font-body text-[13px] leading-relaxed line-through"
                style={{ color: 'rgba(226,228,240,0.28)' }}>{bullet}</p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-2" style={{ color: 'rgba(99,102,241,0.35)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </div>

            {/* After */}
            <div className="px-5 py-4 flex items-start gap-3">
              <span className="badge flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(52,211,153,0.08)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.2)' }}>
                After
              </span>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: '#6ee7b7' }}>{rewritten[i]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
