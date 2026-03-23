# ResumeAI — Instant ATS Score Analyzer

Built with React + Tailwind CSS + Claude AI

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
```bash
cp .env.example .env
```
Open `.env` and replace `your_api_key_here` with your Anthropic API key.
Get one free at: https://console.anthropic.com

### 3. Run the app
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for production
```bash
npm run build
```

## Deploy to Vercel
1. Push to GitHub
2. Go to vercel.com → Import project
3. Add `VITE_ANTHROPIC_API_KEY` in Environment Variables
4. Deploy

## Tech Stack
- React 18
- Vite
- Tailwind CSS v3
- PDF.js (PDF text extraction)
- Anthropic Claude API
