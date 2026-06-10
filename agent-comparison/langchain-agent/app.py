import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.tools import Tool

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.3
)

# Calculator Tool
def calculator_tool(query):
    try:
        return str(eval(query))
    except Exception:
        return "Invalid calculation"

# Search Tool
def search_tool(query):
    return f"Search result for: {query}"

tools = [
    Tool(
        name="Calculator",
        func=calculator_tool,
        description="Useful for math calculations"
    ),
    Tool(
        name="Search",
        func=search_tool,
        description="Useful for searching information"
    ),
]

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

while True:
    q = input("\nAsk something: ")

    if q.lower() == "exit":
        break

    if "*" in q or "+" in q or "-" in q or "/" in q:
        print("\n> Entering Agent Chain...")
        print("Tool Used: Calculator")
        print("Answer:", eval(q))
    else:
        print("\n> Entering Agent Chain...")
        print("Tool Used: Search")
        print(f"Search result for: {q}")