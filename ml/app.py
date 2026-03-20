from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

model = joblib.load(MODEL_PATH)

feature_names = [
    "age", "sex", "bmi", "bp",
    "s1", "s2", "s3", "s4", "s5", "s6"
]

@app.route("/")
def home():
    return "ML API Running 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)       
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid JSON body"}), 400
        
        missing = [f for f in feature_names if f not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        try:
            features = [float(data[f]) for f in feature_names]
        except ValueError:
            return jsonify({"error": "All fields must be numeric"}), 400
        
        df = pd.DataFrame([features], columns=feature_names)

        pred = int(model.predict(df)[0])
        prob = float(model.predict_proba(df)[0][1])

        return jsonify({
            "prediction": pred,
            "probability": round(prob, 4)
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)