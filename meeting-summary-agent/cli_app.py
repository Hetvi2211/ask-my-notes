import os
from dotenv import load_dotenv
from database import save_to_db
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.0-flash")

# TOOL 1: Read Transcript
def read_transcript(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: {file_path} not found")
        exit()

# TOOL 2: Save Summary to File
def save_to_file(summary):
    output_path = "outputs/meeting_summary.txt"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(summary)

    return output_path

transcript = read_transcript(
    "transcripts/sample_meeting.txt"
)

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

response = model.generate_content(prompt)

summary = response.text

# Save to file
path = save_to_file(summary)

# Save to SQLite database
save_to_db(summary)

print("\n===== MEETING SUMMARY =====\n")
print(summary)

print("\nSaved to:", path)
print("Saved to SQLite Database")