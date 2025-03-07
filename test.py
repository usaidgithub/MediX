import os
from langchain_google_genai import GoogleGenerativeAI

# Load API Key
api_key = os.getenv("GOOGLE_API_KEY")

# Ensure the API key is present
if not api_key:
    raise ValueError("Google API Key is missing. Check your environment variables.")

# Initialize GoogleGenerativeAI with a valid model name
genai = GoogleGenerativeAI(api_key=api_key, model="gemini-1.5-pro-latest")  # ✅ Use "gemini-pro" or "gemini-pro-1.5"

# Test response
response = genai.invoke("What is acne?")
print(response)
