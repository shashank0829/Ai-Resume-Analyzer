import { useState } from 'react'
import { extractTextFromPDF } from './utils/pdfExtractor'
import { analyzeResume } from './utils/aiAnalyzer'
import UploadSection from './components/UploadSection'
import ScoreCard from './components/ScoreCard'
import KeywordAnalysis from './components/KeywordAnalysis'
import BulletRewriter from './components/BulletRewriter'
import Suggestions from './components/Suggestions'

const FEATURES = [
  { icon: '⚡', title: 'Instant results', desc: 'Full AI analysis in under 15 seconds' },
  { icon: '🎯', title: 'ATS scoring',     desc: 'Know exactly how recruiters see you' },
  { icon: '✦',  title: 'Bullet rewrites', desc: 'AI upgrades your weakest points' },
  { icon: '◎',  title: 'Keyword gaps',    desc: "See what's missing from your resume" },
]

export default function App() {
  const [result,   setResult]   = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [fileName, setFileName] = useState(null)

  async function handleUpload(file) {
    setLoading(true)
    setError(null)
    setResult(null)
    setFileName(file.name)
    try {
      const text = await extractTextFromPDF(file)
      if (!text.trim()) throw new Error('Could not extract text. Make sure your PDF is not a scanned image.')
      const data = await analyzeResume(text)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setResult(null)
    setError(null)
    setFileName(null)
  }

  return (
    <div className="min-h-screen ambient-bg text-[#e2e4f0] relative overflow-x-hidden">

      {/* Dot grid */}
      <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[rgba(99,102,241,0.12)] bg-[rgba(7,8,15,0.82)] backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-[62px] flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <span className="font-display font-bold text-[17px] tracking-tight text-white">
              resume<span style={{ color: '#818cf8' }}>ai</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {result && (
              <button onClick={handleReset} className="btn-ghost">
                ← New analysis
              </button>
            )}
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-display font-700 text-[rgba(226,228,240,0.3)] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] inline-block" style={{ boxShadow: '0 0 6px #34d399' }} />
              Free · No signup
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 pt-12 pb-28 relative z-10">

        {/* Hero */}
        {!result && !loading && (
          <div className="text-center pt-6 pb-14 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border"
              style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" style={{ boxShadow: '0 0 6px #818cf8' }} />
              <span className="font-display font-700 text-[11px] tracking-[0.1em] uppercase text-[#a5b4fc]">
                Powered by Gemini AI
              </span>
            </div>

            <h1 className="font-display font-bold leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(38px, 6.5vw, 72px)' }}>
              <span className="text-white">Your resume,</span>
              <br />
              <span className="text-gradient">ruthlessly analyzed.</span>
            </h1>

            <p className="font-body text-[rgba(226,228,240,0.5)] max-w-[480px] mx-auto leading-[1.8] mb-10"
              style={{ fontSize: 'clamp(15px, 2vw, 17px)' }}>
              Upload your PDF and get a detailed ATS score, keyword gaps,
              rewritten bullet points, and specific suggestions — in seconds.
            </p>
          </div>
        )}

        {/* Results header */}
        {result && (
          <div className="mb-8 animate-fade-up">
            <p className="section-label mb-2">Analysis complete</p>
            <h2 className="font-display font-bold text-[28px] text-white tracking-tight mb-1">
              Your resume report
            </h2>
            <div className="flex items-center gap-2 font-code text-[12px] text-[rgba(226,228,240,0.3)]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              {fileName}
            </div>
          </div>
        )}

        {/* Upload */}
        {!result && <UploadSection onUpload={handleUpload} loading={loading} />}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl px-5 py-4 text-sm mb-6 font-body"
            style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', color: '#fca5a5' }}>
            <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-5">
            <ScoreCard score={result.atsScore} summary={result.summary} breakdown={result.scoreBreakdown} />
            <KeywordAnalysis missing={result.missingKeywords} strengths={result.strengths} />
            <BulletRewriter weak={result.weakBullets} rewritten={result.rewrittenBullets} />
            <Suggestions suggestions={result.suggestions} />
          </div>
        )}

        {/* Feature grid */}
        {!result && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="card-base p-5 text-center" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="text-2xl mb-3 font-display" style={{ color: '#818cf8' }}>{f.icon}</div>
                <h3 className="font-display font-600 text-[13px] text-white mb-1.5 tracking-tight">{f.title}</h3>
                <p className="font-body text-[12px] leading-relaxed" style={{ color: 'rgba(226,228,240,0.38)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-7 relative z-10"
        style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
        <p className="font-display text-[11px] tracking-widest uppercase" style={{ color: 'rgba(226,228,240,0.2)' }}>
          Built with React · Tailwind CSS · Gemini AI
        </p>
      </footer>
    </div>
  )
}
