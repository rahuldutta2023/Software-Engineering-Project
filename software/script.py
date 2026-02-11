import pandas as pd
import numpy as np
import random
import os
from datetime import datetime, timedelta

# ---------------- CONFIG ----------------
NUM_USERS = 500
NUM_DAYS = 180
START_DATE = datetime(2025, 1, 1)
BASE_PATH = "data/"
os.makedirs(BASE_PATH, exist_ok=True)

cities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Hyderabad", "Pune", "Kolkata"]
fuel_types = ["Petrol", "Diesel", "CNG"]
gas_types = ["LPG", "PNG"]

np.random.seed(42)

# ---------------- USERS ----------------
users = []
for i in range(1, NUM_USERS + 1):
    users.append({
        "user_id": i,
        "full_name": f"User_{i}",
        "email": f"user{i}@example.com",
        "password_hash": "hashed_password",
        "role": "household",
        "city": random.choice(cities),
        "household_size": random.randint(1, 6),
        "created_at": START_DATE - timedelta(days=random.randint(0, 365))
    })
users_df = pd.DataFrame(users)

# ---------------- EMISSION FACTORS ----------------
emission_factors = [
    ("Electricity", "kWh", 0.82),
    ("LPG", "kg", 2.98),
    ("PNG", "kg", 2.20),
    ("Petrol", "liter", 2.31),
    ("Diesel", "liter", 2.68),
    ("CNG", "kg", 2.75),
    ("Water", "liter", 0.0003),
]

emission_factors_df = pd.DataFrame(emission_factors,
    columns=["resource_type", "unit", "co2_per_unit"])
emission_factors_df["factor_id"] = range(1, len(emission_factors_df) + 1)
emission_factors_df["last_updated"] = datetime.now().date()

# ---------------- DAILY TABLES ----------------
electricity, gas, water, fuel, emissions = [], [], [], [], []
dates = [START_DATE + timedelta(days=i) for i in range(NUM_DAYS)]

for _, u in users_df.iterrows():
    for d in dates:
        # Electricity
        kwh = np.random.uniform(2, 5) if u.household_size <= 2 else \
              np.random.uniform(5, 10) if u.household_size <= 4 else \
              np.random.uniform(10, 18)

        electricity.append([
            len(electricity)+1, u.user_id, d, round(kwh,2),
            round(random.uniform(1000, 5000),2),
            random.choice(["Grid","Solar"]), d
        ])
        emissions.append([u.user_id, d, "Electricity", kwh, kwh*0.82, d])

        # Water
        liters = np.random.uniform(200,900)
        water.append([
            len(water)+1, u.user_id, d, round(liters,2),
            random.choice(["Municipal","Borewell"]), d
        ])
        emissions.append([u.user_id, d, "Water", liters, liters*0.0003, d])

        # Gas
        gas_type = random.choice(gas_types)
        qty = np.random.uniform(0.2,0.8)
        gas.append([
            len(gas)+1, u.user_id, d, gas_type, round(qty,3),
            random.choice(["Cooking","Heating"]), d
        ])
        factor = 2.98 if gas_type=="LPG" else 2.20
        emissions.append([u.user_id, d, gas_type, qty, qty*factor, d])

        # Fuel (not daily)
        if random.random() < 0.4:
            ftype = random.choice(fuel_types)
            fqty = np.random.uniform(0.5,3)
            fuel.append([
                len(fuel)+1, u.user_id, d, ftype, round(fqty,2),
                random.choice(["Bike","Car"]), d
            ])
            factor = {"Petrol":2.31,"Diesel":2.68,"CNG":2.75}[ftype]
            emissions.append([u.user_id, d, ftype, fqty, fqty*factor, d])

# ---------------- DATAFRAMES ----------------
electricity_df = pd.DataFrame(electricity,
    columns=["electricity_id","user_id","date","units_kwh",
             "meter_reading","source","created_at"])

gas_df = pd.DataFrame(gas,
    columns=["gas_id","user_id","date","gas_type",
             "quantity_kg","purpose","created_at"])

water_df = pd.DataFrame(water,
    columns=["water_id","user_id","date","liters_used",
             "source","created_at"])

fuel_df = pd.DataFrame(fuel,
    columns=["fuel_id","user_id","date","fuel_type",
             "quantity_liters","vehicle_type","created_at"])

daily_emissions_df = pd.DataFrame(emissions,
    columns=["user_id","date","resource_type",
             "quantity","co2_emission","calculated_at"])
daily_emissions_df.insert(0,"emission_id",range(1,len(daily_emissions_df)+1))

# ---------------- SUMMARY ----------------
summary_df = (
    daily_emissions_df
    .assign(period=lambda x: x["date"].dt.to_period("M"))
    .groupby(["user_id","period"])
    .agg(
        total_co2=("co2_emission","sum"),
        electricity_co2=("co2_emission",lambda x: x.sum()),
        gas_co2=("co2_emission",lambda x: x.sum()),
        fuel_co2=("co2_emission",lambda x: x.sum()),
        water_co2=("co2_emission",lambda x: x.sum())
    ).reset_index()
)
summary_df["summary_id"] = range(1,len(summary_df)+1)
summary_df["created_at"] = datetime.now()

# ---------------- RECOMMENDATIONS ----------------
recs = []
for uid in users_df.user_id:
    recs.append([
        uid,"Electricity",
        "Reduce electricity usage during peak hours",
        random.choice(["Low","Medium","High"]),
        datetime.now()
    ])
recommendations_df = pd.DataFrame(recs,
    columns=["user_id","category","message","severity","generated_at"])
recommendations_df.insert(0,"recommendation_id",
    range(1,len(recommendations_df)+1))

# ---------------- INCENTIVES ----------------
incentives_df = pd.DataFrame({
    "incentive_id": range(1,NUM_USERS+1),
    "user_id": users_df.user_id,
    "eco_points": np.random.randint(100,1000,NUM_USERS),
    "rank": range(1,NUM_USERS+1),
    "last_updated": datetime.now()
})

# ---------------- SAVE ----------------
users_df.to_csv(BASE_PATH+"users.csv",index=False)
electricity_df.to_csv(BASE_PATH+"electricity_consumption.csv",index=False)
gas_df.to_csv(BASE_PATH+"gas_consumption.csv",index=False)
water_df.to_csv(BASE_PATH+"water_consumption.csv",index=False)
fuel_df.to_csv(BASE_PATH+"fuel_consumption.csv",index=False)
emission_factors_df.to_csv(BASE_PATH+"emission_factors.csv",index=False)
daily_emissions_df.to_csv(BASE_PATH+"daily_emissions.csv",index=False)
summary_df.to_csv(BASE_PATH+"carbon_footprint_summary.csv",index=False)
recommendations_df.to_csv(BASE_PATH+"recommendations.csv",index=False)
incentives_df.to_csv(BASE_PATH+"incentives.csv",index=False)

print("✅ Synthetic dataset generated successfully.")
