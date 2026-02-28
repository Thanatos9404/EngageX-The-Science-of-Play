import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroLevel = ({ data }) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative px-6 py-12 md:py-20">
      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & Content */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-bold font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-ping"></span>
            Live Analysis
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase relative">
            Are Games
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 block text-glow mt-2 mb-2">Becoming More</span>
            Engineered for
            <span className="relative inline-block ml-3">
              Engagement?
              <svg className="absolute -bottom-4 left-0 w-full h-3 text-primary" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 L100 5" stroke="currentColor" strokeDasharray="5,5" strokeWidth="2"></path>
              </svg>
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed border-l-4 border-primary pl-6">
            A rigorous, statistically grounded investigation into modern gaming mechanics. By processing the massive Steam dataset, we derive an empirical framework to answer: Are games improving natively, or simply optimizing the science of player retention?
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-900/50 border border-slate-700 p-4 rounded backdrop-blur-sm">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Data Points</div>
              <div className="text-2xl text-white font-mono font-bold">~2.5M</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 p-4 rounded backdrop-blur-sm">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Games Analyzed</div>
              <div className="text-2xl text-primary font-mono font-bold">{data?.total_games_analyzed?.toLocaleString() || "..."}</div>
            </div>
            <div className="hidden md:block bg-slate-900/50 border border-slate-700 p-4 rounded backdrop-blur-sm">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Dataset</div>
              <div className="text-2xl text-accent-green font-mono font-bold">Steam</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href="#trends" className="group relative px-8 py-4 bg-primary text-background-dark text-lg font-black uppercase tracking-widest hover:bg-white transition-all duration-300 hud-border shadow-[4px_4px_0px_#0f2323] hover:shadow-[6px_6px_0px_rgba(6,249,249,0.5)] hover:-translate-y-1">
              <span className="flex items-center gap-3">
                Start Exploration
                <ArrowDown className="group-hover:translate-y-1 transition-transform" />
              </span>
            </a>
            <span className="text-slate-500 text-sm font-mono animate-pulse blink">&lt; SCROLL TO BEGIN &gt;</span>
          </div>
        </div>

        {/* Right Column: Visual Element */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-primary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          <div className="relative z-10 bg-slate-900 border-2 border-primary/30 p-2 rounded-xl rotate-3 hover:rotate-0 transition-all duration-500 shadow-[0_0_30px_rgba(6,249,249,0.15)] group">
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary z-20"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary z-20"></div>

            <div className="relative overflow-hidden rounded-lg bg-slate-800 aspect-[4/3] flex items-center justify-center p-4">
              <h2 className="text-6xl font-black text-slate-700 transform -rotate-12 opacity-50 select-none tracking-tighter">ENGAGE_X</h2>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLevel;
