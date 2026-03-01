import joblib
import warnings
warnings.filterwarnings('ignore')

rf_model = joblib.load('rf_model.joblib')
rf_scaler = joblib.load('rf_scaler.joblib')

cases = [
    [20, 0, 2026, 75],    # Default
    [0, 50, 2026, 75],    # F2P Heavy DLC
    [0, 100, 2026, 98],   # Perfect game
    [150, 100, 2026, 98], # Expensive perfect
    [60, 0, 2026, 98],    # Mid price, no dlc
    [60, 0, 2026, 10]     # Terrible game
]

for c in cases:
    X = rf_scaler.transform([c])
    pred = rf_model.predict(X)[0]
    print(f"Inputs {c}: {pred}")
