# BIP EduAI UNITA 2025-2026: Diagnostic Science Quiz

This is a 4-day MVP prototype for diagnosing science misconceptions about forces and motion.

Students answer multiple-choice questions. Each wrong answer is linked to a specific misconception, immediate feedback, and a counter-example. Teachers can open the dashboard section to see which misconceptions appeared most often during the current browser session.

## How to Run

Open `index.html` directly in a web browser.

No install step is needed:

- No backend is required for the base quiz
- No database
- No npm
- No external libraries
- No internet connection required for the base quiz

You can also preview it with a simple static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Optional AI Feedback

The quiz can ask Google Gemini for a short adaptive explanation when a student chooses a wrong answer. This is optional and controlled by the "Use AI feedback" checkbox.

The Gemini API key is never stored in frontend JavaScript. The browser calls the Vercel serverless endpoint at `api/gemini.js`, and that endpoint reads the key from `process.env.GEMINI_API_KEY`.

If the API key is missing, the API request fails, or the app is opened without the Vercel backend, the quiz keeps using the prewritten feedback from `data/questions.js`.

### Local AI testing with Vercel

Create a `.env.local` file in the project root:

```text
GEMINI_API_KEY=your_key_here
```

Never commit `.env`, `.env.local`, or any real API key. These files are listed in `.gitignore` so local secrets stay out of the repository.

To test the serverless API locally, run the project with Vercel's local development server:

```bash
vercel dev
```

Then open the local URL shown by Vercel, turn on "Use AI feedback", and answer a question incorrectly.

Opening `index.html` directly or using `python3 -m http.server 8000` still works, but AI feedback will fall back to the prewritten explanations because those preview methods do not run the `/api/gemini` serverless function.

### Vercel deployment setup

In Vercel, add this environment variable for the project:

```text
GEMINI_API_KEY=your_api_key_here
```

Add it in the project settings under Environment Variables. After setting it, redeploy the project so `api/gemini.js` can read the value.

Do not put the Gemini API key in `index.html`, `script.js`, `style.css`, `README.md`, `AGENTS.md`, or any frontend file.

## File Structure

```text
.
├── api/
│   └── gemini.js      # Vercel serverless proxy for optional AI feedback
├── index.html          # Page structure and app screens
├── style.css           # Clean responsive styling
├── script.js           # Quiz logic and dashboard rendering
├── data/
│   └── questions.js    # Editable physics question data
├── README.md           # Project overview and running instructions
└── AGENTS.md           # Contributor guidance for future coding agents
```

## MVP Features

- Start screen explaining the quiz
- One-question-at-a-time student quiz flow
- Multiple-choice answers
- Immediate feedback after each answer
- Misconception name, explanation, and counter-example for wrong answers
- Final score screen
- Student misconception summary
- Teacher dashboard with misconception frequencies
- Restart button
- 8 forces and motion questions

## Editing Questions

Questions live in `data/questions.js`.

Each question has:

- `text`: the question shown to students
- `options`: the possible answers
- `correct`: marks the correct answer
- `misconception`: the misconception linked to a wrong answer
- `feedback`: the explanation shown after the answer
- `counterExample`: a concrete example that challenges the misconception

Keep misconception names consistent when you want the teacher dashboard to group answers together.

## Important Limitations

This MVP stores results only in browser memory. Refreshing the page resets the teacher dashboard. That is intentional because the project has no backend or database.
