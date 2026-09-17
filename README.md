# AI Engineer OS

> **My 2-Year Journey to Becoming an AI Engineer**  
> *Learn → Build → Test → Deploy → Evaluate → Improve → Repeat*

---

## 1. What is AI Engineer OS?

**AI Engineer OS** is a personal training and career-development operating system designed to guide a developer through an intensive 2-year transformation into a production AI Engineer.

It is **not** a generic video course dashboard or an LMS. It separates:
* **Roadmap**: What exists to learn across 17 parallel tracks (270 curated skills).
* **Timeline**: When you intend to focus on it across 8 dynamic phases (24 monthly checkpoints).
* **Projects**: Proof of ability through 50 progressive projects (Mini, Intermediate, Advanced, Capstone).
* **Engineering Proof Score**: Verifiable evidence (GitHub repos, live demos, automated tests, eval suites, docs).
* **XP & Levels**: Activity and momentum tracking (500 XP per level).
* **Challenges**: Hands-on problem solving without tutorials.
* **Portfolio Readiness**: A 22-point competency audit.

---

## 2. Architecture & Tech Stack

```text
ai-engineer-os/
│
├── public/
│   └── favicon.svg              # Clean SVG technical favicon
│
├── src/
│   ├── types/                   # Strict TypeScript contracts
│   │   ├── roadmap.ts           # Track, Skill, Difficulty
│   │   ├── project.ts           # Project, Proof, Status, Bonuses
│   │   ├── timeline.ts          # Phase, Checkpoint, PhaseStatus
│   │   ├── challenge.ts         # Challenge, Difficulty
│   │   ├── activity.ts          # ActivityLogEntry, ActivityType
│   │   ├── state.ts             # AppState, ProofScoreBreakdown
│   │   └── search.ts            # SearchItem, SearchResult
│   │
│   ├── data/                    # Clean static dataset layer
│   │   ├── roadmap/             # Modular 17-track skill definitions
│   │   │   ├── tracks.ts        # 17 track metadata and icons
│   │   │   ├── skillsPart1.ts   # Software Eng, DSA, Backend, Math, ML, Deep Learning
│   │   │   ├── skillsPart2.ts   # LLM Eng, RAG, Agents, Eval, Production AI, MLOps
│   │   │   └── skillsPart3.ts   # AI Security, Adv LLM, Infra, Data Eng, System Design
│   │   ├── roadmap.ts           # Aggregator & fast lookup maps
│   │   ├── projects.ts          # 50 progressive projects (15 Mini, 20 Inter, 12 Adv, 3 Capstone)
│   │   ├── timeline.ts          # 8 phases, 24 monthly checkpoints
│   │   ├── challenges.ts        # 14 zero-tutorial engineering challenges
│   │   ├── milestones.ts        # Non-reversible milestone specifications
│   │   └── portfolioChecklist.ts# 22 readiness checklist categories
│   │
│   ├── store/                   # Unidirectional state management
│   │   ├── AppContext.tsx       # React Context provider with memoized engines
│   │   ├── appReducer.ts        # Pure action reducer with milestone triggers
│   │   ├── persistence.ts       # LocalStorage serialization & schema validator
│   │   └── migrations.ts        # Schema versioning (v1) and upgrade logic
│   │
│   ├── utils/                   # Business logic and deterministic engines
│   │   ├── xp.ts                # XP and level formulas
│   │   ├── proofScore.ts        # Engineering Proof Score algorithm
│   │   ├── dates.ts             # Dynamic 2-year calendar & phase status logic
│   │   ├── recommendations.ts   # Daily mission & next action priority engine
│   │   ├── streak.ts            # Streak calculation & heatmap generator
│   │   └── notifications.ts     # Browser Notification API wrapper
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useProgress.ts       # Track breakdown and macro counters
│   │   └── useGlobalSearch.ts   # Omnisearch across skills, projects, checkpoints
│   │
│   ├── components/              # Modular UI components
│   │   ├── layout/              # Sidebar, Header, MobileNav, AppLayout
│   │   ├── common/              # Badge, ProgressBar, Modal, GlobalSearchModal, EmptyState
│   │   ├── dashboard/           # HeroStats, CurrentPhaseCard, TodayMissionCard, etc.
│   │   ├── roadmap/             # TrackAccordion, SkillCard, RoadmapFilters
│   │   ├── timeline/            # TimelineOverview, PhaseDetailCard
│   │   ├── projects/            # ProjectCard, ProjectProofModal, ProjectFilters
│   │   ├── challenges/          # ChallengeCard, ChallengeFilters
│   │   ├── activity/            # StreakCalendar, ActivityLogList
│   │   ├── readiness/           # ProofScoreBreakdownCard, PortfolioChecklistSection
│   │   └── settings/            # TimelineSettings, BackupSection, NotificationSettings, DangerZone
│   │
│   ├── pages/                   # Top-level view pages
│   │   ├── Dashboard.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Timeline.tsx
│   │   ├── Projects.tsx
│   │   ├── Challenges.tsx
│   │   ├── Activity.tsx
│   │   ├── Readiness.tsx
│   │   └── Settings.tsx
│   │
│   ├── App.tsx                  # Main router & layout container
│   ├── main.tsx                 # DOM mounting entrypoint
│   └── index.css                # Tailwind directives & technical dark theme
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### Stack
* **Framework**: React 19 + TypeScript (ES2022)
* **Build Tool**: Vite 6
* **Styling**: Tailwind CSS (Dark technical developer aesthetic)
* **Icons**: Lucide React + custom SVG icons
* **Persistence**: LocalStorage with schema versioning and JSON import/export

---

## 3. Getting Started

### Prerequisites
* Node.js v18+ (tested on v24)
* npm v9+

### Installation & Local Run
```bash
# Clone or navigate to the directory
cd c:\Dev_Projects\grind

# Install dependencies
npm install

# Run the local Vite development server
npm run dev

# Or build and run production preview
npm run build
npm run preview
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 4. How the Core Systems Work

### 1. Roadmap (17 Parallel Tracks)
* **Non-linear execution**: You can study Software Engineering, Math, and LLM Engineering at the same time.
* Each skill specifies: `id`, `title`, `description`, `trackId`, `difficulty`, `estimatedHours`, `prerequisites`, `relatedProjects`, and `tags`.
* Clicking a skill completes it, awards XP, recalculates roadmap completion %, updates active checkpoints, and logs an event. Unchecking reverses the skill's XP cleanly.

### 2. The 2-Year Dynamic Timeline & Phase Status Logic
* The timeline calculates exact calendar months, leap years, and day boundaries starting from your configured `startDate` to `targetGraduationDate`.
* **Phases**:
  1. **Phase 1 (Months 1–3)**: Foundation & Core Engineering (Python, DSA, Testing)
  2. **Phase 2 (Months 4–6)**: Backend Systems & Classical ML (FastAPI, PostgreSQL, Redis, XGBoost)
  3. **Phase 3 (Months 7–9)**: Deep Learning & Neural Networks (PyTorch, Autograd, CNNs, Transformers)
  4. **Phase 4 (Months 10–12)**: LLM Engineering (Tokenization, Structured Outputs, Function Calling)
  5. **Phase 5 (Months 13–15)**: RAG & Autonomous Agents (Qdrant, Hybrid Search, LangGraph)
  6. **Phase 6 (Months 16–18)**: Production AI, Evaluation & Observability (Docker, CI/CD, Ragas, MCP)
  7. **Phase 7 (Months 19–21)**: Advanced AI Engineering & MLOps (QLoRA Fine-Tuning, vLLM, Security)
  8. **Phase 8 (Months 22–24)**: Capstone, System Design & Career Readiness (High-scale AI platform)
* **Phase Statuses**:
  * `UPCOMING`: Phase has not started yet and requirements are < 80% complete.
  * `AHEAD`: Phase has not started yet and at least 80% of its requirements are already completed early.
  * `CURRENT`: Today's date is inside the phase date range.
  * `ON TRACK`: Phase is active and progress is reasonably aligned with elapsed time.
  * `BEHIND`: Phase end date has passed and requirements remain incomplete.
  * `COMPLETED`: All skills and projects in the phase are complete.

### 3. Project Proof System & Engineering Proof Score
Each project has a dedicated Proof system:
* **Lifecycle**: `LOCKED` → `READY` → `IN_PROGRESS` → `COMPLETED`
* **Proof Items Tracked**:
  * Public GitHub repository URL (+15 pts)
  * Live public deployment URL (+45 pts)
  * Deterministic automated tests (+20 pts)
  * Automated evaluation suite (+30 pts)
  * Architecture documentation & diagrams (+15 pts)
  * Comprehensive documentation (+10 pts)
  * Validated by real users (+35 pts)
  * Open source contribution (+30 pts)
  * Capstone bonus (+100 pts)
* **Engineering Proof Score**: A completely separate score from roadmap % and XP. It measures tangible proof of building things.

### 4. XP and Leveling System
* **Skill XP**: Beginner (10), Intermediate (20), Advanced (35), Expert (50).
* **Project Base XP**: Mini (50), Intermediate (100), Advanced (200), Capstone (500).
* **Permanent Project Bonuses**: Deployment (+50), Automated Tests (+25), Evaluation Suite (+50), Documentation (+25), Real Users (+100), Open Source (+100).
* **Historical Non-Reversible Milestones**:
  * 25% Roadmap (+100 XP)
  * 50% Roadmap (+200 XP)
  * 75% Roadmap (+300 XP)
  * 100% Roadmap (+500 XP)
  * First Project Shipped (+100 XP)
  * First Live Deployment (+150 XP)
  * First Evaluation Suite (+150 XP)
  * First Advanced Project (+200 XP)
  * Capstone Platform (+500 XP)
  * *Rule: Once awarded, milestone XP is permanent and cannot be reversed by unchecking skills later.*
* **Level Formula**: `Level = Math.floor(totalXP / 500) + 1`. Every 500 XP earns 1 Level.

### 5. Daily Missions & Deterministic Recommendation Engine
* **Today's Mission**: Evaluates unfinished skills in your current active phase and projects needing tests or deployment. Displays estimated time and a 1-click action.
* **Next Recommended Action**: Analyzes prerequisite trees and project unlock dependencies, displaying an explicit explanation:
  > *"Recommended because it is part of your current Foundation & Core Engineering phase and is required by 3 portfolio projects."*

### 6. Zero-Tutorial Engineering Challenges
* 14+ hands-on challenges across Beginner, Intermediate, Advanced, and Expert difficulties.
* Explicit constraints: zero tutorial code, independent verification, and optional postmortem reflection notes.

### 7. Consistency Streak & Event History
* Any day with a completed skill, project transition, proof update, or challenge completion marks that day active.
* Features a 63-day heatmap calendar, current streak, best streak, and a filterable chronological audit log.

### 8. Data Persistence, Backups & Migrations
* Stored in `localStorage` under `ai_engineer_os_state_v1`.
* **Export Progress JSON**: One-click download of your entire state.
* **Import Backup JSON**: Validates JSON schema before applying to avoid data corruption.
* **Danger Zone**: Factory reset with double confirmation modal.

---

## 5. How to Customize the Curriculum

To customize or extend your learning system, edit these specific files:

| Customization | File to Edit |
|---|---|
| **Add or edit skills** | [skillsPart1.ts](file:///c:/Dev_Projects/grind/src/data/roadmap/skillsPart1.ts), [skillsPart2.ts](file:///c:/Dev_Projects/grind/src/data/roadmap/skillsPart2.ts), [skillsPart3.ts](file:///c:/Dev_Projects/grind/src/data/roadmap/skillsPart3.ts) |
| **Add or edit tracks** | [tracks.ts](file:///c:/Dev_Projects/grind/src/data/roadmap/tracks.ts) |
| **Add or edit projects** | [projects.ts](file:///c:/Dev_Projects/grind/src/data/projects.ts) |
| **Edit timeline phases & checkpoints** | [timeline.ts](file:///c:/Dev_Projects/grind/src/data/timeline.ts) |
| **Add or edit challenges** | [challenges.ts](file:///c:/Dev_Projects/grind/src/data/challenges.ts) |
| **Edit readiness checklist** | [portfolioChecklist.ts](file:///c:/Dev_Projects/grind/src/data/portfolioChecklist.ts) |
| **Tune XP awards or levels** | [xp.ts](file:///c:/Dev_Projects/grind/src/utils/xp.ts) |
| **Tune Proof Score weights** | [proofScore.ts](file:///c:/Dev_Projects/grind/src/utils/proofScore.ts) |

---

## 6. Verification & Automated Testing

Run the automated verification suite anytime:
```bash
npx tsx test-verification.ts
```

This verifies 34 critical test scenarios covering skill toggles, XP arithmetic, non-reversible milestones, project proof calculations, date math, and recommendation priority engines.
