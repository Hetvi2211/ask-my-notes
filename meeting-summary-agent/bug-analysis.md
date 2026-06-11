# Bug Analysis

## Issue

Application crashes when transcript file does not exist.

## Steps To Reproduce

1. Delete sample_meeting.txt
2. Run app.py

## Expected

User-friendly error message.

## Actual

Program crashes with FileNotFoundError.

## Root Cause

No exception handling exists inside read_transcript().

## Proposed Fix

Add try/except block.
Display meaningful error.