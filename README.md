# 🚀 Mark Larenz Tabotabo - Developer Portfolio & Admin Portal

This repository contains the official portfolio website and dynamic content management system (CMS) for **Mark Larenz Tabotabo**, a **Freelance Web & AI Automation Developer** and **SOC Analyst L1**.

This document serves as the **authoritative reference manual** for developers and AI coding assistants scanning this repository.

---

## 📌 Executive Summary

* **Owner**: Mark Larenz Tabotabo (Preferred: Mark Tabotabo)
* **Roles**: Freelance Web & AI Automation Developer | SOC Analyst L1 (Aetas Security)
* **Education**: Bachelor of Science in Information Technology (BSIT), Western Mindanao State University (WMSU), Graduated 2025
* **Location**: Zamboanga City, Philippines (Remote-ready)
* **Primary Contact**: `marklarenztabotabo@gmail.com`
* **GitHub**: [larenzzx](https://github.com/larenzzx)
* **Application Type**: Single Page Application (SPA) with routing, dynamic Supabase database integration, serverless AI chatbot, and full-featured Admin Portal (`/admin`).

---

## 🛠️ Technology Stack & Dependencies

### Core Frameworks & Build Tools
* **Core Framework**: React 18 (`react`, `react-dom`)
* **Language**: TypeScript (`typescript`)
* **Routing**: React Router DOM v7 (`react-router-dom`)
* **Build System**: Vite 6 (`vite`, `@vitejs/plugin-react`)

### Styling & UI Design System
* **CSS Framework**: Tailwind CSS 3 (`tailwindcss`, `postcss`, `autoprefixer`)
* **UI Components Library**: DaisyUI 4 (`daisyui`), Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-slot`), `shadcn/ui` patterns
* **Animation Plugins**: `tailwindcss-motion`, `tailwindcss-intersect`
* **Style Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority` (cva)
* **Icon Sets**: Lucide React (`lucide-react`), FontAwesome SVG Icons (`@fortawesome/react-fontawesome`)

### Backend, Database & Serverless Architecture
* **Database & BaaS**: Supabase (`@supabase/supabase-js`)
  * PostgreSQL database with Row Level Security (RLS)
  * Real-time dynamic CRUD
  * Supabase Auth for admin authentication
* **Serverless Functions**: Netlify Functions (`netlify/functions/chat.js`)
* **AI Model Engine**: Groq API (`llama-3.1-8b-instant`) powering the AI Assistant
* **Email Service**: EmailJS (`@emailjs/browser`) for direct contact form delivery
* **Alerts & Modals**: SweetAlert2 (`sweetalert2`) with dark theme customization

---

## 📁 Directory & Project Structure

```
myPortfolio/
├── .env                       # Environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
├── .env.example               # Example environment variables template
├── netlify.toml               # Netlify hosting & edge functions configuration
├── vercel.json                # Vercel deployment rewrite rules
├── SUPABASE_SETUP.md          # Complete SQL schema, RLS policies, seed data & Recycle Bin guide
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind colors, custom utilities, and animations
├── index.html                 # HTML entry point with meta tags & Google Fonts
├── netlify/
│   └── functions/
│       └── chat.js            # Serverless endpoint for AI Chatbot (Groq API integration)
└── src/
    ├── main.tsx               # App entry point, localStorage theme setup, BrowserRouter
    ├── App.tsx                # Main router with ObserverProvider & DashboardLayout
    ├── index.css              # Global CSS, Tailwind directives, dark theme tokens
    ├── lib/
    │   ├── supabaseClient.ts  # Supabase client instantiation
    │   └── utils.ts           # Class merging helper (cn function)
    ├── data/
    │   └── profileKnowledge.ts# Knowledge base object for AI assistant & local fallbacks
    ├── assets/                # SVG/PNG logos, certificate PDFs/images, project thumbnails
    └── components/
        ├── Home.tsx           # Main homepage (Hero, Conway Game of Life grid, Overview cards, Featured project)
        ├── SectionTitle.tsx   # Standard section heading component
        ├── ObserverProvider.tsx # IntersectionObserver wrapper for scroll animations
        ├── about/
        │   └── About.tsx      # Biography, education, career overview, social cards
        ├── admin/
        │   └── AdminPage.tsx  # Dynamic CMS panel for managing Projects, Skills, Certificates, Experiences
        ├── certificatess/
        │   ├── CertificateCard.tsx # Individual certificate component (supports PDFs & images)
        │   └── Certificates.tsx    # Categorized certificates view & filter tabs
        ├── chatbot/
        │   └── Chatbot.tsx    # Interactive AI Assistant modal with serverless & offline fallbacks
        ├── contact/
        │   ├── Contact.tsx    # Direct contact form using EmailJS
        │   └── ContactCTA.tsx # Call to action component
        ├── dashboard/
        │   ├── DashboardLayout.tsx # Main app shell wrapper
        │   ├── Sidebar.tsx     # Desktop navigation sidebar
        │   ├── MobileNav.tsx   # Mobile bottom/top navigation bar
        │   ├── CommandMenu.tsx # Ctrl+K / Cmd+K quick command palette
        │   └── navItems.ts     # Navigation items registry
        ├── exp/
        │   └── Experience.tsx  # Timeline component for SOC, Freelance, and IT Technician history
        ├── hero/
        │   └── TypingAnimation.tsx # Hero section animated text
        ├── pages/
        │   ├── SectionPages.tsx # Individual route views (/about, /skills, /projects, etc.)
        │   └── ResumePage.tsx   # Dedicated resume viewer & download page
        ├── projectSection/
        │   ├── Projects.tsx     # Projects tab filter (Freelance & Personal vs Academic)
        │   ├── ProjectCard.tsx  # Interactive card with stack badges & links
        │   ├── ProjectDetail.tsx# Case study & detailed project view (/projects/:slug)
        │   ├── LiveView.tsx     # Live project iframe/preview modal
        │   └── projectData.ts   # Local project data registry & Supabase sync fetcher
        ├── skills/
        │   ├── Skills.tsx       # Categorized skill badges (Frontend, Backend, Cyber, IT)
        │   ├── Skill-logo.tsx   # Resolves local SVG images or Lucide icons dynamically
        │   └── Skill-info.tsx   # Skill section subtitle header
        └── ui/
            ├── button.tsx       # CVA-styled Radix button component
            └── dialog.tsx       # Radix UI dialog primitive component
```

---

## ⚡ Core Features & Functional Modules

### 1. 🌐 Public Portfolio Pages & Navigation
* **Homepage (`/`)**: Hero banner with typing animation, cellular automata (Game of Life) canvas, overview metric cards, featured project highlight, and quick workspace links.
* **About (`/about`)**: Background info, BSIT degree details at WMSU, SOC Analyst role overview, and social media handles.
* **Experience (`/experience`)**: Timeline showing current SOC Analyst L1 role at Aetas Security, Freelance Web Developer work, and prior IT Technician experience.
* **Skills (`/skills`)**: Categorized grid (Frontend, Backend, Cybersecurity, IT & Systems) supporting both image SVG logos and dynamic Lucide icons.
* **Projects (`/projects` & `/projects/:slug`)**: Filterable project gallery split into *Personal & Freelance* and *Academic*. Features in-depth case study modals (Problem & Outcome) and live preview embeds (`LiveView`).
* **Certificates (`/certificates`)**: Displays earned certificates across Web Dev, Cybersecurity (ISC2 CC, Fortinet, Qualys, Forage), IT Admin (Microsoft Learn, TESDA), and AI (Anthropic, Google I/O). Includes modal preview for both high-res images and PDF files.
* **Resume Page (`/resume`)**: Integrated resume viewer with direct PDF download.
* **Contact (`/contact`)**: Functional contact form integrated with EmailJS.

### 2. 🤖 AI Portfolio Assistant (`Chatbot.tsx`)
* Floating chatbot modal accessible across all pages.
* Queries sent to `/.netlify/functions/chat` powered by Groq's `llama-3.1-8b-instant` model.
* Configured with strict system prompts using `profileKnowledge.ts` to accurately answer questions about Mark's education, skills, work experience, projects, and contact info.
* **Offline Fallback Engine**: If the Netlify function is unavailable or unconfigured, the chatbot automatically falls back to an offline rule-based responder to ensure 100% uptime.

### 3. ⌨️ Command Palette (`CommandMenu.tsx`)
* Activated via `Ctrl+K` or `Cmd+K`.
* Provides keyboard navigation across all sections, project details, direct links, and theme settings.

### 4. 🔐 Admin Portal & Dynamic CMS (`/admin`)
The portfolio contains a full-fledged Admin Panel located at `/admin`:
* **Authentication**: Protected via Supabase Auth (`supabase.auth.signInWithPassword`). Only authenticated administrators can modify content.
* **Tabbed Management**: Dedicated management tabs for **Projects**, **Skills**, **Certificates**, and **Experiences**.
* **Full CRUD Operations**: Create new entries, edit existing details, update technology stacks, links, case studies, and image/PDF URLs.
* **Soft Delete & Recycle Bin**:
  * Deleting an item marks `is_deleted = true` in Supabase.
  * Deleted items instantly disappear from the public portfolio without losing database history.
  * The Admin Panel features a **Recycle Bin Toggle** allowing admins to view deleted items, restore them (`is_deleted = false`), or permanently purge (hard delete) them.
* **Storage Uploads**: Supports uploading custom assets directly into Supabase Storage buckets.

---

## 🗄️ Database Schema & Hybrid Data Flow

The project uses a **Hybrid Data Architecture**:
1. Default fallback data is stored locally in static data registries (`projectData.ts`, `STATIC_CATEGORIES`, `STATIC_CERTIFICATES`, `STATIC_EXPERIENCES`).
2. On load, components query Supabase to merge changes, append newly created items, and filter out items marked `is_deleted = true`.

### Table Schemas (Supabase SQL)

#### `projects`
| Column | Type | Default / Description |
| :--- | :--- | :--- |
| `id` | `uuid` | `gen_random_uuid()` Primary Key |
| `slug` | `text` | Unique project identifier |
| `project_title` | `text` | Display title of the project |
| `category` | `text` | `Personal`, `Freelance`, `Capstone`, `IT142`, etc. |
| `year` | `text` | Creation year (e.g., `'2026'`) |
| `link` | `text` | Source code URL (GitHub) |
| `live_link` | `text` | Live deployment URL |
| `live_view` | `boolean` | `false` (Whether live iframe preview is enabled) |
| `is_experience` | `boolean` | `true` for Freelance/Personal, `false` for Academic |
| `featured` | `boolean` | `false` |
| `case_study_problem`| `text` | Case study problem description |
| `case_study_outcome`| `text` | Case study outcome description |
| `image_url` | `text` | Image asset key or full URL |
| `stack` | `text[]` | Array of technology names |
| `is_deleted` | `boolean` | `false` (Soft-delete flag) |
| `created_at` | `timestamptz` | `now()` |

#### `skills`
| Column | Type | Default / Description |
| :--- | :--- | :--- |
| `id` | `uuid` | `gen_random_uuid()` Primary Key |
| `name` | `text` | Unique skill name |
| `category` | `text` | `frontend`, `backend`, `cyber`, `it` |
| `logo_url` | `text` | Local asset key, SVG URL, or Lucide icon name |
| `type` | `text` | `'img'` or `'lucide'` |
| `is_deleted` | `boolean` | `false` (Soft-delete flag) |
| `created_at` | `timestamptz` | `now()` |

#### `certificates`
| Column | Type | Default / Description |
| :--- | :--- | :--- |
| `id` | `uuid` | `gen_random_uuid()` Primary Key |
| `title` | `text` | Title of the certificate |
| `issuer` | `text` | Organization (Simplilearn, ISC2, Fortinet, Qualys, etc.) |
| `year` | `text` | Year issued |
| `category` | `text` | `web-dev`, `cybersecurity`, `it-admin`, `ai`, `general` |
| `image_url` | `text` | Image asset key, PDF asset key, or URL |
| `is_pdf` | `boolean` | `false` |
| `is_deleted` | `boolean` | `false` (Soft-delete flag) |
| `created_at` | `timestamptz` | `now()` |

#### `experiences`
| Column | Type | Default / Description |
| :--- | :--- | :--- |
| `id` | `uuid` | `gen_random_uuid()` Primary Key |
| `title` | `text` | Position title (e.g., Cybersecurity Analyst) |
| `subtitle` | `text` | Role description (e.g., SOC Analyst L1) |
| `company` | `text` | Company / Organization name |
| `location` | `text` | `On-site`, `Remote`, etc. |
| `period` | `text` | Work timeframe (e.g., `Nov 2025 - Present`) |
| `current` | `boolean` | `false` |
| `accent` | `text` | `'primary'`, `'secondary'`, `'accent'` |
| `icon_name` | `text` | Lucide icon identifier (e.g., `'Shield'`) |
| `bullets` | `text[]` | Array of key achievement bullet points |
| `tags` | `text[]` | Array of technology/skill badges |
| `is_deleted` | `boolean` | `false` (Soft-delete flag) |
| `created_at` | `timestamptz` | `now()` |

---

## 🗝️ Environment Variables Configuration

Create a `.env` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional Serverless Chatbot Configuration (Netlify Environment Variables)
GROQ_API_KEY=gsk_your_groq_api_key
```

---

## 💻 Local Development & Build Scripts

In the project root, run:

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Lint code for errors
npm run lint

# Build production bundle
npm run build

# Preview built production site locally
npm run preview
```

---

## 🤖 Context Instructions for AI Coding Assistants

When working with or updating this codebase, AI agents should adhere to the following rules:

1. **Database Schema Compliance**: Always maintain exact column naming conventions when editing or fetching from Supabase (`is_deleted`, `case_study_problem`, `is_experience`, `live_view`, etc.).
2. **Hybrid Fallback Preservation**: Never remove static local data files (`projectData.ts`, `profileKnowledge.ts`, etc.) as they ensure the portfolio remains functional even if database API limits or network issues occur.
3. **Soft-Delete Rule**: When implementing delete operations for portfolio items, always set `is_deleted = true` instead of hard deleting, unless operating within the Recycle Bin permanent purge flow.
4. **Theme & Component Conventions**: Use the project's CSS color variables (`bg-build`, `text-build`, `bg-defend`, `text-defend`, `bg-support`, `text-support`, `text-ink`, `bg-bg`) to maintain visual consistency.
5. **Path Resolution**: Relative imports in components rely on standard React / Vite structures. Radix UI primitives use `@/components/ui/` aliasing.

