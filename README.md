# Day 14 — Multi-Step Agents

## Overview

This project demonstrates the implementation and comparison of multi-step AI agents using different approaches:

- LangChain Agent
- LlamaIndex Agent
- Custom SDK Agent

The objective was to understand:

- Tool orchestration
- Agent workflows
- ReAct-style reasoning
- Memory implementation
- Framework comparison

---

# Project Structure

```text
agent-comparison/
│
├── langchain-agent/
│   └── app.py
│
├── llamaindex-agent/
│   └── app.py
│
├── custom-agent/
│   └── app.js
│
├── memory/
│   └── memory-notes.md
│
├── screenshots/
│
├── comparison-report.md
│
└── README.md
```

---

# Implementations

## 1. LangChain Agent

Features:

- Tool-based workflow
- Calculator tool
- Search tool
- Agent reasoning simulation

Example:

```text
Input:
45 * 12

Output:
Tool Used: Calculator
Answer: 540
```

---

## 2. LlamaIndex Agent

Features:

- ReAct-style workflow
- Tool invocation
- Query handling
- Agent execution flow

Example:

```text
Input:
Multiply 15 and 9

Output:
Thought: Use calculator tool
Answer: 135
```

---

## 3. Custom SDK Agent

Features:

- Manual tool orchestration
- Calculator tool
- Search tool
- Conversation memory
- Custom agent loop

Example:

```text
Input:
45 * 12

Output:
Tool Used: Calculator
Final Response: 540
```

---

# Memory Implementation

Implemented memory using conversation history tracking.

Supported:

- Short-term memory
- Context persistence
- Follow-up question handling

Example:

```text
User:
My favorite language is Python

User:
What is my favorite language?

Agent:
Your favorite language is Python
```

Detailed notes are available in:

```text
memory/memory-notes.md
```

---

# Framework Comparison

Comparison between:

- LangChain
- LlamaIndex
- Custom SDK Agent

See:

```text
comparison-report.md
```

Key observations:

| Feature | LangChain | LlamaIndex | Custom SDK |
|----------|------------|------------|------------|
| Ease of Use | High | Medium | Medium |
| Tool Calling | Built-in | Built-in | Manual |
| Memory Support | Good | Good | Custom |
| Flexibility | Medium | Medium | High |
| Learning Value | High | High | Very High |

---

# Screenshots

Screenshots are available in:

```text
screenshots/
```

Included:

- langchain-agent.png
- llamaindex-agent.png
- custom-agent.png
- memory-demo.png
- framework-comparison.png

---

# Technologies Used

- Python
- Node.js
- Gemini API
- LangChain
- LlamaIndex
- dotenv

---

# Learning Outcomes

Through this project I learned:

- Multi-step agent architecture
- Tool orchestration
- ReAct workflows
- Agent memory concepts
- Framework comparison
- Custom AI agent implementation
- Conversational context handling

---

# Known Issues

During implementation, version compatibility issues were encountered between:

- LangChain
- LangChain Core
- LangChain Google GenAI

Recent package releases introduced breaking API changes that affected older examples using:

```python
initialize_agent()
```

and Gemini integrations.

Because of these framework version conflicts, the LangChain implementation was adapted for demonstration purposes while preserving the agent workflow concepts.

The LlamaIndex and Custom SDK implementations were completed successfully and demonstrate the intended multi-step agent behavior, tool usage, and memory handling.

---

# Author

Hetvi Rabari

B.Tech Artificial Intelligence & Machine Learning

Day 14 Internship Project — Multi-Step Agents
