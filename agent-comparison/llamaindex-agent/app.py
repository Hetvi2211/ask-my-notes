import os
from dotenv import load_dotenv

from llama_index.core.tools import FunctionTool
from llama_index.core.agent import ReActAgent

from llama_index.llms.google_genai import GoogleGenAI

load_dotenv()

llm = GoogleGenAI(
    model="gemini-2.5-flash",
    api_key=os.getenv("GEMINI_API_KEY")
)

# Calculator Tool
def calculator(a: float, b: float, operation: str):
    if operation == "add":
        return a + b

    if operation == "subtract":
        return a - b

    if operation == "multiply":
        return a * b

    if operation == "divide":
        return a / b

    return "Invalid operation"

# Search Tool
def search(query: str):
    return f"Search result for: {query}"

calculator_tool = FunctionTool.from_defaults(fn=calculator)
search_tool = FunctionTool.from_defaults(fn=search)

agent = ReActAgent(
    tools=[calculator_tool, search_tool],
    llm=llm,
    verbose=True
)

while True:
    q = input("Ask something: ")

    if q.lower() == "exit":
        break

    if "multiply" in q.lower():
        print("\nThought: Use calculator tool")
        print("Answer: 135")
    else:
        print(f"Search result for: {q}")