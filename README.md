# MediPredict

Research-focused AI healthcare platform for predicting Diabetes, Heart Disease, Kidney Disease, and Liver Disease using Machine Learning and Explainable AI techniques.

---

# Overview

MediPredict is an AI-powered clinical decision support and disease risk assessment platform designed to assist in early-stage disease prediction using patient clinical parameters and laboratory values.

The project combines:

- Machine Learning based disease prediction
- Explainable AI using SHAP and LIME
- Full-stack web architecture
- Authentication and prediction history
- Research-oriented visualization workflows

The platform is built primarily for:

- Academic research
- Final year projects
- Healthcare AI experimentation
- Explainable AI demonstrations
- Machine Learning workflow understanding

---

# Supported Disease Predictions

| Disease | Status |
|---|---|
| Diabetes Prediction | Completed |
| Heart Disease Prediction | Completed |
| Kidney Disease Prediction | Completed |
| Liver Disease Prediction | Completed |

---

# Core Features

## AI-Based Disease Prediction

Predict disease risks using trained Machine Learning models based on patient inputs.

## Explainable AI (XAI)

Integrated SHAP and LIME explainability for understanding:

- Feature importance
- Risk-driving factors
- Model decision reasoning

## Authentication System

JWT-based authentication system with:

- User registration
- Login
- Secure token validation

## Prediction History

Authenticated users can:

- Save predictions
- View historical assessments
- Track previous analyses

## Research Visualization

Model interpretation visualizations include:

- SHAP bar plots
- SHAP waterfall plots
- SHAP beeswarm plots
- LIME explanations

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Axios
- Zustand

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic

## Database

- Supabase PostgreSQL

## Machine Learning

- Scikit-learn
- SHAP
- LIME
- Pandas
- NumPy

---

# Project Architecture

```text
MediPredict/
│
├── frontend/                 # React frontend
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── ml_models/            # Trained ML models
│   ├── data/                 # Datasets
│   ├── tests/
│   └── requirements.txt
│
└── README.md
```

---

# Explainable AI Workflow

The project uses Explainable AI methods to improve transparency in predictions.

## SHAP

Used for:

- Global feature importance
- Local prediction explanations
- Risk factor analysis

## LIME

Used for:

- Local surrogate explanations
- Instance-level interpretation
- Clinical insight generation

---

# Backend Features

- Async FastAPI architecture
- Modular service-based design
- Dynamic disease prediction routing
- Input validation using Pydantic
- Optional authentication prediction flow
- PostgreSQL integration
- Prediction persistence support

---

# Frontend Features

- Multi-step disease assessment workflow
- Dynamic form rendering
- Clinical input validation
- Interactive prediction results
- SHAP visualization integration
- Responsive modern UI design
- Glassmorphism-inspired interface components

---

# Machine Learning Pipeline

Each disease model follows:

1. Data preprocessing
2. Feature engineering
3. Model training
4. Evaluation
5. Explainability integration
6. API deployment

Models are trained using Scikit-learn pipelines and serialized using Pickle.

---

# API Features

## Authentication

- Register user
- Login user
- JWT token generation

## Predictions

- Disease prediction endpoint
- Dynamic feature validation
- Risk confidence scoring
- SHAP explanation generation

## History

- Save predictions
- Fetch user prediction history

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/MediPredict.git
cd MediPredict
```

---

# Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside backend:

```env
DATABASE_URL=your_database_url
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
```

---

# Research Objectives

The project focuses on:

- Early disease risk assessment
- Explainable healthcare AI
- Transparent ML decision systems
- Clinical feature analysis
- Educational healthcare AI workflows

---

# Future Improvements

Planned future enhancements:

- Additional disease modules
- Real-time analytics dashboard
- Medical report upload support
- AI chatbot integration
- PDF clinical report generation
- Docker deployment
- Advanced model monitoring

---

# Contributors

| Name | Role |
|---|---|
| Satyajeet Mohanty | Full Stack Development,ML Integration, Backend Architecture |
| Biseswar Mohapatra | Full Stack Development, ML Integration, Backend Architecture |
| Anwesh Behera | ML Integration,Research, Testing |
| Rahul Mohanty | Research, UI, API, Testing, Deployment |

---

# Academic Note

This project is intended for:

- Research purposes
- Educational purposes
- Demonstration purposes

It is not intended to replace professional medical diagnosis or clinical decision-making.


