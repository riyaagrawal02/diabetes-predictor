# Diabetes Predictor

A full-stack machine learning web application that estimates diabetes risk from common health attributes. The project includes a trained ML model, a backend REST API, and a frontend UI for collecting inputs and displaying results.

> **Disclaimer:** This project is for educational purposes and is **not** medical advice.

## Overview
This project uses a supervised learning model trained on medical data (e.g., glucose, BMI, age) to predict the likelihood of diabetes. Users enter health attributes in the web interface; the frontend calls the backend API, which loads the trained model and returns a prediction.

## Features
- Predicts diabetes risk from user-provided health inputs
- Data preprocessing pipeline for consistent and robust inference
- REST API to serve model predictions
- Simple, user-friendly UI for entering attributes and viewing results
- Extensible codebase for experimentation with models and features

## Architecture
High-level flow:
1. **Frontend (React)** collects user inputs.
2. **Backend (Node.js/Express)** exposes API endpoints and performs validation.
3. **ML Inference (Python + scikit-learn)** runs preprocessing + model prediction.
4. **Response** is returned to the UI for display.

## Tech Stack
- **ML / Data:** Python, NumPy, Pandas, scikit-learn
- **Backend:** Node.js, Express
- **Frontend:** React
- **Model Persistence:** Pickle / Joblib

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- Python 3.9+ (recommended)
- pip

### Installation
Clone the repository:
```bash
git clone https://github.com/riyaagrawal02/diabetes-predictor.git
cd diabetes-predictor
```

Install dependencies (adjust paths if your repo differs):
```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

Install Python dependencies:
```bash
# from project root or ml/ directory (depending on repo structure)
pip install -r requirements.txt
```

### Run Locally
Start the backend API:
```bash
cd backend
npm start
```

Start the frontend:
```bash
cd frontend
npm start
```

## Usage
1. Enter the required health attributes (e.g., glucose, BMI, age).
2. Submit the form to request a prediction.
3. Review the predicted risk/probability returned by the model.

## Project Structure
> Update this section if your folder names differ.

```text
.
├─ backend/          # Node/Express server
├─ frontend/         # React app
├─ model/ or ml/     # Training/inference code and artifacts
├─ requirements.txt  # Python dependencies (if applicable)
└─ README.md
```

## Model Details
- Typical workflow includes: data cleaning → feature engineering → train/validate → persist model.
- Model artifacts may be stored as `.pkl`/`.joblib` files.

If you add details such as dataset source, evaluation metrics (accuracy, ROC-AUC), and feature list, include them here for reproducibility.

## API Reference
> Replace endpoints below with the actual routes implemented in your backend.

Example:
- `POST /predict` — returns diabetes risk given input features

Request (example):
```json
{
  "glucose": 120,
  "bmi": 28.4,
  "age": 35
}
```

Response (example):
```json
{
  "prediction": 1,
  "probability": 0.73
}
```

## License
Add a license to clarify usage (e.g., MIT). If you already have one, reference it here.
