from model_utils import detect_high_usage

def generate_recommendations(features_df):
    return detect_high_usage(features_df)
