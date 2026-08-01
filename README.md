# HuntHub

A job application tracker built with React and Supabase. Add, Update and monitor job applications in one place. No more Spreadsheets!.

# Features

- Add new job applications (company, role, date applied, job link, notes)
- Track status per application: Applied, Interview, Offer, Rejected
- At-a-glance stats dashboard (total applications + breakdown by status)
- Delete applications
- Direct link to the original job posting

# Tech Stack

- Frontend: React (Vite)
- Backend/Database: Supabase
- Styling: CSS

## Getting Started

# Prerequisites

- Node.js installed
- A free [Supabase](https://supabase.com) account and project

# Installation

1. Clone the repo
   ```bash
   git clone https://github.com/Lisa-byte-creator/job-tracker.git
   cd job-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in your Supabase project under **Settings > API**.

4. Set up the database

   In Supabase, create a table called `applications` with the following columns:

   | Column        | Type      |
   |---------------|-----------|
   | id            | uuid (primary key) |
   | company_name  | text      |
   | role_title    | text      |
   | date_applied  | date      |
   | job_link      | text      |
   | notes         | text      |
   | status        | text      |

5. Run the app
   ```bash
   npm run dev
   ```

## Live Demo
https://job-tracker-indol-ten.vercel.app


## Screenshots

<img width="1124" height="743" alt="Screenshot 2026-08-01 at 21 24 26" src="https://github.com/user-attachments/assets/741dc137-0721-4755-bfdb-33effe582649" />
<img width="1128" height="649" alt="Screenshot 2026-08-01 at 21 26 14" src="https://github.com/user-attachments/assets/01982e1a-1d50-4ee2-a738-04f6fadea1d5" />


## Author

Built by [Lisa-byte-creator](https://github.com/Lisa-byte-creator)
