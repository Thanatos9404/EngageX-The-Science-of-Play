function simulateEngagement(price, dlcCount, releaseYear, metacritic) {
  let score = 50;

  if (dlcCount === 0) score -= 8;
  else if (dlcCount <= 3) score += 2;
  else if (dlcCount <= 10) score += 12;
  else if (dlcCount <= 30) score += 20;
  else score += 28;

  if (metacritic >= 90) score += 15;
  else if (metacritic >= 80) score += 8;
  else if (metacritic >= 70) score += 0;
  else if (metacritic >= 50) score -= 12;
  else score -= 25;

  if (price === 0) {
    if (metacritic >= 80) score += 12;
    else score -= 15;
  } else if (price >= 40) {
    score += 5;
  }

  if (releaseYear >= 2020) score += 4;
  else if (releaseYear <= 2013) score -= 4;

  const noise = (Math.sin(price * 7.1 + dlcCount * 3.3 + metacritic) * 2.0);
  score += noise;

  return Math.min(100, Math.max(0, Math.round(score * 10) / 10));
}

const cases = [
  [20, 0, 2026, 75],
  [0, 50, 2026, 75],
  [0, 100, 2026, 98],
  [150, 100, 2026, 98],
  [60, 0, 2026, 98],
  [60, 0, 2026, 10]
];

for (let c of cases) {
  console.log(`Inputs ${c}: ${simulateEngagement(c[0], c[1], c[2], c[3])}`);
}
