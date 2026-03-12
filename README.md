# AgriSense 🌾

**AgriSense** is a comprehensive agriculture analytics platform designed to empower farmers with data-driven insights. By leveraging advanced machine learning models, the platform provides tailored crop recommendations and precise yield predictions based on soil health and climatic conditions.

---

## 🌟 Core Features

- **🎯 Smart Crop Recommendation**: Recommends the top 3 optimal crops to grow based on Nitrogen (N), Phosphorous (P), Potassium (K), pH levels, and real-time weather data.
- **📈 Yield Forecasting**: Predicts potential yield (tonnes per hectare) by analyzing historical data and engineered stress indices.
- **📊 Interactive Dashboard**: A premium, responsive interface featuring dynamic charts for NPK distribution, rainfall trends, and predictive analysis.
- **☁️ Weather-Aware Insights**: Integrates climate factors like temperature and humidity for high-precision modeling.

---

## 🏗️ Project Structure

The repository is organized into three primary specialized components:

- **[`/frontend`](frontend/)**: A modern React application built with **Vite**. Features a custom design system and interactive visualizations using **Chart.js**.
- **[`/backend`](backend/)**: A high-performance **FastAPI** server that orchestrates model inference and exposes RESTful endpoints for the dashboard.
- **[`/ml model`](ml%20model/)**: The core intelligence lab. Contains data preprocessing pipelines, training scripts (Scikit-Learn), and serialized model files (`.pkl`).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Chart.js, Axios.
- **Backend**: FastAPI, Pydantic, Uvicorn.
- **Machine Learning**: Scikit-Learn, Pandas, Joblib, NumPy.
- **Styling**: Modern CSS with Glassmorphism and Dark Mode support.

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+**
- **Node.js (v18+) & npm**

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start the FastAPI server:
    ```bash
    python main.py
    ```
    The API will be live at `http://localhost:8000`. You can explore the interactive docs at `/docs`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Launch the development server:
    ```bash
    npm run dev
    ```
    Access the dashboard at `http://localhost:5173`.

---

## 🧠 Machine Learning Details

AgriSense uses **Random Forest** ensembles for both classification (Recommendation) and regression (Yield Prediction). 
- **Recommendation Accuracy**: ~99% validated via Repeated K-Fold.
- **Optimization**: All models are regularized to ensure fast inference times (<50ms).

For detailed documentation on model architecture and training, see the [**ML Model README**](ml%20model/README.md).

---

## 📄 License

This project is developed as part of a Software Engineering initiative.
