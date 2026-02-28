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

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            DLC-Heavy Titles Survive Twice as Long as Premium Standalone Games.
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl mb-12">
            Across 8,010 Steam titles, aggregate engagement has remained statistically flat — but the structure of retention has fundamentally shifted.
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

        {/* Right Column: Visual Element / The Verdict */}
        <div className="lg:col-span-5 relative flex flex-col justify-center mt-12 lg:mt-0">
          {data?.survival_stats ? (
            <div className="bg-slate-900 border border-slate-700/50 p-8 rounded-xl relative shadow-2xl backdrop-blur-md overflow-hidden group hover:border-accent-green/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-16 h-16 rounded-full border border-accent-green/20 flex items-center justify-center font-mono text-accent-green font-bold text-xl bg-accent-green/5">
                  {data.survival_stats.half_lives['DLC-Heavy']}y
                </div>
              </div>
              <div className="text-xs text-primary font-bold tracking-widest uppercase mb-4 opacity-80">Cohort Mortality (Half-Life)</div>
              <h2 className="text-3xl font-black text-white leading-tight mb-4">
                Live Service Ecosystems Resist Decay
              </h2>
              <div className="space-y-3 font-mono text-sm text-slate-300 mb-6">
                <p className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Buy-to-Play</span> <span className="text-white">{data.survival_stats.half_lives['Buy-to-Play']} Years</span>
                </p>
                <p className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Free-to-Play</span> <span className="text-accent-green font-bold">{data.survival_stats.half_lives['Free-to-Play']} Years</span>
                </p>
                <p className="flex justify-between pb-2">
                  <span className="text-primary italic">Log-Rank Approx (χ²)</span> <span className="text-primary font-bold">{data.survival_stats.chi2}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="mb-2 text-xs font-mono text-slate-500">AGGREGATE NULL RESULT</div>
                <div className="flex flex-col gap-1 text-sm text-slate-400">
                  <div><span className="text-slate-300 font-bold">Δ = +1.3%</span> (95% CI [-0.8%, +3.4%])</div>
                  <div>Pre-2015: <span className="text-white">40.76</span> | Post-2015: <span className="text-white">41.27</span></div>
                  <div>Cohen's d = 0.04</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 bg-slate-900 border-2 border-primary/30 p-2 rounded-xl rotate-3 shadow-[0_0_30px_rgba(6,249,249,0.15)] group">
              <div className="relative overflow-hidden rounded-lg bg-slate-800 aspect-[4/3] flex items-center justify-center p-4">
                <h2 className="text-6xl font-black text-slate-700 transform -rotate-12 opacity-50 select-none tracking-tighter">ENGAGE_X</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroLevel;
