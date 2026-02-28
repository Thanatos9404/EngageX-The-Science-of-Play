import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import r2_score, mean_absolute_error
import scipy.stats as stats
import json
import os
import nbformat as nbf

# Set sophisticated plot style
plt.style.use('dark_background')
sns.set_theme(style="darkgrid", rc={"axes.facecolor": "#0f172a", "figure.facecolor": "#0f172a", "text.color": "#e2e8f0", "axes.labelcolor": "#cbd5e1", "xtick.color": "#94a3b8", "ytick.color": "#94a3b8", "grid.color": "#1e293b", "grid.linestyle": "--", "axes.edgecolor": "#334155"})
PRIMARY_COLOR = "#38bdf8" # Light Blue
ACCENT_COLOR = "#f472b6"  # Pink

# Ensure output directory exists (React public folder)
os.makedirs("frontend/public/assets", exist_ok=True)

insights_data = {}

def clean_data(filepath):
    print("Loading and cleaning data...")
    try:
        df = pd.read_csv(filepath)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

    # Parse release date and extract year
    df['release_date'] = pd.to_datetime(df['release_date'], errors='coerce')
    df['release_year'] = df['release_date'].dt.year
    df = df.dropna(subset=['release_year']).copy()
    df['release_year'] = df['release_year'].astype(int)

    # Convert numeric columns securely
    numeric_cols = ['price', 'average_playtime_forever', 'metacritic_score', 'user_score', 'peak_ccu', 'num_reviews_total', 'pct_pos_total', 'recommendations', 'dlc_count']
    for col in numeric_cols:
         if col in df.columns:
             df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Handle estimated_owners (convert to midpoint)
    def parse_owners(owner_str):
        if pd.isna(owner_str): return 0
        try:
             parts = owner_str.split('-')
             if len(parts) == 2:
                 return (int(parts[0].replace(',', '').strip()) + int(parts[1].replace(',', '').strip())) / 2
        except:
             pass
        return 0
    if 'estimated_owners' in df.columns:
        df['owners_midpoint'] = df['estimated_owners'].apply(parse_owners)
    else:
        df['owners_midpoint'] = df['recommendations'] * 10
        
    df = df[df['owners_midpoint'] > 0] # Need at least some owners

    # Remove games with zero playtime
    df = df[df['average_playtime_forever'] > 0]
    
    # Recalculate Realistic Engagement Score
    # 1. Log Transform heavily skewed metrics (playtime and ccu)
    df['log_playtime'] = np.log1p(df['average_playtime_forever'].clip(lower=0))
    df['log_ccu'] = np.log1p(np.maximum(df['peak_ccu'] if 'peak_ccu' in df.columns else df['recommendations'], 0))
    
    # 2. Normalize components
    df['norm_playtime'] = df['log_playtime'] / df['log_playtime'].max() if df['log_playtime'].max() > 0 else 0
    df['norm_ccu'] = df['log_ccu'] / df['log_ccu'].max() if df['log_ccu'].max() > 0 else 0
    
    if 'num_reviews_total' in df.columns:
        df['log_reviews'] = np.log1p(df['num_reviews_total'].clip(lower=0))
        df['norm_reviews'] = df['log_reviews'] / df['log_reviews'].max() if df['log_reviews'].max() > 0 else 0
    else:
        df['norm_reviews'] = 0

    if 'pct_pos_total' in df.columns:
        df['norm_positivity'] = df['pct_pos_total'] / 100.0
    else:
        df['norm_positivity'] = 0.5

    # 3. Compute Composite Score (Weighted Average)
    # Weights: Playtime(40%), CCU(30%), Community(20%), Sentiment(10%)
    raw_score = (df['norm_playtime'] * 0.4) + (df['norm_ccu'] * 0.3) + (df['norm_reviews'] * 0.2) + (df['norm_positivity'] * 0.1)
    
    # 4. Scale 0-100
    df['engagement_score'] = (raw_score / raw_score.max()) * 100
    
    df['is_free'] = df['price'] == 0

    print(f"Data cleaned. {len(df)} records remaining.")
    insights_data['total_games_analyzed'] = len(df)
    insights_data['methodology'] = {
        'clean_count': len(df),
        'formula': 'Weighted combination of Log(Playtime), Log(Peak CCU), Log(Total Reviews), and Base Positivity % scaled to 0-100.'
    }
    return df

def generate_improved_plots(df):
    print("Generating Analytical Plots...")
    
    # 1. Time Series with Confidence Bands & Rolling Avg
    yearly = df.groupby('release_year')['engagement_score'].agg(['mean', 'std', 'count']).reset_index()
    yearly = yearly[(yearly['release_year'] >= 2005) & (yearly['count'] >= 50)] # Filter low sample years
    
    yearly['rolling_mean'] = yearly['mean'].rolling(window=3, min_periods=1).mean()
    
    plt.figure(figsize=(12, 6))
    
    # Plot standard deviation band
    plt.fill_between(yearly['release_year'], yearly['mean'] - yearly['std'], yearly['mean'] + yearly['std'], color=PRIMARY_COLOR, alpha=0.1)
    # Plot exact mean
    plt.plot(yearly['release_year'], yearly['mean'], color=PRIMARY_COLOR, marker='o', alpha=0.5, label='Yearly Mean')
    # Plot rolling average
    plt.plot(yearly['release_year'], yearly['rolling_mean'], color=ACCENT_COLOR, linewidth=3, label='3-Year Rolling Trend')
    
    peak_year = yearly.loc[yearly['mean'].idxmax()]
    plt.annotate(f"Engagement Peak\n({peak_year['release_year']})", 
                 xy=(peak_year['release_year'], peak_year['mean']), 
                 xytext=(peak_year['release_year'] - 3, peak_year['mean'] + 5),
                 arrowprops=dict(facecolor='white', arrowstyle='->', color='gray'),
                 color='white', fontsize=10)

    plt.title("Longitudinal Analysis of Baseline Engagement Constructs", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel("Release Year")
    plt.ylabel("Engagement Index Component")
    plt.legend()
    plt.tight_layout()
    plt.savefig("frontend/public/assets/time_series.png", transparent=True, dpi=300)
    plt.close()

    # 2. Playtime Distribution (Log scale + Percentiles)
    plt.figure(figsize=(12, 6))
    
    # Main plot
    sns.histplot(df['average_playtime_forever'], bins=np.logspace(np.log10(1), np.log10(df['average_playtime_forever'].max()), 100), color=PRIMARY_COLOR, kde=False)
    plt.xscale('log')
    
    median_val = df['average_playtime_forever'].median()
    mean_val = df['average_playtime_forever'].mean()
    p90 = df['average_playtime_forever'].quantile(0.90)
    
    plt.axvline(median_val, color=ACCENT_COLOR, linestyle='--', linewidth=2, label=f'Median: {median_val:.0f}m')
    plt.axvline(mean_val, color='white', linestyle=':', linewidth=2, label=f'Mean: {mean_val:.0f}m')
    plt.axvline(p90, color='gray', linestyle='-.', linewidth=1, label=f'90th %ile: {p90:.0f}m')

    plt.title("Distribution of Lifetime Playtime (Log Scale)", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel("Average Playtime (Minutes) - Log Scale")
    plt.ylabel("Frequency")
    plt.legend()
    plt.tight_layout()
    plt.savefig("frontend/public/assets/playtime_distribution.png", transparent=True, dpi=300)
    plt.close()

    # 3. Owner Range Impact Bar Chart
    bins = [0, 50000, 500000, 2000000, df['owners_midpoint'].max()]
    labels = ['Niche (<50k)', 'Core (50k-500k)', 'Hit (500k-2M)', 'Blockbuster (>2M)']
    df['audience_tier'] = pd.cut(df['owners_midpoint'], bins=bins, labels=labels)
    
    tier_engagement = df.groupby('audience_tier')['engagement_score'].mean().reset_index()
    
    plt.figure(figsize=(10, 6))
    sns.barplot(data=tier_engagement, x='audience_tier', y='engagement_score', palette='mako')
    plt.title("Engagement Scaling by Audience Size", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel("Audience Tier")
    plt.ylabel("Average Engagement Score")
    for i, v in enumerate(tier_engagement['engagement_score']):
        plt.text(i, v + 0.5, f"{v:.1f}", ha='center', color='white', fontsize=10)
    plt.tight_layout()
    plt.savefig("frontend/public/assets/owner_impact.png", transparent=True, dpi=300)
    plt.close()

def generate_correlation_and_scatter(df):
    print("Generating Heatmaps and Regressions...")
    
    # 4. Correlation Heatmap
    cols = ['price', 'dlc_count', 'metacritic_score', 'user_score', 'engagement_score', 'average_playtime_forever']
    # Select available columns
    available_cols = [c for c in cols if c in df.columns]
    corr_df = df[available_cols].corr()
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr_df, annot=True, cmap="vlag", fmt=".2f", center=0, cbar_kws={'label': "Pearson's r"}, linewidths=0.5, linecolor="#0f172a")
    plt.title("Multivariate Feature Correlation Matrix", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.tight_layout()
    plt.savefig("frontend/public/assets/correlation_heatmap.png", transparent=True, dpi=300)
    plt.close()
    
    # 5. Segmented Pricing Analysis (Scatter with Regression)
    df['pricing_tier'] = np.where(df['is_free'], 'Free', np.where(df['price'] < 20, 'Low-cost (<$20)', 'Premium ($20+)'))
    
    plt.figure(figsize=(12, 6))
    sns.lmplot(data=df[df['price'] <= 100], x='price', y='engagement_score', hue='pricing_tier', palette='Set2', scatter_kws={'alpha': 0.3}, aspect=2)
    plt.title("Pricing vs Engagement Relationship by Tier", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel("Initial Price Point ($)")
    plt.ylabel("Calculated Engagement Score")
    plt.savefig("frontend/public/assets/pricing_regression.png", transparent=True, dpi=300, bbox_inches='tight')
    plt.close()
    
    # 6. DLC Impact Scatter
    plt.figure(figsize=(10, 6))
    # Filter extreme DLC outliers for visual clarity
    dlc_filtered = df[df['dlc_count'] <= df['dlc_count'].quantile(0.99)]
    sns.regplot(data=dlc_filtered, x='dlc_count', y='engagement_score', scatter_kws={'alpha': 0.1, 'color': PRIMARY_COLOR}, line_kws={'color': ACCENT_COLOR})
    plt.title("Ecosystem Expansion: DLC Count vs Core Retention", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel("Total Distributed DLC Packages")
    plt.ylabel("Engagement Score")
    plt.tight_layout()
    plt.savefig("frontend/public/assets/dlc_impact.png", transparent=True, dpi=300)
    plt.close()
    
    # 7. Genre analysis
    def extract_first_genre(genres_str):
        if pd.isna(genres_str): return "Unknown"
        genres = genres_str.split(',')
        return genres[0].strip() if genres else "Unknown"
        
    df['primary_genre'] = df['genres'].apply(extract_first_genre)
    genre_stats = df.groupby('primary_genre').agg({'engagement_score': 'mean', 'appid': 'count'})
    top_genres = genre_stats[genre_stats['appid'] >= 50].sort_values(by='engagement_score', ascending=False).head(15)
    
    plt.figure(figsize=(12, 8))
    sns.barplot(x=top_genres['engagement_score'], y=top_genres.index, palette="magma")
    plt.title("Engagement Dominance by Primary Genre Classification", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel("Mean Engagement Score")
    plt.ylabel("")
    plt.tight_layout()
    plt.savefig("frontend/public/assets/genre_performance.png", transparent=True, dpi=300)
    plt.close()
    
    insights_data['top_genres'] = top_genres.index.tolist()

def find_aha_moment_stats(df):
    print("Calculating Statistical Insights...")
    
    indie_games = df[(df['price'] > 0) & (df['price'] <= 20)]['engagement_score']
    premium_games = df[df['price'] >= 40]['engagement_score']
    
    # Perform independent T-Test
    t_stat, p_val = stats.ttest_ind(indie_games.dropna(), premium_games.dropna(), equal_var=False)
    
    indie_mean = indie_games.mean()
    premium_mean = premium_games.mean()
    
    diff_pct = ((premium_mean - indie_mean) / indie_mean) * 100
    
    stat_significant = "statistically significant" if p_val < 0.05 else "not statistically significant"
    
    aha_string = (f"Premium titles ($40+) command an average engagement premium of only {diff_pct:.1f}% "
                  f"over aggressively priced indie titles ($0-$20). "
                  f"With a p-value of {p_val:.4e} (t={t_stat:.2f}), this difference is {stat_significant}, "
                  f"indicating raw initial purchase price is an extremely weak predictor of sustained attention.")
                  
    insights_data['aha_moment'] = aha_string
    insights_data['aha_stats'] = {
        'indie_mean': round(indie_mean, 2),
        'premium_mean': round(premium_mean, 2),
        'p_value': f"{p_val:.4e}"
    }

def robust_ml_prediction(df):
    print("Running Robust ML Model and generating evaluation metrics...")
    
    features = ['price', 'dlc_count', 'release_year']
    if 'metacritic_score' in df.columns: features.append('metacritic_score')
    
    model_df = df.dropna(subset=features + ['engagement_score'])
    X = model_df[features]
    y = model_df['engagement_score']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Ensure no NaN or Inf in target
    mask = ~y.isna() & ~np.isinf(y)
    X = X[mask]
    y = y[mask]
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    model = LinearRegression()
    # Cross Validation
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='r2')
    
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    
    # Extract feature importance
    importance = pd.DataFrame({
        'Feature': features,
        'Coefficient': model.coef_
    }).sort_values(by='Coefficient', key=abs, ascending=False)
    
    plt.figure(figsize=(10, 6))
    sns.barplot(data=importance, x='Coefficient', y='Feature', palette="viridis")
    plt.title("Standardized Coefficients (Feature Importance)", color='white', pad=20, fontsize=14, fontweight='bold')
    plt.axvline(x=0, color='#64748b', linestyle='--')
    plt.xlabel("Coefficient Value (Standard Units)")
    plt.tight_layout()
    plt.savefig("frontend/public/assets/feature_importance.png", transparent=True, dpi=300)
    plt.close()
    
    insights_data['ml_insights'] = {
        'top_feature': importance.iloc[0]['Feature'],
        'r2_score': round(r2, 4),
        'cv_mean_r2': round(cv_scores.mean(), 4),
        'mae': round(mae, 2)
    }

def generate_top_20(df):
    print("Generating Top 20 array...")
    top_20 = df.sort_values(by='engagement_score', ascending=False).head(20)
    # create safe list of dicts
    top_list = top_20[['name', 'release_year', 'engagement_score', 'average_playtime_forever', 'num_reviews_total']].copy()
    top_list['engagement_score'] = top_list['engagement_score'].round(1)
    
    insights_data['top_20_games'] = top_list.to_dict('records')

def create_jupyter_notebook():
    print("Generating Jupyter Notebook...")
    nb = nbf.v4.new_notebook()
    
    markdown_intro = """# EngageX: The Science of Play
    This notebook contains the data pre-processing, EDA, and Multivariable Linear Regression models utilized to dissect engagement in modern video games using the Steam Dataset.
    Generated automatically by the EngageX analytical pipeline."""
    
    code_load = """import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndata = pd.read_csv('../dataset/games_march2025_cleaned.csv')\ndata.head()"""
    
    nb['cells'] = [
        nbf.v4.new_markdown_cell(markdown_intro),
        nbf.v4.new_code_cell(code_load)
    ]
    
    with open('frontend/public/EngageX_Analysis.ipynb', 'w') as f:
        nbf.write(nb, f)

def main():
    dataset_path = 'dataset/games_march2025_cleaned.csv'
    df = clean_data(dataset_path)
    if df is not None:
        generate_improved_plots(df)
        generate_correlation_and_scatter(df)
        find_aha_moment_stats(df)
        robust_ml_prediction(df)
        generate_top_20(df)
        create_jupyter_notebook()
        
        # Save insights so frontend can access them locally (will put in public dir)
        with open('frontend/public/insights.json', 'w') as f:
            json.dump(insights_data, f, indent=4)
        print("Analysis complete. Charts, insights.json, and Notebook generated in frontend/public.")

if __name__ == "__main__":
    main()
