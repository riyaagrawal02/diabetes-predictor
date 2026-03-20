import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib
import os

BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "diabetes.csv")
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

df = pd.read_csv(DATA_PATH)

features = ["age", "sex", "bmi", "bp", "s1", "s2", "s3", "s4", "s5", "s6"]

X = df[features]
y = df["Outcome"]

X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression(max_iter=3000, C=0.1, class_weight="balanced")

model.fit(X_train, y_train)

joblib.dump(model, MODEL_PATH)

print("Model trained WITHOUT scaling")