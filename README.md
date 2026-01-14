# GTD-on-web

A web-based GTD (Getting Things Done) application built with React, Vite, and Supabase.

**🚀 This project is deployed on Vercel and connected to Supabase!**

For local development setup with the same database, see [VERCEL_SETUP.md](./VERCEL_SETUP.md) (Korean: [한국어 가이드](./SUPABASE_SETUP_KR.md))

## Features

- ✅ Create, read, update, and delete tasks
- 📊 Organize tasks by status: Inbox, Next, Waiting, Someday, Done
- 🎨 Color-coded task statuses
- 💾 Persistent storage with Supabase
- 🔄 Real-time database synchronization

## Tech Stack

- React 19
- Vite 7
- Supabase (Backend & Database)
- Modern JavaScript (ES Modules)

## Quick Start (for Local Development)

**This project uses the Vercel-deployed Supabase database.**

1. Get environment variables from Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables
   - Copy `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

2. Create `.env` file:
```bash
cp .env.example .env
# Then paste the Vercel values into .env
```

3. Install and run:
```bash
npm install
npm run dev
```

📖 See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed instructions.

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Project name: `gtd-on-web` (or any name you prefer)
   - Database password: Choose a strong password
   - Region: Select the closest region to you
4. Wait for the project to be created (takes ~2 minutes)

### 2. Set Up Database Schema

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of the `supabase-setup.sql` file from this repository
4. Paste it into the SQL Editor
5. Click **"Run"** to execute the SQL script

This will create:
- `tasks` table with all necessary columns
- Row Level Security (RLS) policies for CRUD operations
- Automatic `updated_at` timestamp trigger
- Sample data for testing

### 3. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API** (left sidebar)
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### 4. Configure Environment Variables

**This project is already deployed on Vercel with Supabase configured!**

To run locally with the same Supabase database:

1. Get the environment variables from your Vercel deployment:
   - Go to your [Vercel dashboard](https://vercel.com/dashboard)
   - Select the `GTD-on-web` project
   - Go to **Settings** → **Environment Variables**
   - Copy the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values

2. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

3. Open `.env` and paste the values from Vercel:
```env
VITE_SUPABASE_URL=<value from Vercel>
VITE_SUPABASE_ANON_KEY=<value from Vercel>
```

This way, your local development will use the same Supabase database as your Vercel deployment!

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:5173` (or the URL shown in terminal)

4. You should see the GTD app with sample tasks from the database!

## Build for Production

1. Build the project:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

## Troubleshooting

### "Supabase URL and Anon Key must be provided" Error

Make sure you have created the `.env` file with correct credentials. The `.env` file should be in the project root directory, NOT inside the `src` folder.

### No Tasks Showing

1. Check browser console for errors (F12 → Console tab)
2. Verify your Supabase credentials in `.env` are correct
3. Make sure you ran the `supabase-setup.sql` script in Supabase SQL Editor
4. Check your Supabase project dashboard → Table Editor → tasks table has data

### CORS or Network Errors

Make sure your Supabase project URL is correct and your project is active (not paused).

## Project Structure

```
├── src/
│   ├── App.jsx              # Main app component with task management
│   ├── supabaseClient.js    # Supabase client initialization
│   ├── main.jsx             # App entry point
│   └── *.css                # Styling files
├── supabase-setup.sql       # Database schema and setup
├── .env.example             # Environment variables template
└── package.json             # Project dependencies
```

## Database Schema

The `tasks` table includes:
- `id`: UUID (primary key)
- `title`: Text (required)
- `description`: Text (optional)
- `status`: Enum ('inbox', 'next', 'waiting', 'someday', 'done')
- `priority`: Enum ('low', 'medium', 'high')
- `created_at`: Timestamp
- `updated_at`: Timestamp (auto-updated)

## License

MIT