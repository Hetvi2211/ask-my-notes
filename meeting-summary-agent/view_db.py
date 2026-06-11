import sqlite3

conn = sqlite3.connect("meeting_summaries.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM summaries")

rows = cursor.fetchall()

print("\n===== DATABASE RECORDS =====\n")

for row in rows:
    print(row)

conn.close()