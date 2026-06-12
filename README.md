# Day 16 – Real Repo Onboarding & PR Planning

## Objective

The goal of Day 16 was to onboard onto an existing codebase, understand the project architecture using AI tools, identify a bug, analyze its root cause, and prepare a PR draft with a proposed fix.

---

# Repository Overview

Project analyzed:

```text
meeting-summary-agent
```

This project automatically generates meeting summaries using Gemini AI and stores the results in both a text file and a SQLite database.

---

# High-Level Architecture

```text
Meeting Transcript
        ↓
Read Transcript
        ↓
Generate Prompt
        ↓
Gemini AI
        ↓
Meeting Summary
        ↓
Save to Text File
        ↓
Save to SQLite Database
```

---

# Project Structure

```text
meeting-summary-agent/
│
├── app.py
├── database.py
├── meeting_summaries.db
├── .env
│
├── transcripts/
│   └── sample_meeting.txt
│
├── outputs/
│   └── meeting_summary.txt
│
├── screenshots/
│
├── repo-analysis.md
│
├── bug-analysis.md
│
├── pr-draft.md
│
└── README.md
```

---

# Codebase Understanding

## app.py

Responsible for:

* Loading environment variables
* Reading transcript files
* Sending prompts to Gemini AI
* Generating meeting summaries
* Saving summaries to file
* Saving summaries to database

---

## database.py

Responsible for:

* Creating SQLite database connection
* Creating summary table
* Inserting generated summaries
* Managing database transactions

---

# Bug Identified

## Issue

Application crashes when transcript file does not exist.

Current implementation:

```python
def read_transcript(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()
```

If the file path is incorrect:

```text
FileNotFoundError
```

Application terminates unexpectedly.

---

# Root Cause Analysis

The function does not handle file-related exceptions.

Missing:

```python
try-except
```

block for invalid file paths.

---

# Proposed Fix

Updated implementation:

```python
def read_transcript(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    except FileNotFoundError:
        print(f"Error: {file_path} not found")
        exit()
```

---

# Benefits of Fix

* Prevents application crashes
* Improves user experience
* Provides meaningful error messages
* Makes application more robust

---

# AI-Assisted Analysis

AI tools were used to:

* Understand project architecture
* Analyze code flow
* Identify potential failure points
* Generate root-cause analysis
* Validate proposed solution

---

# PR Draft

## Title

```text
Fix transcript file handling by adding FileNotFoundError protection
```

## Description

```text
Added error handling to read_transcript() to prevent application crashes
when transcript files are missing.

Changes:
- Added try-except block
- Added user-friendly error message
- Prevented unexpected termination
```

---

# Deliverables Completed

* Codebase onboarding completed
* Architecture analysis completed
* Repository documentation completed
* Bug identified
* Root cause analyzed
* Fix implemented
* PR draft prepared

---

# Status

✅ Repository Onboarding Complete

✅ Codebase Analysis Complete

✅ Bug Investigation Complete

✅ Fix Plan Complete

✅ PR Draft Ready

---

### Files Added

```text
README.md
repo-analysis.md
bug-analysis.md
pr-draft.md
```

### Files Updated

```text
app.py
```

---

**Day 16 Status: Completed** 🚀
