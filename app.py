from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import json
import joblib
import numpy as np
import os

app = Flask(__name__)

# Explicitly allow all Vercel deployments and local dev
allowed_origins = [
    "https://engagex-yt.vercel.app",
    "https://engagex-drab.vercel.app",
    "https://engagex-api.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5000",
]
CORS(app, origins=allowed_origins, supports_credentials=True)

# Load the trained machine learning model and scaler
try:
    rf_model = joblib.load('rf_model.joblib')
    rf_scaler = joblib.load('rf_scaler.joblib')
except Exception as e:
    print(f"Warning: ML model not found. /api/predict will fail. {e}")
    rf_model = None
    rf_scaler = None

@app.route('/api/insights', methods=['GET'])
def get_insights():
    try:
        with open('frontend/public/insights.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/assets/<path:filename>')
def serve_assets(filename):
    # This now seamlessly serves the .json Plotly graph payloads
    return send_from_directory('frontend/public/assets', filename)

@app.route('/api/predict', methods=['POST'])
def predict_engagement():
    if not rf_model or not rf_scaler:
        return jsonify({"error": "Model not loaded"}), 500
        
    try:
        data = request.json
        features = [
            float(data.get('price', 0)),
            float(data.get('dlc_count', 0)),
            float(data.get('release_year', 2025)),
            float(data.get('metacritic_score', 75)) # default to mid-tier metacritic if not provided
        ]
        
        # Standardize and predict
        X_scaled = rf_scaler.transform([features])
        prediction = rf_model.predict(X_scaled)[0]
        
        # Clip score between 0 and 100 for safety
        score = min(max(prediction, 0), 100)
        
        return jsonify({
            "predicted_engagement": round(score, 1),
            "inputs": data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/', methods=['GET'])
def root():
    return jsonify({"status": "ok", "message": "EngageX API is live."})

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
