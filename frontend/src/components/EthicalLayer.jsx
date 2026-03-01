import React from 'react';
import PlotlyChart from './PlotlyChart';

const EthicalLayer = ({ data }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 bg-background-dark border-t border-red-900/20">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-red-900/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-secondary font-mono text-xl font-bold">[ LEVEL 04 ]</span>
          <div className="h-px bg-red-900/50 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">The Cost of Retention</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl xl:col-span-1 border-t-secondary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-bold mb-4 font-mono text-slate-300 tracking-wider">FATIGUE TAX: <span className="text-secondary">REJECTED</span></h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              The "inevitable fatigue" narrative assumes highly engaging games suffer steep community backlash. By ranking games into Engagement Quartiles (Q1=Low, Q4=Extreme), we tested if negative sentiment rises with engagement.
            </p>
            <p className="text-slate-400 mb-6 leading-relaxed">
              <strong className="text-white text-sm">Why the Q1 peak?</strong> The bar chart shows Q1 (low-engagement titles) actually carries the highest negative review proportion. This is because Q1 is disproportionately populated by technically broken, abandoned, or underdelivered games that never achieved escape velocity.
            </p>
            <p className="text-secondary font-mono text-sm p-4 bg-secondary/10 border border-secondary/20 rounded">
              {data?.ethical_insight?.text || "Loading Kruskal-Wallis text..."}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Are Engagement Mechanics Creating Fatigue?</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              While peak concurrent users and infinite playtime loops are heralded as industry triumphs, the data reveals a secondary vector: <span className="text-red-400 font-bold">Review Volatility</span>.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              When divided into quartiles, we can test the prevailing industry narrative: do maximum-retention ecosystems inevitably incur community fatigue? By running a Kruskal-Wallis H-test across engagement bands, we quantify the true effect of playtime and retention optimization on review sentiment.
            </p>

            <div className="bg-red-950/30 border-l-4 border-red-500 p-6 rounded backdrop-blur">
              <p className="text-sm font-mono text-red-300 mb-2">CRITICAL_OBSERVATION</p>
              <p className="text-slate-200">
                {data?.ethical_insight?.text || "Evaluating significance... Kruskal-Wallis analysis across engagement quartiles reveals that the effect size (η²) is extremely small. The data firmly rejects the dramatic 'inevitable fatigue' narrative."}
              </p>
            </div>
            {data?.ethical_insight && (
              <div className="grid grid-cols-3 gap-4 mt-6 font-mono text-sm border-t border-slate-700 pt-4">
                <div>
                  <span className="text-slate-500 block text-xs mb-1">H-Statistic</span>
                  <span className="text-white font-bold">{data.ethical_insight.h_stat}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs mb-1">P-Value</span>
                  <span className="text-accent-green font-bold">{data.ethical_insight.p_val}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs mb-1">Effect Size (η²)</span>
                  <span className="text-white font-bold">{data.ethical_insight.eta2}</span>
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur group-hover:bg-red-500/40 transition duration-500"></div>
            <div className="relative bg-slate-900 border border-slate-700 p-2 rounded min-h-[400px]">
              <PlotlyChart
                chartName="fatigue_analysis"
                title=""
                className="w-full h-auto border-none bg-transparent p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthicalLayer;
