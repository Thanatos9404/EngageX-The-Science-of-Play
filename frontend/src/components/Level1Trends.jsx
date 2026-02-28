import React from 'react';

const Level1Trends = ({ data, apiUrl }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 border-t border-primary/20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono text-xl font-bold">[ LEVEL 01 ]</span>
          <div className="h-px bg-primary/30 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">Engagement Over Time</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-background-dark/80 border border-slate-700 rounded-lg p-6 backdrop-blur">
              <h3 className="text-primary font-mono font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">analytics</span>
                Trend Analysis
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                We created a composite <span className="text-white font-bold">Engagement Score</span> by scaling fundamentally disparate metrics (Log(Playtime), Log(Peak CCU), Total Reviews).
                Factoring in standard deviations, we observe the macro trends in player retention over the past two decades, with a clear upward vector post-2015.
              </p>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded text-sm text-primary font-mono">
                &gt; INSIGHT_LOG: {data?.trend_insight || "Analyzing temporal shifts with 3-year rolling averages..."}
              </div>
            </div>

            <div className="bg-background-dark/80 border border-slate-700 rounded-lg p-6 backdrop-blur">
              <img
                src={`${apiUrl}/api/assets/owner_impact.png`}
                alt="Audience Size vs Engagement"
                className="w-full h-auto rounded border border-slate-700"
              />
              <p className="text-slate-400 text-sm mt-4 italic text-center">
                Engagement scales non-linearly with audience size. Core and Hit tiers see dramatically higher sustained attention than Niche titles.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-background-dark border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-slate-500 text-xs font-mono">temporal_analysis.exe</span>
              </div>
              <img
                src={`${apiUrl}/api/assets/time_series.png`}
                alt="Time Series of Engagement"
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Level1Trends;
