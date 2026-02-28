import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroLevel from './components/HeroLevel';
import MethodologySection from './components/MethodologySection';
import Level1Trends from './components/Level1Trends';
import Level2Comparisons from './components/Level2Comparisons';
import Level3AhaMoment from './components/Level3AhaMoment';
import PredictionCalculator from './components/PredictionCalculator';
import EthicalLayer from './components/EthicalLayer';
import SummaryScreen from './components/SummaryScreen';
import SurvivalCurves from './components/SurvivalCurves';
import Loader from './components/Loader';

// Assuming API runs locally on port 5000
const API_URL = 'http://127.0.0.1:5000';

function App() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/insights`);
        setInsights(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch insights", err);
        setError("Failed to load data. Ensure the Flask API is running.");
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-mono">{error}</div>;

  return (
    <div className="flex bg-background-dark text-white font-display min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] pointer-events-none opacity-20 z-0"></div>
      <div className="fixed inset-0 scanline z-0 pointer-events-none"></div>

      {/* Sticky Side Navigation */}
      <aside className="hidden lg:flex flex-col w-64 fixed h-screen top-0 left-0 border-r border-primary/20 bg-background-dark/80 backdrop-blur-md z-40 p-6">
        <div className="flex items-center gap-3 mb-12 mt-4">
          <div className="text-primary">
            <span className="material-symbols-outlined text-4xl">science</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-white text-xl font-bold uppercase tracking-widest leading-none">Engage<span className="text-primary">X</span></h2>
            <span className="text-xs text-primary/60 font-mono tracking-widest">DATA_LAB</span>
          </div>
        </div>

        <nav className="flex flex-col gap-6 text-sm font-bold uppercase tracking-wide">
          <a href="#hero" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Verdict</a>
          <a href="#aha" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Divergence (Aha)</a>
          <a href="#survival" className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Survival Analysis</a>
          <a href="#comparisons" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Economics (Level 02)</a>
          <a href="#calculator" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> DL Models</a>
          <a href="#ethics" className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Volatility (Limits)</a>
          <a href="#summary" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Player Impact</a>
          <a href="#methodology" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Methodology</a>
        </nav>

        <div className="mt-auto">
          <p className="text-[10px] text-slate-500 font-mono">STATUS: ONLINE<br />PULSE: NORMAL</p>
        </div>
      </aside>

      {/* Mobile Navbar Header */}
      <nav className="lg:hidden fixed top-0 w-full border-b border-primary/20 bg-background-dark/95 backdrop-blur-md z-50 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">science</span>
          <h2 className="text-white text-lg font-bold uppercase tracking-widest leading-none">Engage<span className="text-primary">X</span></h2>
        </div>
        <span className="material-symbols-outlined text-slate-400 cursor-pointer">menu</span>
      </nav>

      {/* Main Content Sections (offset by sidebar width on large screens) */}
      <main className="relative z-10 w-full lg:ml-64 scroll-smooth">
        <section id="hero"><HeroLevel data={insights} /></section>
        <section id="aha"><Level3AhaMoment data={insights} apiUrl={API_URL} /></section>
        <section id="survival"><SurvivalCurves data={insights} apiUrl={API_URL} /></section>
        <section id="comparisons"><Level2Comparisons data={insights} apiUrl={API_URL} /></section>

        <section id="calculator" className="py-20 px-6 max-w-4xl mx-auto">
          <PredictionCalculator apiUrl={API_URL} />
        </section>

        <section id="ethics"><EthicalLayer data={insights} /></section>
        <section id="summary"><SummaryScreen data={insights} apiUrl={API_URL} /></section>
        <section id="methodology"><MethodologySection data={insights} /></section>

        {/* Footer */}
        <footer className="relative z-20 bg-background-dark border-t border-primary/10 py-12 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center text-xs font-mono text-slate-500 space-y-2">
            <p>© 2026 Yashvardhan Thanvi</p>
            <p>Built for Codédex Monthly Data Challenge</p>
            <p className="opacity-70">Special thanks to Codédex for fostering creative data storytelling.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
