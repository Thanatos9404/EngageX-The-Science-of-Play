from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
# Enable CORS for the React frontend (running on Vite's default port or any port)
CORS(app)

@app.route('/api/insights', methods=['GET'])
def get_insights():
    try:
        with open('insights.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/assets/<path:filename>')
def serve_assets(filename):
    # Serve generated charts from the static/assets directory
    return send_from_directory('static/assets', filename)

@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "Data Story API is running."})

if __name__ == '__main__':
    # Run the API on port 5000
    app.run(debug=True, port=5000)
