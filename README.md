# BIP EduAI UNITA 2025-2026: Diagnostic Science Quiz

This is a 4-day MVP prototype for diagnosing science misconceptions about forces and motion.

Students answer multiple-choice questions. Each wrong answer is linked to a specific misconception, immediate feedback, and a counter-example. Teachers can open the dashboard section to see which misconceptions appeared most often during the current browser session.

## How to Run

Open `index.html` directly in a web browser.

No install step is needed:

- No backend
- No database
- No npm
- No external libraries
- No internet connection required

## File Structure

```text
.
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
