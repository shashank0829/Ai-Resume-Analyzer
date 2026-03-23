import { useRef, useState } from 'react'

export default function UploadSection({ onUpload, loading }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleFile(file) {
    if (file?.type === 'application/pdf') onUpload(file)
  }
  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div
        onClick={() => !loading && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`upload-zone py-20 px-8 text-center ${dragging ? 'drag-over' : ''} ${loading ? 'is-loading' : ''} ${!loading ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <input ref={inputRef} type="file" accept=".pdf" className="hidden"
          onChange={(e) => handleFile(e.target.files[0])} />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          {loading ? (
            <div className="spinner" />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          )}
        </div>

        {/* Text */}
        <p className={`font-display font-bold text-xl mb-2 tracking-tight ${loading ? 'shimmer-text' : 'text-white'}`}>
          {loading ? 'Analyzing your resume...' : 'Drop your resume here'}
        </p>
        <p className="font-body text-sm" style={{ color: 'rgba(226,228,240,0.35)' }}>
          {loading
            ? 'Gemini AI is reading and scoring your resume'
            : 'or click to browse · PDF files only · free & private'}
        </p>

        {/* Format hint */}
        {!loading && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="font-code text-[11px] px-3 py-1 rounded-md"
              style={{ background: 'rgba(99,102,241,0.08)', color: 'rgba(165,180,252,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
              .pdf
            </span>
            <span className="font-body text-[11px]" style={{ color: 'rgba(226,228,240,0.2)' }}>supported format</span>
          </div>
        )}
      </div>
    </div>
  )
}
