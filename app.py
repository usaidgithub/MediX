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
from functools import lru_cache

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load env variables
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Prompt template
prompt_template = (
    "Context: {context}\n\n"
    "Input: {input}\n\n"
    "Provide a response using the given context. Ensure clarity, correctness, "
    "and maintain the user's tone and be conversational. Strictly use context information."
)
prompt = ChatPromptTemplate.from_template(prompt_template)


@lru_cache(maxsize=1)
def get_rag_chain():
    """Load all components lazily, cache after first run"""
    embeddings = download_hugging_face_embeddings()

    docsearch = PineconeVectorStore.from_existing_index(
        index_name="medicalbot",
        embedding=embeddings
    )
    retriever = docsearch.as_retriever(
        search_type="similarity", search_kwargs={"k": 5}
    )

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.4,
        max_output_tokens=500,
        google_api_key=GOOGLE_API_KEY,
    )

    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    return rag_chain


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
        rag_chain = get_rag_chain()  # Lazy load only once

        response = rag_chain.invoke({"input": user_message})
        return jsonify({"answer": response["answer"]})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500


@app.route("/health")
def health():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
