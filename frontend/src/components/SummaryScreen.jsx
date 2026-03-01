import React from 'react';
import PlotlyChart from './PlotlyChart';

const SummaryScreen = ({ data, apiUrl }) => {
    return (
        <section className="min-h-screen relative px-6 py-20 border-t border-slate-800 bg-background-dark/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16 justify-center">
                    <div className="h-px bg-slate-700 flex-grow max-w-[100px]"></div>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider text-center">Mission Report</h2>
                    <div className="h-px bg-slate-700 flex-grow max-w-[100px]"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 relative shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-primary">gavel</span>
                            The Final Verdict
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-center text-lg">
                            The pursuit of infinite player engagement is not a zero-sum game, but rather a complex optimization problem. While free-to-play economics generate massive retention spikes, our Random Forest regression and PCA methodology confirm that <i>structural ecosystem design</i> (density of DLCs, core genre mechanics) dictates the baseline trajectory of a title's lifecycle.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 relative shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-green to-transparent opacity-50"></div>
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-accent-green">engineering</span>
                            Strategic Imperatives
                        </h3>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-accent-green font-bold">»</span> <span className="text-white font-medium">Pricing Anomalies:</span> Premium tiers do not guarantee superior attention spans; F2P models exhibit statistically significant (p &lt; 0.05) retention advantages.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent-green font-bold">»</span> <span className="text-white font-medium">Fatigue Rejected:</span> High engagement intensity does not produce systematic community fatigue. Sentiment degradation is not structurally driven by aggressive retention mechanics.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent-green font-bold">»</span>
                                <p className="text-slate-300 text-sm">
                                    <strong>Predictability:</strong> ML models indicate structural baseline variables (Price Point, Target Metacritic, Release Era) are the highest-weight features in predicting long-term retention potential, overriding post-launch community sentiment.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Top 20 Interactive Chart */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">leaderboard</span>
                        Top 20 Engagement Anomalies
                    </h3>
                    <div className="bg-slate-900 border border-slate-700 rounded p-2 min-h-[500px]">
                        <PlotlyChart
                            chartName="top_20_games"
                            title=""
                            className="w-full h-auto border-none bg-transparent p-0"
                        />
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <a
                        href="https://colab.research.google.com/github/Thanatos9404/EngageX-The-Science-of-Play/blob/main/frontend/public/EngageX_Analysis.ipynb"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">data_object</span>
                        Download Full Notebook
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SummaryScreen;
