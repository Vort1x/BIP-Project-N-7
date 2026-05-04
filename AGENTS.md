# AGENTS.md

## Project Goal

Build a beginner-friendly static prototype for a diagnostic science quiz. The app helps students aged 11-16 identify misconceptions about forces and motion, and gives teachers a simple summary of detected misconception frequencies.

## Technical Rules

- Use only HTML, CSS, and vanilla JavaScript.
- Do not add a backend.
- Do not add a database.
- Do not add frameworks.
- Do not add npm or build tools.
- The app must run by opening `index.html` in a browser.
- Keep code readable for beginner programmers.
- Prefer clear comments over clever abstractions.

## File Roles

- `index.html`: app layout and screen containers.
- `style.css`: visual styling and responsive layout.
- `script.js`: quiz state, rendering, feedback, final results, and dashboard.
- `data/questions.js`: question bank only.

## Development Notes

- Keep question data separate from app logic.
- Every wrong answer should include a misconception, feedback explanation, and counter-example.
- Use simple function names and small functions.
- Avoid local storage unless the team explicitly asks for persistence.
- Avoid changing the app into a login-based or server-based product.
