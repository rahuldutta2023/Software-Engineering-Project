# 🌱 CarbonTrack – Household Carbon Footprint Monitoring System

CarbonTrack is a sustainability analytics platform designed to monitor and analyze household carbon emissions based on resource consumption patterns such as electricity usage, water consumption, transportation fuel and cooking gas usage.

---

## 📌 Project Objective

The primary objective of CarbonTrack is to:

- Monitor household carbon emissions
- Provide analytical insights on environmental impact
- Enable sustainability goal tracking
- Generate personalized eco-friendly recommendations
- Encourage sustainable practices through gamification

---

## 🏗 System Architecture

CarbonTrack follows a modular client-server architecture consisting of:

- **Presentation Layer** – ReactJS based UI for user interaction and visualization
- **Application Layer** – FastAPI backend for emission calculation and KPI analysis
- **Data Layer** – CSV-based persistence for storing user profiles and emissions data

Frontend and backend communicate through RESTful APIs.

---

## 🔑 Features

- Multi-user authentication
- Emission monitoring dashboard
- Resource-wise emissions breakdown
- KPI-based sustainability analysis
- Monthly carbon budget tracking
- Personalized eco-friendly recommendations
- Leaderboard and eco-points system
- Emissions history tracking
- Automated report generation

---

## 🛠 Technologies Used

| Layer | Technology |
|-------|------------|
Frontend | ReactJS |
Backend | FastAPI |
Data Processing | Pandas |
Visualization | Recharts |
Persistence | CSV |

---

## 📊 Modules

- Authentication Module
- Dashboard Module
- Emission Analytics Module
- KPI Analysis Module
- Goal Management Module
- Recommendation Engine
- Gamification Module
- History Tracking Module
- Report Generation Module

---

## 📁 Project Structure
```
carbon-frontend/
│
├── src/
│   ├── components/
│   │   ├── EmissionsChart.jsx
│   │   ├── KPIAnalysis.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Recommendations.jsx
│   │   └── NatureEquivalent.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── History.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── global.css
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

```
carbon-backend/
│
├── app/
│   ├── api/
│   │   └── routes/
│   │       ├── auth.py
│   │       ├── dashboard.py
│   │       ├── emissions.py
│   │       ├── consumption.py
│   │       └── incentives.py
│   │
│   ├── services/
│   │   ├── emission_service.py
│   │   ├── incentive_service.py
│   │   └── recommendation_service.py
│   │
│   ├── core/
│   │   ├── data_store.py
│   │   ├── security.py
│   │   └── config.py
│   │
│   └── main.py
│
├── data/
│   ├── users.csv
│   ├── daily_emissions.csv
│   ├── incentives.csv
│   ├── carbon_summary.csv
│   └── user_goals.csv
│
└── requirements.txt
```

---

## ▶️ How to Run

### Backend
```
cd carbon-backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
(you can also use a virtual environment if needed)

### Frontend
```
cd carbon-frontend
npm install
npm run dev
```
---

## 📈 Future Enhancements

- Integration with IoT-based smart meters
- Cloud-based database support
- Mobile application support
- Real-time emissions tracking

---

## 👨‍💻 Contributors

Project developed as part of Software Engineering coursework.