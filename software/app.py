from flask import Flask, jsonify
from db import get_db_connection

app = Flask(__name__)

@app.route("/")
def home():
    return {"status": "Flask backend connected successfully"}

@app.route("/users")
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT user_id, city, household_size FROM users LIMIT 10;")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    users = []
    for row in rows:
        users.append({
            "user_id": row[0],
            "city": row[1],
            "household_size": row[2]
        })

    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)
