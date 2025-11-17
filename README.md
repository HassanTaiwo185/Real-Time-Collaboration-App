Real-Time Collaboration App

This is a real-time collaboration platform built with Django Channels, WebSockets, Redis, and React.
It enables teams to coordinate through 24-hour standups, live chat, and role-based team management.

Key Features
🔹 Automatic Team Leader Assignment

The first user to sign in becomes the Team Leader automatically.

Team Leaders have elevated permissions, including:

Inviting new team members

Promoting a member to Team Leader

Managing team roles

🔹 Team Member Roles

User actions depend on their role:

Team Leader
✓ Invite members
✓ Post standups
✓ Reply and chat
✓ Promote team members

Team Member
✓ Post standups
✓ Reply and chat
✗ Cannot invite others
✗ Cannot promote others

🔹 Real-Time Standups

Each user can post a daily standup update about what they have done so far.

Standups automatically expire after 24 hours.

Standups can receive replies, forming a real-time threaded discussion.

🔹 Live Chat on Standup Replies

When someone replies to a standup, a real-time WebSocket chat room is automatically created.

All team members can interact instantly with:

WebSockets

Django Channels

Redis Pub/Sub

🔹 Modern Full-Stack Architecture

Backend: Django + Django Channels + Redis

Frontend: React + Vite

WebSockets: Real-time messaging

Celery: Background tasks (e.g., auto-deleting standups after 24 hours)

Prerequisites

Make sure you have the following installed:

Python 3.10+

Django

Node.js + npm

Redis Server

Git

Local Setup Guide
Step 1: Clone the Repository
git clone <your-repo-url>
cd <project-folder>

Step 2: Backend Setup (Django)
Navigate to backend:
cd backend

Create virtual environment

macOS/Linux:

python3 -m venv .venv
source .venv/bin/activate


Windows:

python -m venv .venv
.venv\Scripts\activate

Install dependencies:
pip install -r requirements.txt

Database Options
Option A: SQLite (recommended for beginners)

No configuration required.

Option B: PostgreSQL (e.g., AWS RDS)

Get credentials from your RDS instance under Connectivity & Security.

Create Backend .env File

Create a .env in the backend folder:

SECRET_KEY=django-insecure-a7munyer4qud+-6gv_uj4016kzo!b_y94ywf5o8zdf_$frzm+6

FRONTEND_URL=http://localhost:5173

REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0

DB_NAME=postgres
DB_USER=Hassanphine
DB_PASSWORD=H.a.s.s.a.n123
DB_HOST=microflow-database.ctescc44o1zj.us-east-2.rds.amazonaws.com
DB_PORT=5432

Apply Migrations
python3 manage.py migrate

Start Django Server
python3 manage.py runserver


Backend runs at:
http://127.0.0.1:8000

Step 3: Frontend (React)

Open a new terminal:

cd frontend


Install dependencies:

npm install


Create .env:

VITE_API_URL=http://127.0.0.1:8000/api
VITE_WS_URL=ws://127.0.0.1:8000/


Start React:

npm run dev


Frontend runs at:
http://localhost:5173

Step 4: Run the App

Open your browser at
👉 http://localhost:5173

To test real-time features:

Open two browser windows

Use two different accounts

Post a standup and reply to it

Watch real-time updates appear instantly
