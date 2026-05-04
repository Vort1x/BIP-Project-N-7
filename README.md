<div align="center">

<br/>

```
██╗   ██╗███╗   ██╗██╗      ████████╗ █████╗ ███████╗██╗  ██╗███████╗
██║   ██║████╗  ██║██║      ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
██║   ██║██╔██╗ ██║██║         ██║   ███████║███████╗█████╔╝ ███████╗
██║   ██║██║╚██╗██║██║         ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
╚██████╔╝██║ ╚████║██║         ██║   ██║  ██║███████║██║  ██╗███████║
 ╚═════╝ ╚═╝  ╚═══╝╚═╝         ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
```

**AI-Powered Unified Task Manager for Higher Education Students**

*BIP EduAI — UNITA · Edition 2025–2026 · Group N°7*

<br/>

[![Status](https://img.shields.io/badge/status-in%20development-orange?style=for-the-badge)](.)
[![BIP](https://img.shields.io/badge/BIP-EduAI%20UNITA-1F4E79?style=for-the-badge)](.)
[![License](https://img.shields.io/badge/license-MIT-2E75B6?style=for-the-badge)](LICENSE)
[![AI](https://img.shields.io/badge/AI-Claude%20API-blueviolet?style=for-the-badge)](https://www.anthropic.com)

<br/>

</div>

---

## 🎯 The Problem

University students today juggle **Moodle, email, Teams, Notion, WhatsApp, and personal calendars** — all at once, with no intelligent bridge between them. The result: missed deadlines, duplicated effort, and mounting stress — especially for international students navigating multilingual environments.

> *"Cognitive overload from tool fragmentation directly impairs learning outcomes and student wellbeing."*
> — EUROSTUDENT VII, 2021

**UNI-TASKS** solves this by acting as a single intelligent layer on top of every tool students already use.

---

## ✨ What It Does

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   📥 Moodle          📅 Google Calendar   📧 Email      │
│        │                    │                  │        │
│        └────────────────────┴──────────────────┘        │
│                             │                           │
│                    ┌────────▼────────┐                  │
│                    │   UNI-TASKS AI  │                  │
│                    │   (Claude API)  │                  │
│                    └────────┬────────┘                  │
│                             │                           │
│         ┌───────────────────┼───────────────────┐       │
│         │                   │                   │       │
│   📊 Dashboard        🔔 Smart alerts    📋 Study plan   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

| Feature | Description |
|--------|-------------|
| 🔗 **Multi-source aggregation** | Pulls tasks automatically from Moodle, Google Calendar, and email |
| 🧠 **AI priority scoring** | Claude API analyses deadlines, effort estimates, and your schedule to rank what matters most |
| 📅 **Adaptive study plans** | Suggests study blocks and resolves scheduling conflicts before they happen |
| 🔔 **Smart reminders** | 24-hour and 1-hour notifications, personalised to each student's rhythm |
| 🌍 **Multilingual support** | EN · FR · IT · PT — built for international & Erasmus+ students |
| 📈 **Teacher dashboard** | Anonymised cohort view — identify at-risk students without monitoring individuals |

---

## 🏗️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)

### AI & Integrations
![Anthropic](https://img.shields.io/badge/Claude_API-Anthropic-blueviolet?style=flat-square)
![Google](https://img.shields.io/badge/Google_Calendar_API-4285F4?style=flat-square&logo=google&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_FCM-FFCA28?style=flat-square&logo=firebase&logoColor=black)

### Auth
![OAuth](https://img.shields.io/badge/OAuth_2.0-EB5424?style=flat-square&logo=auth0&logoColor=white)
Institutional SSO · Moodle REST API

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.11
- PostgreSQL ≥ 15
- An [Anthropic API key](https://console.anthropic.com)
- A Moodle instance with REST API enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/uni-tasks.git
cd uni-tasks
```

```bash
# Backend setup
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your API keys
uvicorn main:app --reload
```

```bash
# Frontend setup
cd ../frontend
npm install
cp .env.example .env.local   # set VITE_API_URL
npm run dev
```

### Environment Variables

| Variable | Description |
|---------|-------------|
| `ANTHROPIC_API_KEY` | Your Claude API key |
| `MOODLE_URL` | Base URL of your institution's Moodle |
| `MOODLE_TOKEN` | Moodle web service token |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 client ID |
| `DATABASE_URL` | PostgreSQL connection string |
| `FIREBASE_KEY` | Firebase server key for push notifications |

---

## 📖 Usage Scenario

> **Monday morning, 8:00 AM.**
>
> Alice opens UNI-TASKS. Overnight, the app pulled 3 new assignments from Moodle, extracted 2 deadlines from her inbox, and detected a conflict between a group meeting and her statistics revision block. The AI — powered by Claude — recommends reordering her week, proposes a 2-hour study block on Wednesday, and will send her a reminder 24h before each deadline.
>
> Meanwhile, her professor sees that 40% of the cohort hasn't opened the project brief yet — and sends a nudge in one click.

---

## 🗂️ Project Structure

```
uni-tasks/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Dashboard, Login, Teacher view
│   │   ├── hooks/           # useAI, useTasks, useCalendar
│   │   └── services/        # API calls
│   └── public/
├── backend/
│   ├── app/
│   │   ├── routes/          # tasks, auth, moodle, calendar
│   │   ├── services/        # AI orchestration, notification logic
│   │   └── models/          # Database schemas
│   └── tests/
├── docs/                    # Architecture diagrams, ADRs
└── README.md
```

---

## 🔬 Research Background

This project is grounded in educational research:

- **Black & Wiliam (1998)** — *Assessment and Classroom Learning* — formative feedback improves outcomes only when specific and actionable
- **Hattie & Timperley (2007)** — *The Power of Feedback* — feedback addressing learning gaps has the highest effect size in education
- **Kirschner & De Bruyckere (2017)** — *The Myths of the Digital Native* — tool fragmentation, not digital fluency, is the core problem
- **European Commission (2022)** — *Digital Education Action Plan 2021–2027* — AI-assisted personalisation as a priority for HE

---

## 👥 Team

| Name | Institution | Role |
|------|------------|------|
| **Yassine Osman** | ISAN (FR) | Rapporteur |
| **Marin Babinger** | ISAN (FR) | Coordinator |
| **Lupo David Bisicchia** | UniTo (IT) | Technical Lead |
| **Marta Reis** | IPG (PT) | Pedagogical Lead |

*Developed as part of BIP EduAI — UNITA, a Blended Intensive Programme on Artificial Intelligence in Education.*

---

## 🗓️ Development Timeline

```
Week 1 (virtual)   ── Problem framing · Stakeholder analysis · Architecture design
                                              │
Physical Week      ──────────────────────────┤
  Day 1 (Mon)      ── Environment setup · API scaffold · First Claude call
  Day 2 (Tue)      ── MVP: task entry + AI priority scoring + dashboard UI
  Day 3 (Wed)      ── Moodle integration · Calendar sync · Usability test #1
  Day 4 (Thu)      ── Polish · Multilingual support · SUS evaluation · Demo
```

---

## 🤝 Contributing

This repository is part of an academic programme. Contributions from BIP participants welcome during the physical week.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## ⚖️ Ethical & Privacy Notes

- All student task data is processed locally or via GDPR-compliant EU endpoints
- No personally identifiable information is sent to external AI APIs — only anonymised task content
- Teacher dashboards show aggregated, anonymised data only
- Students can export or delete their data at any time

---

## 📄 License

MIT © 2025 — Group N°7, BIP EduAI UNITA

---

<div align="center">

*Built with ☕ and AI during BIP EduAI UNITA 2025–2026*

</div>
