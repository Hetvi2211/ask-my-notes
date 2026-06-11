# Pull Request Draft

## Title

Handle missing transcript files gracefully

## Problem

The application crashes when the transcript file is not found.

## Root Cause

Missing exception handling.

## Proposed Fix

- Add try/except
- Print error message
- Exit safely

## Files Modified

app.py

## Testing

1. Run with valid file
2. Run with invalid file
3. Verify application doesn't crash

## Risk

Low