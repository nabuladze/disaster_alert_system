# Natural Disaster Early Warning System — Backend

Backend API for the Natural Disaster Early Warning System bachelor project.

Built with:
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- OpenWeather API

---

# Features

- User registration with phone number
- User login with JWT authentication
- Protected API routes
- Region-based alert system
- Weather data integration
- Risk analysis engine
- Alert generation and storage
- Active disaster alerts
- Region update for authenticated users

---

# Installation

## 1. Go to backend folder

```bash
cd Backend
```

## 2. Create virtual environment

```bash
python3 -m venv .venv
```

## 3. Activate virtual environment

Mac/Linux:

```bash
source .venv/bin/activate
```

Windows:

```bash
.venv\Scripts\activate
```

---

# Install dependencies

```bash
pip install -r requirements.txt
```

---

# OpenWeather API Setup

Create `.env` file inside `Backend` folder:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

Get API key from:

https://openweathermap.org/api

---

# Run Server

```bash
uvicorn app.main:app --reload
```

Server runs at:

```text
http://127.0.0.1:8000
```

---

# API Documentation

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

---

# Main Endpoints

## Authentication
- POST `/register`
- POST `/login`

## Weather & Risk
- GET `/weather/{city}`
- GET `/active-alerts`

## Alerts
- POST `/generate-alert/{city}`
- GET `/alerts`
- GET `/danger-alerts/{city}`

## Protected Routes
- GET `/protected`
- PUT `/me/region`

---

# Technologies Used

- Python
- FastAPI
- SQLite
- SQLAlchemy
- JWT
- OpenWeather API
- Uvicorn

---

# Project Status

Backend development completed.  
Frontend development in progress.