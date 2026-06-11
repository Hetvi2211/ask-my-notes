## Code Review

### Security

**Critical Issue:** The function uses `eval()`, which can execute arbitrary Python code. If user input is passed directly, it may lead to code injection and security vulnerabilities.

### Performance

Performance is acceptable for simple calculations. However, `eval()` parses the expression on every call, which can be inefficient for frequent or complex evaluations.

### Maintainability

The code lacks input validation, error handling, and documentation. Invalid expressions can cause runtime exceptions, making debugging and maintenance harder.

### Recommendation

Avoid using `eval()` in production applications.

Use a safer expression parser or implement validation to allow only mathematical operations.
