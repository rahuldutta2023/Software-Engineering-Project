import pandas as pd

def create_features(df):
    df["date"] = pd.to_datetime(df["date"])

    features = (
        df.groupby(["user_id", "resource_type"])
        .agg(
            avg_daily_emission=("co2_emission", "mean"),
            max_daily_emission=("co2_emission", "max"),
            total_emission=("co2_emission", "sum")
        )
        .reset_index()
    )

    return features
