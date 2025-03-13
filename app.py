from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from src.helper import download_hugging_face_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow all origins (CORS enabled)

# Load environment variables
load_dotenv()
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

# Set environment variables
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

# Load embeddings
embeddings = download_hugging_face_embeddings()

# Pinecone Index Setup
index_name = "medicalbot"
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 10})

# Define LLM (Google Gemini)
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro-latest",
    temperature=0.4,
    max_output_tokens=500,
)

# Define Prompt
prompt_template = (
    "Context: {context}\n\n"
    "Input: {input}\n\n"
    "Provide a response using the given context. Ensure clarity, correctness, "
    "and maintain the user's tone. Strictly use context information."
    "If the context does not contain the answer, respond with 'I'm sorry, I don't know.'."
)

prompt = ChatPromptTemplate.from_template(prompt_template)

# Create RAG pipeline
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/get", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "msg" not in data:
            return jsonify({"error": "Invalid request"}), 400

        user_message = data["msg"]
        print(f"user message is{user_message}")
        response = rag_chain.invoke({"input": user_message})
        return jsonify({"answer": response["answer"]})

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
