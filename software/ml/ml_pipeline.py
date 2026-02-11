import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import pandas as pd
import psycopg2
from config import DB_CONFIG

from datetime import datetime
from feature_engineering import create_features
from recommendation_engine import generate_recommendations

def get_connection():
    return psycopg2.connect(**DB_CONFIG)

def load_emission_data():
    query = """
    SELECT user_id, date, resource_type, quantity, co2_emission
    FROM daily_emissions;
    """
    conn = get_connection()
    df = pd.read_sql(query, conn)
    conn.close()
    return df

def save_recommendations(recommendations):
    conn = get_connection()
    cur = conn.cursor()

    for rec in recommendations:
        cur.execute("""
            INSERT INTO recommendations (user_id, category, message, severity, generated_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            rec["user_id"],
            rec["category"],
            rec["message"],
            rec["severity"],
            datetime.now()
        ))

    conn.commit()
    cur.close()
    conn.close()
if __name__ == "__main__":
    raw_df = load_emission_data()
    features_df = create_features(raw_df)
    recommendations = generate_recommendations(features_df)
    save_recommendations(recommendations)

    print("✅ ML pipeline executed successfully")
