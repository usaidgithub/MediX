MediX – AI Medical Consulting Chatbot
MediX is an AI-powered medical consulting chatbot that provides relevant responses to medical queries using Retrieval-Augmented Generation (RAG). It integrates React.js, MongoDB, Pinecone, and Gemini API to offer intelligent and contextual medical assistance.

Features
AI-powered medical query resolution
Uses RAG (Retrieval-Augmented Generation) for accurate responses
Authentication system using MongoDB
Chat history storage for user convenience
Pinecone vector database for efficient medical data retrieval
Gemini API for handling LLM-based tasks

Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB (for authentication & chat storage)
Vector Database: Pinecone (for embeddings & retrieval)
LLM: Gemini API (for generating responses)
How It Works
User asks a medical-related query.
The query is embedded using Pinecone and matched with relevant data.
The system retrieves medical context using RAG.
The Gemini API processes the query and generates an intelligent response.
The response is displayed in the chat interface.
