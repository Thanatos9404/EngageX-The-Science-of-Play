import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';

export default function PredictionCalculator({ apiUrl }) {
  const [price, setPrice] = useState(20);
  const [dlcCount, setDlcCount] = useState(0);
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [metacritic, setMetacritic] = useState(75);

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(price),
          dlc_count: Number(dlcCount),
          release_year: Number(releaseYear),
          metacritic_score: Number(metacritic)
        })
      });

      if (!res.ok) throw new Error('Prediction API failed');

      const data = await res.json();
      setPrediction(data.predicted_engagement);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black border border-accent-green/30 p-8 rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className="material-symbols-outlined text-accent-green text-3xl">calculate</span>
        <h3 className="text-2xl font-bold text-white">Engagement Predictor</h3>
      </div>

      <p className="text-slate-400 text-sm mb-8 relative z-10">
        Adjust the hypothetical launch parameters below to query our trained Random Forest Regressor and predict baseline player retention.
      </p>

      <form onSubmit={handlePredict} className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Price Point ($)</label>
            <input
              type="number"
              min="0" max="150" step="0.5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">DLC Packages</label>
            <input
              type="number"
              min="0" max="250"
              value={dlcCount}
              onChange={(e) => setDlcCount(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Target Metacritic</label>
            <input
              type="number"
              min="10" max="100"
              value={metacritic}
              onChange={(e) => setMetacritic(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Release Year</label>
            <input
              type="number"
              min="2010" max="2030"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-green/20 hover:bg-accent-green/30 text-accent-green font-bold py-4 rounded border border-accent-green/50 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Oval height={20} width={20} color="#10b981" secondaryColor="#059669" />
          ) : (
            <>
              <span>SYNTHESIZE PREDICTION</span>
              <span className="material-symbols-outlined text-sm">memory</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded text-sm text-center">
          Error: {error}
        </div>
      )}

      {prediction !== null && !error && !loading && (
        <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-green/10 to-transparent translate-x-[-100%] animate-shimmer"></div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Predicted Retention Score</p>
          <div className="text-5xl font-black text-white">
            {prediction}
            <span className="text-xl text-slate-500">/100</span>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            {prediction > 70 ? "Blockbuster Potential Detected" : prediction > 40 ? "Stable Core Audience Expected" : "High Risk of Churn"}
          </p>
        </div>
      )}
    </div>
  );
}
