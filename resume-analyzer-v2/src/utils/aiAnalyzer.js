export async function analyzeResume(resumeText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('API key missing. Add VITE_GEMINI_API_KEY to your .env file and restart npm run dev.')
  }

  const prompt = `You are an expert ATS resume analyzer. Analyze the resume below and return ONLY a valid JSON object. No markdown, no backticks, no explanation — just the raw JSON.

{
  "atsScore": <number 0-100>,
  "summary": "<2 sentence overall assessment>",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "weakBullets": ["original weak bullet 1", "original weak bullet 2", "original weak bullet 3"],
  "rewrittenBullets": ["improved bullet 1", "improved bullet 2", "improved bullet 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4"],
  "scoreBreakdown": {
    "formatting": <number 0-25>,
    "keywords": <number 0-25>,
    "experience": <number 0-25>,
    "impact": <number 0-25>
  }
}

Resume:
${resumeText}`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
  temperature: 0.1,
  maxOutputTokens: 8192,
}
      })
    }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }
const data = await response.json()

if (!data.candidates || data.candidates.length === 0) {
  throw new Error('No response from Gemini. Try again.')
}

const raw = data.candidates[0].content.parts[0].text.trim()

// strip markdown fences if present
const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()

try {
  return JSON.parse(clean)
} catch (e) {
  // If JSON is still broken, try extracting just the JSON object
  const match = clean.match(/\{[\s\S]*\}/)
  if (match) return JSON.parse(match[0])
  throw new Error('AI returned invalid response. Please try again.')
}
}
