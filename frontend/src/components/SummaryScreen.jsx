```javascript
import React from 'react';

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
                            Games are definitively more engineered for retention today. While free-to-play economics capture massive outliers, <i>structural ecosystem design</i> (pricing strategy coupled with sustained content delivery via DLCs) is the dominant predictor of an application's lifespan.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 relative shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-green to-transparent opacity-50"></div>
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                             <span className="material-symbols-outlined text-accent-green">engineering</span>
                             Key Drivers
                         </h3>
                         <ul className="space-y-4 text-slate-300">
                             <li className="flex items-start gap-3">
                                 <span className="text-accent-green font-bold">»</span> Outlier generation relies on low/zero barriers to entry.
                             </li>
                             <li className="flex items-start gap-3">
                                 <span className="text-accent-green font-bold">»</span> DLC density linearly expands the attention lifecycle.
                             </li>
                             <li className="flex items-start gap-3">
                                 <span className="text-accent-green font-bold">»</span> Genre fundamentally bounds expected engagement ceilings.
                             </li>
                         </ul>
                    </div>
                </div>

                {/* Top 20 Interactive Table */}
                {data?.top_20_games && (
                    <div className="mb-20">
                         <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                             <span className="material-symbols-outlined text-primary">leaderboard</span>
                             Top 20 Engaging Titles
                         </h3>
                         <div className="overflow-x-auto bg-slate-900 border border-slate-700 rounded">
                             <table className="w-full text-left text-sm text-slate-400">
                                 <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                                     <tr>
                                         <th scope="col" className="px-6 py-3 font-mono">Rank</th>
                                         <th scope="col" className="px-6 py-3 font-mono">Title</th>
                                         <th scope="col" className="px-6 py-3 font-mono">Year</th>
                                         <th scope="col" className="px-6 py-3 font-mono text-right">Eng. Score</th>
                                         <th scope="col" className="px-6 py-3 font-mono text-right">Avg Playtime</th>
                                         <th scope="col" className="px-6 py-3 font-mono text-right">Reviews</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {data.top_20_games.map((game, index) => (
                                         <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                             <td className="px-6 py-4 font-mono text-primary font-bold">#{index + 1}</td>
                                             <td className="px-6 py-4 font-bold text-white truncate max-w-[200px]" title={game.name}>{game.name}</td>
                                             <td className="px-6 py-4">{game.release_year}</td>
                                             <td className="px-6 py-4 text-right font-mono text-accent-green">{game.engagement_score.toFixed(1)}</td>
                                             <td className="px-6 py-4 text-right font-mono">{(game.average_playtime_forever / 60).toFixed(0)}h</td>
                                             <td className="px-6 py-4 text-right font-mono">{game.num_reviews_total.toLocaleString()}</td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                    </div>
                )}

                <div className="flex justify-center mt-12 mb-12">
                    <a 
                        href="/EngageX_Analysis.ipynb" 
                        download
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-slate-800 border-2 border-primary rounded hover:bg-primary/20 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full opacity-20"></div>
                        <span className="flex items-center gap-3 relative z-10 font-mono tracking-widest text-sm uppercase">
                            <span className="material-symbols-outlined group-hover:animate-bounce">terminal</span>
                            Download Full Notebook
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SummaryScreen;
```
