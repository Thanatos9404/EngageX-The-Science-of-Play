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

// API URL: Vercel env var > Render live URL > localhost fallback
const API_URL = import.meta.env.VITE_API_URL || 'https://engagex-api.onrender.com';

function App() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Fetch static insights payload directly from public folder
        const response = await axios.get(`/insights.json`);
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
          <ul className="space-y-4">
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'hero' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#hero" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'hero' ? 'bg-primary shadow-[0_0_10px_#06f9f9]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Verdict</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'aha' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#aha" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'aha' ? 'bg-primary shadow-[0_0_10px_#06f9f9]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Lvl 01: The Hidden Split</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'survival' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#survival" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'survival' ? 'bg-accent-green shadow-[0_0_10px_#46E3B7]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Lvl 02: Survival Decay</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'comparisons' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#comparisons" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'comparisons' ? 'bg-accent-green shadow-[0_0_10px_#46E3B7]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Lvl 03: Economics</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'ethics' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#ethics" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'ethics' ? 'bg-secondary shadow-[0_0_10px_#f472b6]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Lvl 04: Volatility</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'calculator' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#calculator" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'calculator' ? 'bg-primary shadow-[0_0_10px_#06f9f9]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">DL Models</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'summary' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#summary" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'summary' ? 'bg-primary shadow-[0_0_10px_#06f9f9]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Player Impact</span>
              </a>
            </li>
            <li className={`flex items-center gap-3 transition-colors ${activeSection === 'methodology' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <a href="#methodology" className="flex items-center gap-3 group">
                <span className={`w-2 h-2 rounded-full ${activeSection === 'methodology' ? 'bg-primary shadow-[0_0_10px_#06f9f9]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                <span className="font-mono text-xs tracking-widest uppercase truncate">Methodology</span>
              </a>
            </li>
          </ul>
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
            <p className="opacity-70">All statistical comparisons include 95% bootstrapped confidence intervals unless otherwise specified.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
