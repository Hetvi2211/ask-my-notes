# Self Review

## Change Summary

Added error handling for missing transcript files.

## What Was Wrong

Application crashed when transcript file did not exist.

## Fix Applied

Added try-except block for FileNotFoundError.

## Testing Performed

- Tested with valid transcript
- Tested with invalid transcript path

## Result

Application now displays a meaningful error message instead of crashing.

## Review Outcome

Code is simple, readable, and follows existing project structure.