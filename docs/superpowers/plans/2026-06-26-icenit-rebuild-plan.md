# iCenit.ai Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the iCenit.ai website using Next.js (App Router), custom CSS, SQLite for local storage, and Supabase for production, providing a modern, premium landing page and a content/lead management admin panel.

**Architecture:** A unified Next.js App Router project deployed on Cloudflare Pages. Content and lead submissions are stored in SQLite locally, using Drizzle ORM to allow seamless migration to Supabase (PostgreSQL) in production.

**Tech Stack:** Next.js, React, CSS Modules, Drizzle ORM, SQLite, Supabase (Postgres & Auth), TypeScript.

---

## Proposed Changes

### Component 1: App Initialization and Basic Styles
Setup the Next.js workspace and base design tokens (colors, font import, reset).

#### [NEW] [package.json](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/package.json)
#### [NEW] [src/app/globals.css](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/globals.css)
#### [NEW] [src/app/layout.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/layout.tsx)

- [ ] **Step 1: Check create-next-app options**
  Run: `npx -y create-next-app@latest --help`
  Expected: Print list of options.

- [ ] **Step 2: Initialize Next.js in the workspace**
  Run: `npx -y create-next-app@latest ./ --typescript --eslint --src-dir --no-tailwind --app --import-alias "@/*"` (answering default options non-interactively if prompted)
  Expected: Next.js workspace successfully scaffolded.

- [ ] **Step 3: Setup globals.css with HSL design variables and reset**
  Create: [src/app/globals.css](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/globals.css)
  ```css
  :root {
    --bg-dark: #0f172a;
    --bg-card: rgba(30, 41, 59, 0.7);
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent-blue: #3b82f6;
    --accent-green: #10b981;
    --border-color: rgba(255, 255, 255, 0.1);
    --font-sans: 'Inter', sans-serif;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: var(--bg-dark);
    color: var(--text-primary);
    font-family: var(--font-sans);
    line-height: 1.5;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ```

- [ ] **Step 4: Update main layout to include font**
  Modify: [src/app/layout.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/layout.tsx) to import Inter font from google fonts and apply global classes.

- [ ] **Step 5: Run dev server to verify setup**
  Run: `npm run dev`
  Expected: Server starts on port 3000.

---

### Component 2: Database Layer Configuration (SQLite via Drizzle)
Configure Drizzle ORM with SQLite for local development.

#### [NEW] [drizzle.config.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/drizzle.config.ts)
#### [NEW] [src/db/schema.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/db/schema.ts)
#### [NEW] [src/db/client.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/db/client.ts)

- [ ] **Step 1: Install Drizzle ORM and SQLite dependencies**
  Run: `npm install drizzle-orm better-sqlite3 dotenv` and `npm install -D drizzle-kit @types/better-sqlite3`
  Expected: Dependencies installed successfully.

- [ ] **Step 2: Create DB schema**
  Create: [src/db/schema.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/db/schema.ts) defining tables: `site_settings`, `modules`, `module_features`, `use_cases`, `contact_submissions`, `demo_requests`, `job_applications`.

- [ ] **Step 3: Setup Drizzle config and DB client**
  Create: [drizzle.config.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/drizzle.config.ts) pointing to SQLite file.
  Create: [src/db/client.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/db/client.ts) exposing the database connection.

- [ ] **Step 4: Generate and run migrations**
  Run: `npx drizzle-kit generate` and `npx drizzle-kit migrate` (or write local SQLite initialization script)
  Expected: `sqlite.db` database file created with the schema tables.

---

### Component 3: Admin Dashboard Layout and Leads Panel
Build the administrative interface for managing content edits and viewing incoming form entries.

#### [NEW] [src/app/admin/layout.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/admin/layout.tsx)
#### [NEW] [src/app/admin/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/admin/page.tsx)
#### [NEW] [src/app/admin/leads/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/admin/leads/page.tsx)

- [ ] **Step 1: Create Admin layout and simple mock login gate**
  Create: [src/app/admin/layout.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/admin/layout.tsx) containing navigation for Dashboard, Modules, Use Cases, and Leads.
  Create basic cookie-based session protection.

- [ ] **Step 2: Create Dashboard page**
  Create: [src/app/admin/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/admin/page.tsx) showing metric cards (leads count).

- [ ] **Step 3: Create Leads view page**
  Create: [src/app/admin/leads/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/admin/leads/page.tsx) displaying tables of Contact Messages, Demo Requests, and Job Applications with downloads.

---

### Component 4: Public Frontend Pages Rebuild
Rebuild the main pages matching the structured text in the PDF.

#### [NEW] [src/app/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/page.tsx)
#### [NEW] [src/app/modulos/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/modulos/page.tsx)
#### [NEW] [src/app/categoria/[slug]/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/categoria/%5Bslug%5D/page.tsx)
#### [NEW] [src/app/modulos/[slug]/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/modulos/%5Bslug%5D/page.tsx)
#### [NEW] [src/app/soliciones/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/soluciones/page.tsx)
#### [NEW] [src/app/porque-james/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/porque-james/page.tsx)

- [ ] **Step 1: Rebuild Homepage (Hero, Problem, How it works, Modular Preview)**
  Create: [src/app/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/page.tsx) using clean CSS modules for glassmorphism styling and smooth layout.

- [ ] **Step 2: Rebuild Modules main index & Category pages**
  Create: [src/app/modulos/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/modulos/page.tsx)
  Create: [src/app/categoria/[slug]/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/categoria/%5Bslug%5D/page.tsx) (Dynamic routing for Analítica Avanzada, Aplicaciones, Apoyo a la Gestión).

- [ ] **Step 3: Rebuild Module Detail pages**
  Create: [src/app/modulos/[slug]/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/modulos/%5Bslug%5D/page.tsx) dynamically reading from DB.

- [ ] **Step 4: Rebuild Solutions & Why James pages**
  Create: [src/app/soliciones/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/soliciones/page.tsx)
  Create: [src/app/porque-james/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/porque-james/page.tsx) implementing questions with accordion UI.

---

### Component 5: Lead Capture Forms and API endpoints
Connect contact, demo and career forms to DB.

#### [NEW] [src/app/api/leads/route.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/api/leads/route.ts)
#### [NEW] [src/app/solicita-una-demo/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/solicita-una-demo/page.tsx)
#### [NEW] [src/app/empresa/contacto/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/empresa/contacto/page.tsx)
#### [NEW] [src/app/empresa/carreras/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/empresa/carreras/page.tsx)

- [ ] **Step 1: Create API routes for forms**
  Create: [src/app/api/leads/route.ts](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/api/leads/route.ts) to handle POST requests for Contact, Demo, and Careers.

- [ ] **Step 2: Create Solicita Demo page**
  Create: [src/app/solicita-una-demo/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/solicita-una-demo/page.tsx) with a styled form.

- [ ] **Step 3: Create Contact page**
  Create: [src/app/empresa/contacto/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/empresa/contacto/page.tsx) with form fields matching the PDF spec.

- [ ] **Step 4: Create Careers page**
  Create: [src/app/empresa/carreras/page.tsx](file:///Users/dekgiovannirepetto/Documents/DEVELOPER/ICENIT/src/app/empresa/carreras/page.tsx) allowing file uploading of CVs (stored locally in `/public/uploads` for local dev).

---

## Verification Plan

### Automated Tests
- Setup unit test verification or manual execution testing of APIs.
- Form submissions API endpoint validation command:
  `curl -X POST -H "Content-Type: application/json" -d '{"type":"contact","name":"Test User","email":"test@icenit.ai","message":"Hello world"}' http://localhost:3000/api/leads`

### Manual Verification
1. Launch app locally via `npm run dev`.
2. Browse `/` (Home), `/modulos`, `/soliones`, `/porque-james` to check UI styling and text copy.
3. Submit a Demo request from `/solicita-una-demo` and Contact message from `/empresa/contacto`.
4. Log into `/admin` and confirm the submissions appear in the leads tables.
5. Edit a module description in `/admin` and verify the change appears on the module details page.
