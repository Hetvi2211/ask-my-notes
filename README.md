# Meeting Summary Agent

## Overview

Meeting Summary Agent is a custom AI agent built using Python and Google Gemini API.

The agent reads a meeting transcript, analyzes the discussion, extracts important information, and generates:

* Meeting Summary
* Action Items
* Owners/Assignees

The generated summary is saved to a text file and stored in a SQLite database for future reference.

---

## Features

* Transcript Analysis using Gemini
* Meeting Summary Generation
* Action Item Extraction
* Owner Identification
* Save Summary to Text File
* Save Summary to SQLite Database
* Custom Agent Implementation (No Workflow Tools)

---

## Project Structure

meeting-summary-agent/

├── app.py

├── database.py

├── view_db.py

├── meeting_summaries.db

├── outputs/

│ └── meeting_summary.txt

└── transcripts/

└── sample_meeting.txt

---

## Tools Used

### Tool 1: Transcript Reader

Reads meeting transcripts from text files.

### Tool 2: Summary Storage

Stores generated summaries in:

* Text File
* SQLite Database

---

## Technologies

* Python
* Google Gemini API
* SQLite
* python-dotenv

---

## Sample Output

### Meeting Summary

The meeting focused on the upcoming dashboard launch scheduled for next week. Backend API development is complete. Frontend testing remains pending and must be completed by Friday. Documentation preparation is required. Deployment responsibilities were assigned.

### Action Items

* Complete frontend testing
* Prepare documentation
* Deploy application

### Owners

* Hetvi → Frontend Testing
* Nauman → Deployment
* Team → Documentation

---

## How to Run

Install dependencies:

pip install -r requirements.txt

Create .env file:

GEMINI_API_KEY=your_api_key

Run agent:

python app.py

View database records:

python view_db.py

---

## Learning Outcomes

* Built a custom AI agent without workflow automation tools.
* Integrated Google Gemini API.
* Implemented tool usage within an agent workflow.
* Generated structured meeting summaries.
* Stored outputs in files and databases.
* Understood real-world AI agent architecture.


