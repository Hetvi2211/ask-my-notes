# Cohere Reranker Notes

## Project

Ask My Notes — RAG-Powered PDF Question Answering System

---

# Objective

The purpose of this study was to understand reranking in Retrieval-Augmented Generation (RAG) systems and explore how Cohere Rerank improves retrieval quality.

---

# What is Reranking?

Reranking is a second-stage retrieval process used in RAG pipelines.

In a normal retrieval system:

1. Vector search retrieves top chunks based on embedding similarity.
2. Retrieved chunks are sent directly to the LLM.

However, vector similarity alone is not always enough to find the most relevant context.

Reranking improves this by reordering retrieved chunks according to semantic relevance to the user's query.

---

# First-Pass Retrieval

First-pass retrieval is the initial retrieval stage.

Example pipeline:

User Question
↓
Embedding Generation
↓
Vector Database Search
↓
Top-K Chunks Retrieved

The vector database uses cosine similarity between embeddings to retrieve relevant chunks.

Common tools:

* ChromaDB
* Pinecone
* Weaviate
* FAISS

### Problem

Embedding similarity sometimes retrieves chunks that are:

* semantically similar
* but not contextually optimal

This can reduce answer quality.

---

# Second-Pass Retrieval (Reranking)

Second-pass retrieval improves the retrieved results.

Pipeline:

User Question
↓
Vector Search
↓
Top 10 Chunks
↓
Reranker Model
↓
Best 3 Chunks
↓
LLM Response

The reranker reads:

* the query
* each retrieved chunk

Then it scores relevance more accurately.

---

# Why Rerankers Improve Quality

Rerankers improve:

* contextual relevance
* answer precision
* citation quality
* retrieval accuracy

Benefits:

* better answers
* fewer irrelevant chunks
* improved long-document retrieval
* reduced hallucinations

Reranking is especially useful in:

* enterprise RAG systems
* legal document search
* research assistants
* multi-document QA systems

---

# How Cohere Rerank Works

Cohere provides a dedicated reranking API.

Workflow:

1. Retrieve chunks using vector similarity.
2. Send query + retrieved chunks to Cohere Rerank API.
3. Cohere scores chunks by relevance.
4. Return highest-ranked chunks.

Example flow:

Question:
"What are embeddings?"

Retrieved Chunks:

* Chunk A
* Chunk B
* Chunk C

Cohere rerank may reorder them as:

1. Chunk C
2. Chunk A
3. Chunk B

The best chunks are then passed to the LLM.

---

# Advantages of Cohere Rerank

* Improved retrieval quality
* Better semantic understanding
* Easy API integration
* Works with existing vector databases
* Strong performance for RAG systems

---

# Limitations

* Additional API cost
* Increased latency
* Extra retrieval step
* Requires internet/API access

---

# Conclusion

Reranking is an important optimization technique in modern RAG pipelines.

Key learnings:

* First-pass retrieval finds candidate chunks.
* Second-pass reranking improves relevance.
* Cohere Rerank enhances retrieval precision.
* Reranking helps reduce hallucinations and improves answer quality.

For future improvements, Cohere Rerank can be integrated into the Ask My Notes retrieval pipeline after ChromaDB retrieval.
