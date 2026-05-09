CollabsUp – Real-Time Team Collaboration Platform

CollabsUp is a real-time team collaboration platform built with Django, Django Channels, WebSockets, Redis, and React. It helps teams stay aligned through daily standups, role-based access control, and context-aware real-time discussions.

Features

Team and Role Management

The first registered user automatically becomes the Team Leader. Team Leaders can invite members and assign roles. Team Members can post standups and participate in discussions.

Daily Standups

Users post daily updates that expire automatically after 24 hours. Replies remain tied to their original standup for context and clarity.

Real-Time Collaboration

Replying to a standup creates a dedicated real-time discussion channel powered by WebSockets, Django Channels, and Redis Pub/Sub.

Background Processing

Asynchronous tasks such as data cleanup and scheduled operations are handled by Celery.

Tech Stack

Backend: Python, Django, Django REST Framework, Django Channels, Redis, Celery

Frontend: React, Vite

Database: PostgreSQL (production) / SQLite (local development)

Prerequisites

Python 3.10+
Node.js 18+
npm
Redis
Git
Local Setup

1. Clone the Repository


bash
git clone https://github.com/HassanTaiwo185/Real-Time-Collaboration-App
cd Real-Time-Collaboration-App
2. Backend Setup


bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:
```
SECRET_KEY=your-django-secret-key
DEBUG=False
FRONTEND_URL=http://localhost:5173

REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0

DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432

EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
To generate a Django secret key:


bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
Note: Email must be configured for account verification and team invitations to work.

Run migrations and start the server:


bash
python manage.py migrate
python manage.py runserver
Backend runs at http://127.0.0.1:8000

3. Start Redis


bash
redis-server
4. Start Celery Worker (optional)

In a separate terminal:


bash
cd backend
source .venv/bin/activate
celery -A backend worker -l info
5. Frontend Setup


bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://127.0.0.1:8000/api
VITE_WS_URL=ws://127.0.0.1:8000/
Start the development server:


bash
npm run dev
Frontend runs at http://localhost:5173

Live url

https://real-time-collaboration-app-mu.vercel.app 

Testing Real-Time Features

Open two browser windows
Create two separate user accounts
Post a standup from one account
Reply to it from the other
Observe the instant real-time update
Security Notes

All secrets are managed through environment variables
.env files are excluded from version control via .gitignore
Rotate any credentials used during testing before deploying
License

This project is intended for educational and portfolio use.



