def detect_high_usage(features_df):
    recommendations = []

    for resource in features_df["resource_type"].unique():
        resource_df = features_df[features_df["resource_type"] == resource]
        threshold = resource_df["avg_daily_emission"].quantile(0.75)

        high_users = resource_df[
            resource_df["avg_daily_emission"] > threshold
        ]

        for _, row in high_users.iterrows():
            recommendations.append({
                "user_id": row["user_id"],
                "category": resource,
                "severity": "High",
                "message": f"High {resource} emissions detected. Consider reducing usage."
            })

    return recommendations
