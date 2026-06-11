# 🏗️ Repository Analysis - Meeting Summary Agent

## Project Overview

The Meeting Summary Agent is an AI-powered application that automatically analyzes meeting transcripts and generates structured summaries using Google's Gemini AI model.

The application extracts key information from meeting discussions and organizes it into:

* Meeting Summary
* Action Items
* Task Owners

The generated summary is then stored in:

* A text file for easy access
* A SQLite database for persistence

---

# 📂 Project Structure

```text
meeting-summary-agent/
│
├── app.py
├── database.py
├── .env
├── repo-analysis.md
├── meeting_summaries.db
│
├── transcripts/
│   └── sample_meeting.txt
│
├── outputs/
│   └── meeting_summary.txt
│
└── screenshots/
```

---

# 🏛️ High-Level Architecture

```text
Meeting Transcript
        ↓
Read File
        ↓
Gemini AI
        ↓
Generate Summary
        ↓
Save Summary
      ↙     ↘
TXT File   SQLite DB
```

The application follows a simple workflow:

1. Read meeting transcript
2. Create AI prompt
3. Send prompt to Gemini
4. Receive generated summary
5. Save summary to text file
6. Save summary to SQLite database

---

# 🚀 Application Flow

## Step 1: Load Environment Variables

```python
from dotenv import load_dotenv

load_dotenv()
```

Loads the Gemini API key from the `.env` file.

Example:

```env
GEMINI_API_KEY=your_api_key
```

---

## Step 2: Configure Gemini AI

```python
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)
```

Initializes authentication with Gemini.

```python
model = genai.GenerativeModel(
    "gemini-2.5-flash"
)
```

Creates the AI model instance.

---

## Step 3: Read Transcript

Function:

```python
def read_transcript(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()
```

Reads the meeting transcript from:

```text
transcripts/sample_meeting.txt
```

Example transcript:

```text
Hetvi: Frontend testing will finish by Friday.
Nauman: I'll handle deployment.
```

---

## Step 4: Create Prompt

The transcript is inserted into a prompt:

```python
prompt = f"""
You are a meeting assistant.

Analyze this meeting transcript.

Provide:

1. Meeting Summary
2. Action Items
3. Owners

Transcript:

{transcript}
"""
```

This instructs Gemini to return structured output.

---

## Step 5: Generate Summary

```python
response = model.generate_content(prompt)
```

Workflow:

```text
Transcript
     ↓
Prompt
     ↓
Gemini AI
     ↓
Generated Summary
```

Example response:

```text
Meeting Summary:
Dashboard launch discussed.

Action Items:
- Complete testing

Owners:
- Hetvi
```

---

## Step 6: Save Summary to Text File

The generated response is stored in:

```text
outputs/meeting_summary.txt
```

Code:

```python
with open(output_path, "w") as f:
    f.write(summary)
```

Benefits:

* Easy to read
* Easy to share
* Useful for reports

---

## Step 7: Save Summary to Database

The summary is also stored in SQLite.

Function call:

```python
save_to_db(summary)
```

This improves persistence and allows future querying.

---

# 🗄️ Database Layer

File:

```text
database.py
```

Responsible for all database operations.

---

## Create Database Connection

```python
conn = sqlite3.connect(
    "meeting_summaries.db"
)
```

Creates or opens:

```text
meeting_summaries.db
```

---

## Create Table

```python
cursor.execute("""
CREATE TABLE IF NOT EXISTS summaries(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    summary TEXT
)
""")
```

Table Structure:

| id | summary         |
| -- | --------------- |
| 1  | Meeting Summary |
| 2  | Meeting Summary |

---

## Insert Summary

```python
cursor.execute(
    "INSERT INTO summaries(summary) VALUES(?)",
    (summary,)
)
```

Stores each generated summary as a new database record.

---

## Commit Changes

```python
conn.commit()
```

Writes changes permanently to disk.

---

## Close Connection

```python
conn.close()
```

Releases database resources.

---

# 🔄 Complete Data Flow

```text
sample_meeting.txt
          │
          ▼
      app.py
          │
          ▼
   Read Transcript
          │
          ▼
    Create Prompt
          │
          ▼
     Gemini AI
          │
          ▼
 Generated Summary
      │         │
      ▼         ▼
 TXT File   SQLite DB
```

---

# 🧩 Components and Responsibilities

## app.py

Responsibilities:

* Load API key
* Read transcript
* Create prompt
* Call Gemini AI
* Save summary
* Display output

This file acts as the main controller of the application.

---

## database.py

Responsibilities:

* Create database connection
* Create table
* Insert summary
* Commit changes
* Close connection

This file handles only database-related logic.

---

# 🏗️ Design Pattern Used

The project follows the **Separation of Concerns** principle.

### app.py

Handles:

* Business Logic
* AI Processing
* File Handling

### database.py

Handles:

* Data Storage
* Database Operations

Benefits:

* Easier maintenance
* Better scalability
* Cleaner code organization

---

# 📈 Strengths of the Current Design

* Simple architecture
* Easy to understand
* Modular design
* Persistent storage
* AI-powered automation
* Minimal dependencies

---

# ⚠️ Current Limitations

* Processes only one transcript at a time
* No web interface
* No timestamp tracking
* No transcript upload functionality
* No authentication

---

# 🚀 Future Enhancements

Possible improvements:

```text
meeting-summary-agent/
│
├── app.py
├── database.py
│
├── services/
│   ├── gemini_service.py
│   └── summary_service.py
│
├── api/
│   └── routes.py
│
├── tests/
│
├── outputs/
└── transcripts/
```

Future Features:

* FastAPI backend
* Streamlit dashboard
* PDF export
* Email notifications
* Slack integration
* Timestamp support
* Multi-user support
* Search functionality

---

# 📌 Conclusion

The Meeting Summary Agent successfully demonstrates how Generative AI can automate meeting documentation. The application reads meeting transcripts, generates structured summaries using Gemini AI, and stores the results in both text files and a SQLite database.

The project follows a clean and modular architecture, making it easy to maintain, extend, and evolve into a production-ready solution in future iterations.
