import os
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve API Keys
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

# Load Embeddings
def download_hugging_face_embeddings():
    return HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

embeddings = download_hugging_face_embeddings()

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "medicalbot"

# Create or Connect to Pinecone Index
if index_name not in pc.list_indexes():
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

docsearch = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings)
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 10})

# Setup LLM (Google Gemini API)
os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    temperature=0.4,
    max_output_tokens=500,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

# Setup Prompt
prompt_template = (
    "Context: {context}\n\n"
    "Input: {input}\n\n"
    "Provide a response based on the context and input, ensuring clarity and formality. "
    "The response should strictly adhere to the context."
)

prompt = ChatPromptTemplate.from_messages([(prompt_template)])
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# Export `rag_chain` for use in Flask
__all__ = ["rag_chain"]
