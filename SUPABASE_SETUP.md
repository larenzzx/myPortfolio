# 🛠️ Supabase Backend & Admin Panel Setup Guide

This guide details the step-by-step instructions for setting up your Supabase database, enabling Row-Level Security (RLS) policies, creating your administrator user, and configuring environment variables.

---

## 📋 Table of Contents
1. [Database Schema Setup (SQL Editor)](#1-database-schema-setup-sql-editor)
2. [Seed Existing Portfolio Data](#2-seed-existing-portfolio-data)
3. [Setup Admin Authentication](#3-setup-admin-authentication)
4. [Local Environment Configuration (.env)](#4-local-environment-configuration-env)
5. [Production Deployment (Netlify/Vercel)](#5-production-deployment-netlifyvercel)
6. [Recycle Bin & Undo Features Guide](#6-recycle-bin--undo-features-guide)

---

## 1. Database Schema Setup (SQL Editor)

Follow these steps to create your database tables and set up access permissions:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and navigate to your project.
2. Select **SQL Editor** from the left navigation panel.
3. Click **New Query** to open a blank editor.
4. Copy and paste the query below, then click **Run** (or press `Ctrl + Enter` / `Cmd + Enter`):

```sql
-- ========================================================
-- 🛠️ SCHEMA SETUP SQL
-- ========================================================

-- 1. Create Projects Table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  project_title text not null,
  category text not null,
  year text not null,
  link text,
  live_link text,
  live_view boolean default false,
  is_experience boolean default true,
  featured boolean default false,
  case_study_problem text,
  case_study_outcome text,
  image_url text,
  stack text[] not null,
  is_deleted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Projects
alter table public.projects enable row level security;

-- 2. Create Skills Table
create table if not exists public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  category text not null, -- 'frontend', 'backend', 'cyber', 'it'
  logo_url text,
  type text default 'img'::text not null, -- 'img' or 'lucide'
  is_deleted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Skills
alter table public.skills enable row level security;

-- 3. Create Certificates Table
create table if not exists public.certificates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  issuer text not null,
  year text not null,
  category text not null, -- 'web-dev', 'cybersecurity', 'it-admin', 'ai', 'general'
  image_url text not null,
  is_pdf boolean default false,
  is_deleted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Certificates
alter table public.certificates enable row level security;

-- 4. Create Experiences Table
create table if not exists public.experiences (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text not null,
  company text not null,
  location text not null,
  period text not null,
  current boolean default false,
  accent text default 'primary'::text not null, -- 'primary', 'secondary', 'accent'
  icon_name text default 'Briefcase'::text not null,
  bullets text[] not null,
  tags text[] not null,
  is_deleted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Experiences
alter table public.experiences enable row level security;

-- ========================================================
-- 🔒 ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Read-access is open to anyone (public)
create policy "Allow public read access on projects" on public.projects for select using (true);
create policy "Allow public read access on skills" on public.skills for select using (true);
create policy "Allow public read access on certificates" on public.certificates for select using (true);
create policy "Allow public read access on experiences" on public.experiences for select using (true);

-- Write-access (Insert, Update, Delete) is restricted to authenticated users only (you, after logging in)
create policy "Allow admin write access on projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow admin write access on skills" on public.skills for all using (auth.role() = 'authenticated');
create policy "Allow admin write access on certificates" on public.certificates for all using (auth.role() = 'authenticated');
create policy "Allow admin write access on experiences" on public.experiences for all using (auth.role() = 'authenticated');
```

---

## 2. Seed Existing Portfolio Data

Once your schema tables are active, load your existing career data into Supabase:

1. Open another **New Query** tab in your Supabase SQL editor.
2. Copy, paste, and run the following query:

```sql
-- ========================================================
-- 🌱 SEED EXISTING PORTFOLIO DATA
-- ========================================================

-- INSERT INITIAL PROJECTS
INSERT INTO public.projects (slug, project_title, category, year, link, live_link, live_view, is_experience, featured, case_study_problem, case_study_outcome, image_url, stack) 
VALUES 
('cyberguide-ai', 'CyberGuide AI', 'Personal', '2026', 'https://github.com/larenzzx/cyberguideai.git', 'https://larenzzx.pythonanywhere.com/', true, true, true, 'SOC analysts, helpdesk users, IT administrators, and cybersecurity learners need a focused workspace for operational guidance and investigation workflows.', 'Built a Django assistant that combines AI guidance with threat intelligence lookup, IOC extraction, phishing email analysis, user access management, and admin approval workflows.', 'cyberguide-ai', ARRAY['Django', 'PostgreSQL', 'Tailwind CSS', 'DaisyUI']),
('devfocus', 'DevFocus', 'Personal', '2026', 'https://github.com/larenzzx/DevFocus.git', 'https://devfocus-sigma.vercel.app/', true, true, false, 'Developers need a unified, distraction-free environment to track sprints, focus using Pomodoro timers, and block out noise without shifting tabs.', 'Created a premium Glassmorphism bento-style dashboard combining Pomodoro timers, ambient soundscapes, sprint task lists, and visual focus metrics.', 'devfocus', ARRAY['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui']),
('gitcraft', 'GitCraft', 'Personal', '2026', 'https://github.com/larenzzx/GitCraft.git', 'https://git-craft.vercel.app/', true, true, false, 'Version control can be intimidating for beginners, and command-line mistakes can feel costly.', 'Built an interactive Git & GitHub sandbox simulator combining a local visual workspace, live commit trees, an in-browser CLI terminal, and structured training academies.', 'gitcraft', ARRAY['React', 'Vite', 'Tailwind CSS']),
('client-portfolio-erich', 'Client Portfolio', 'Freelance', '2026', 'https://github.com/erich411/Portfolio', 'https://portfolio-iota-sand-35.vercel.app/', true, true, false, NULL, NULL, 'client-portfolio-erich', ARRAY['React', 'Vite', 'Tailwind CSS']),
('supply-office-inventory', 'WMSU Supply Office Inventory System', 'Freelance', '2026', 'https://github.com/larenzzx/wmsu-supply-office-inventory.git', 'https://wmsu-supplyoffice.infinityfreeapp.com/', true, true, false, NULL, NULL, 'supply-office-inventory', ARRAY['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL']),
('client-portfolio-janrey', 'Client Portfolio', 'Freelance', '2025', 'https://github.com/przvlll/myportfolio', 'https://przvlllportfolio.netlify.app/', true, true, false, NULL, NULL, 'client-portfolio-janrey', ARRAY['React', 'Vite', 'Tailwind CSS']),
('client-portfolio-jhon', 'Client Portfolio', 'Freelance', '2025', 'https://github.com/dinojondino12/jondinoportfolio', 'https://jondinorodrigo.netlify.app/', true, true, false, NULL, NULL, 'client-portfolio-jhon', ARRAY['React', 'Vite', 'Tailwind CSS']),
('pokedex-freelance', 'Pokedex', 'Freelance', '2025', 'https://github.com/ziaramelon/minipokedex', NULL, false, true, false, NULL, NULL, 'pokedex-freelance', ARRAY['React', 'Vite', 'Tailwind CSS', 'DaisyUI']),
('task-manager', 'Task Manager', 'Freelance', '2025', 'https://github.com/ziaramelon/myReactTodolist', 'https://reacttodolistproj.netlify.app/', true, true, false, NULL, NULL, 'task-manager', ARRAY['React', 'Vite', 'Tailwind CSS']),
('weather-app', 'Weather App', 'Personal', '2025', 'https://github.com/larenzzx/jsWeatherApp', 'https://larenzzsimpleweatherapp.netlify.app/', true, true, false, NULL, NULL, 'weather-app', ARRAY['HTML5', 'CSS3', 'JavaScript']),
('sunny-landing-page', 'Sunny Landing Page', 'Personal', '2024', 'https://github.com/larenzzx/sunnyside', 'https://larenzzx.github.io/sunnyside/', true, true, false, NULL, NULL, 'sunny-landing-page', ARRAY['HTML5', 'CSS3', 'JavaScript']),
('one-zamboanga', 'One Zamboanga: Evacuation Center Management System', 'Capstone', '2025', 'https://github.com/larenzzx/oneZamboanga_capstone', NULL, false, false, false, 'Evacuation center management needs organized digital workflows for records, coordination, and access to information.', 'Built as a capstone full-stack system focused on evacuation center management workflows.', 'one-zamboanga', ARRAY['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL']),
('pokedex-battle-simulation', 'PokeHub', 'IT142', '2025', 'https://github.com/larenzzx/reactPokedex.git', 'https://poke-hub-six.vercel.app/', true, false, false, 'A learning-driven React project needed structured Pokemon data presentation with an interactive battle simulation.', 'Created an individual project combining a Pokedex interface with battle simulation behavior.', 'pokedex-battle-simulation', ARRAY['React', 'Vite', 'Tailwind CSS', 'DaisyUI']),
('react-todo-list', 'Todo-list App using ReactJS', 'IT142', '2025', 'https://github.com/larenzzx/react-Todolist.git', 'https://larenzzx-react-todolist.netlify.app/', true, false, false, NULL, NULL, 'react-todo-list', ARRAY['React', 'Vite', 'Tailwind CSS', 'DaisyUI']),
('portfolio-website', 'Portfolio Website', 'IT Elective 4', '2025', 'https://github.com/larenzzx/tabotabo_portfolioWebsite', 'https://larenzzx.github.io/tabotabo_portfolioWebsite/', true, false, false, NULL, NULL, 'portfolio-website', ARRAY['HTML5', 'CSS3', 'JavaScript']),
('wesmaardec-event-management', 'WESMAARDEC Event Management', 'Software Eng.', '2024', 'https://github.com/larenzzx/WESMAARDEC-Event-Management-System', NULL, false, false, false, 'Event management work benefits from a system that can organize event-related data and workflows.', 'Built as a Software Engineering full-stack project for WESMAARDEC event management.', 'wesmaardec-event-management', ARRAY['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL']),
('ecovariety', 'ECOVARIETY E-commerce Plant Store', 'IT Elective 2', '2024', 'https://github.com/larenzzx/Ecovariety', NULL, false, false, false, NULL, NULL, 'ecovariety', ARRAY['HTML5', 'CSS3', 'JavaScript']),
('crimsonquest', 'CrimsonQuest: Campus Directory', 'Database Project', '2023', 'https://github.com/larenzzx/CrimsonQuest', NULL, false, false, false, NULL, NULL, 'crimsonquest', ARRAY['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'])
ON CONFLICT (slug) DO NOTHING;

-- INSERT INITIAL SKILLS
INSERT INTO public.skills (name, category, logo_url, type)
VALUES 
('HTML5', 'frontend', 'html', 'img'),
('CSS3', 'frontend', 'css', 'img'),
('JavaScript', 'frontend', 'js', 'img'),
('TypeScript', 'frontend', 'typescript', 'img'),
('Tailwind CSS', 'frontend', 'tailwind', 'img'),
('React', 'frontend', 'react', 'img'),
('Vite', 'frontend', 'vite', 'img'),
('DaisyUI', 'frontend', 'daisy', 'img'),
('shadcn/ui', 'frontend', 'shadcn', 'img'),
('HeadlessUI', 'frontend', 'headless', 'img'),
('ChartJS', 'frontend', 'chart', 'img'),
('SweetAlert2', 'frontend', 'sweet', 'img'),
('SwiperJS', 'frontend', 'swipe', 'img'),
('DataTablesJS', 'frontend', 'datatables', 'img'),
('Git', 'frontend', 'git', 'img'),
('GitHub', 'frontend', 'github', 'img'),
('Python', 'backend', 'python', 'img'),
('Django', 'backend', '"https://svgl.app/library/django.svg"', 'img'),
('PHP', 'backend', 'php', 'img'),
('MySQL', 'backend', 'mysql', 'img'),
('PostgreSQL', 'backend', 'postgresql', 'img'),
('Security Ops', 'cyber', 'Shield', 'lucide'),
('Alert Triage', 'cyber', 'ShieldAlert', 'lucide'),
('Incident Response', 'cyber', 'Activity', 'lucide'),
('Wazuh', 'cyber', 'Eye', 'lucide'),
('MS Defender', 'cyber', 'Shield', 'lucide'),
('OSINT Tools', 'cyber', 'Search', 'lucide'),
('Qualys VMDR', 'cyber', 'Bug', 'lucide'),
('Threat Analysis', 'cyber', 'AlertTriangle', 'lucide'),
('Linux', 'it', 'linux', 'img'),
('Hermes Agent', 'it', 'hermes', 'img'),
('OpenClaw', 'it', 'openclaw', 'img'),
('Entra ID', 'it', 'Users', 'lucide'),
('Intune', 'it', 'Smartphone', 'lucide'),
('Exchange', 'it', 'Mail', 'lucide'),
('SharePoint', 'it', 'FileText', 'lucide'),
('Datto RMM', 'it', 'Server', 'lucide'),
('OS Config', 'it', 'Monitor', 'lucide'),
('Hardware Maint.', 'it', 'Cpu', 'lucide'),
('LAN / Network', 'it', 'Wifi', 'lucide'),
('VM Setup', 'it', 'Box', 'lucide')
ON CONFLICT (name) DO NOTHING;

-- INSERT INITIAL CERTIFICATES
INSERT INTO public.certificates (title, issuer, year, category, image_url, is_pdf)
VALUES 
('HTML Fundamentals', 'Simplilearn', '2024', 'web-dev', 'htmlCert', false),
('Introduction to Front End Development', 'Simplilearn', '2024', 'web-dev', 'frontCert', false),
('JavaScript for Beginners', 'Simplilearn', '2024', 'web-dev', 'jsCert', false),
('ReactJS for Beginners', 'Simplilearn', '2024', 'web-dev', 'reactCert', false),
('Responsive Web Design', 'freeCodeCamp', '2024', 'web-dev', 'webCert', false),
('JavaScript Algorithms and Data Structures', 'freeCodeCamp', '2024', 'web-dev', 'dataStruc', false),
('CC: Security Principles (Domain 1)', 'ISC2', '2025', 'cybersecurity', 'domain1', true),
('CC: Incident Response, BC & DR (Domain 2)', 'ISC2', '2025', 'cybersecurity', 'domain2', true),
('CC: Access Control Concepts (Domain 3)', 'ISC2', '2025', 'cybersecurity', 'domain3', true),
('CC: Network Security (Domain 4)', 'ISC2', '2025', 'cybersecurity', 'domain4', true),
('CC: Security Operations (Domain 5)', 'ISC2', '2025', 'cybersecurity', 'domain5', true),
('CC: Certified in Cybersecurity - Final Assessment', 'ISC2', '2025', 'cybersecurity', 'ccFinal', true),
('Fortinet Certified Fundamentals in Cybersecurity', 'Fortinet', '2025', 'cybersecurity', 'fortinet', true),
('Cybersecurity Course Completion', 'Fortinet', '2025', 'cybersecurity', 'cyberCourseCompletion', true),
('KnowBe4 Security Awareness', 'KnowBe4', '2026', 'cybersecurity', 'courseCompletion', true),
('Threat Intelligence Completion', 'Fortinet', '2025', 'cybersecurity', 'threatCompletion', true),
('Vulnerability Management', 'Qualys', '2025', 'cybersecurity', 'vulnMgmt', true),
('Datacom Cybersecurity Job Simulation', 'Forage', '2025', 'cybersecurity', 'datacom', true),
('Mastercard Cybersecurity Job Simulation', 'Forage', '2025', 'cybersecurity', 'mastercard', true),
('Introduction to Security, Compliance, and Identity', 'Microsoft', '2025', 'cybersecurity', 'msLearn2', false),
('Introduction to Microsoft Security Solutions', 'Microsoft', '2025', 'cybersecurity', 'msLearn4', false),
('MS-900: Microsoft 365 Security and Compliance Capabilities', 'Microsoft', '2025', 'cybersecurity', 'msLearn5', false),
('Introduction to Microsoft Priva and Purview', 'Microsoft', '2025', 'cybersecurity', 'msLearn6', false),
('Protect Identity and Access in Azure', 'Microsoft', '2025', 'cybersecurity', 'msLearn7', false),
('Describe Azure Management and Governance', 'Microsoft', '2025', 'it-admin', 'msLearn1', false),
('Introduction to Microsoft Entra', 'Microsoft', '2025', 'it-admin', 'msLearn3', false),
('MD-102: Explore Endpoint Management', 'Microsoft', '2025', 'it-admin', 'msLearn8', false),
('Describe Cloud Concepts', 'Microsoft', '2025', 'it-admin', 'msLearn9', false),
('Describe Azure Architecture and Services', 'Microsoft', '2025', 'it-admin', 'msLearn10', false),
('MD-102: Execute Device Enrollment', 'Microsoft', '2025', 'it-admin', 'msLearn11', false),
('Computer Systems Servicing', 'TESDA', '2023', 'it-admin', 'tesda', false),
('Google I/O Extended', 'Google', '2025', 'ai', 'googleio', false),
('Claude Code in Action', 'Anthropic', '2026', 'ai', 'claudeCode', true),
('Claude 101', 'Anthropic', '2026', 'ai', 'claude101', true),
('AI Fluency: Framework & Foundations', 'Anthropic', '2026', 'ai', 'aifluency', true);

-- INSERT INITIAL CAREER EXPERIENCES
INSERT INTO public.experiences (title, subtitle, company, location, period, current, accent, icon_name, bullets, tags)
VALUES 
('Cybersecurity Analyst', 'SOC Analyst L1', 'Aetas Security', 'On-site', 'Nov 2025 - Present', true, 'primary', 'Shield', ARRAY['Monitor and triage security alerts across client environments', 'Perform incident response and escalate threats as needed', 'Work with Wazuh, Microsoft Defender for Endpoint, Qualys VMDR, and OSINT tools', 'Support enterprise IT: user provisioning, Intune device management, VM setup via Entra ID, Exchange, SharePoint, and Datto RMM'], ARRAY['Wazuh', 'MS Defender', 'Qualys VMDR', 'Incident Response', 'Entra ID']),
('Freelance Web Developer', 'Full-stack, frontend, maintenance, and deployment', 'Independent', 'Remote', '2024 - Present', true, 'secondary', 'Code2', ARRAY['Build full-stack web applications, frontend apps, portfolios, dashboards, and landing pages for client commissions', 'Improve existing projects by fixing bugs, resolving errors, refining UI, and adding requested features', 'Develop responsive interfaces using React, Tailwind CSS, JavaScript, PHP, and database-backed workflows when needed', 'Prepare projects for production by testing, configuring hosting, and deploying sites online'], ARRAY['React', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL', 'Python', 'Django', 'Deployment']),
('IT Technician', 'Hardware & Systems', 'Prior Experience', 'On-site', 'Prior', false, 'accent', 'Monitor', ARRAY['Installed and configured operating systems, software, and games', 'Performed reprogramming, bug fixes, and hardware maintenance for PCs/Laptops', 'Set up and managed LAN environments'], ARRAY['OS Installation', 'Hardware', 'LAN Setup', 'Networking']);
```

---

## 3. Setup Admin Authentication

To write new entries or modify data in the dashboard, you must register your admin user inside Supabase Auth:

1. Open your **Supabase Dashboard** and click on the **Authentication** tab (User icon in the left-hand menu).
2. Go to **Users** and click **Add User** -> **Create User**.
3. Input your email address and preferred secure password.
4. **IMPORTANT**: Toggle **Auto-confirm User** to **ON** (so you don't have to check email logs or confirm links), and click **Create User**.

---

## 4. Local Environment Configuration (.env)

Vite reads environmental files starting with `VITE_`.

1. Check your project root for a `.env` file (create one if it is missing).
2. Insert your project URL and anonymous API key:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anonymous-key-here
   ```
   *(You can find these keys in Supabase under **Project Settings > API**)*.

---

## 5. Production Deployment (Netlify/Vercel)

If your portfolio is hosted on **Netlify** or **Vercel**, you must configure the environment variables on their platform settings:

* **Netlify**: Go to **Site settings > Environment variables** and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
* **Vercel**: Go to **Project Settings > Environment Variables** and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## 6. Recycle Bin & Undo Features Guide

### 🗑️ How Soft-Delete Works
* Inside your admin panel (`/admin`), clicking the **Delete** button next to any item will trigger a **Soft Delete**.
* This sets `is_deleted = true` in your Supabase table.
* The deleted project, skill, certificate, or experience disappears from the public portfolio pages instantly.

### 🔄 Viewing Trash & Undoing Deletions (Restore)
1. Navigate to `/admin` and log in.
2. Click the **Recycle Bin** toggle button at the top right of the dashboard table.
3. The table header will turn yellow, and you will see all deleted items for the active category tab.
4. Click the green **Restore** (circular arrow icon) button.
5. This updates `is_deleted = false` in the database, returning the item to your active portfolio pages instantly.

### ❌ Permanent Purge
* To permanently remove an item, toggle to the **Recycle Bin** view and click the red trash icon. This will hard-delete the row permanently.
