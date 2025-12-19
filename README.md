CollabsUp – Real-Time Team Collaboration Platform

CollabsUp is a real-time team collaboration platform built with Django, Django Channels, WebSockets, Redis, and React.
It helps teams stay aligned through daily standups, role-based access control, and context-aware real-time discussions.

This repository is intended for learning, experimentation, and portfolio use.
Feel free to modify, simplify, or rewrite this README to suit your own setup or learning goals.

⸻

🚀 Key Features

🔹 Team & Role Management
	•	First registered user becomes the Team Leader
	•	Role-based permissions:
	•	Team Leaders can invite members and manage roles
	•	Team Members can post standups and participate in discussions

⸻

🔹 Daily Standups
	•	Users post daily updates
	•	Standups expire automatically after 24 hours
	•	Replies stay tied to their original standup for clarity

⸻

🔹 Real-Time Collaboration
	•	Replying to a standup creates a dedicated real-time discussion channel
	•	Instant updates powered by:
	•	WebSockets
	•	Django Channels
	•	Redis Pub/Sub

⸻

🔹 Background Processing
	•	Asynchronous tasks handled using Celery
	•	Used for data cleanup and scheduled operations


🛠 Tech Stack

Backend
	•	Python
	•	Django
	•	Django REST Framework
	•	Django Channels
	•	Redis
	•	Celery

Frontend
	•	React
	•	Vite

Database
	•	SQLite (default, recommended for local development)
	•	PostgreSQL (optional, production-style setup)

⸻

📋 Prerequisites
	•	Python 3.10+
	•	Node.js 18+
	•	npm
	•	Redis Server
	•	Git

⸻

⚙️ Local Setup Guide

1️⃣ Clone the Repository
git clone <repository-url>
cd <repository-name>



⸻

🔧 Backend Setup (Django)

cd backend

Create and activate virtual environment

macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

Windows
python -m venv .venv
.venv\Scripts\activate

Install dependencies
pip install -r requirements.txt

🔐 Environment Configuration

This project uses environment variables for configuration.
For security reasons, .env files are not committed to version control.



🔐 SECRET_KEY section

### Generating a SECRET_KEY
Generate your own Django SECRET_KEY using:

python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

Create a .env file (backend)
SECRET_KEY=your-secret-key
DEBUG=False

FRONTEND_URL=http://localhost:5173

# Redis
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0

# Database(PostgreSQL)
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432


### Email Configuration
Email is used for:
- Account verification
- Team invitation links

To enable email functionality, configure SMTP credentials using your own email provider.

#### Gmail (Example)

1. Enable 2-Step Verification on your Google account
2. Create an App Password
3. Set the following environment variables:

EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

If email is not configured, account creation will not work, because 
verification emails will not be sent.

🗄 Database 
PostgreSQL 
Provide PostgreSQL credentials in the .env file, then run:
python manage.py migrate



⸻

Start Django server
python manage.py runserver


Backend runs at:
http://127.0.0.1:8000

🔄 Start Redis

Ensure Redis is running locally:
redis-server


⚙️ (Optional) Start Celery Worker

In a separate terminal:
cd backend
source .venv/bin/activate
celery -A backend worker -l info



⸻

🎨 Frontend Setup (React)
cd frontend
npm install

Create frontend .env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_WS_URL=ws://127.0.0.1:8000/


⸻

Start frontend
npm run dev

Frontend runs at:
http://localhost:5173

🧪 Testing Real-Time Features
	1.	Open two browser windows
	2.	Create two user accounts
	3.	Post a standup from one account
	4.	Reply from the other
	5.	Observe instant real-time updates

⸻

🔐 Security Notes
	•	Secrets are managed via environment variables
	•	.env files are excluded from version control
	•	Rotate credentials if testing with real services

⸻

📌 Customization Notes
	•	You are encouraged to modify or rewrite this README
	•	PostgreSQL is used because of production-style setups

⸻

📄 License

This project is intended for educational and portfolio use.



