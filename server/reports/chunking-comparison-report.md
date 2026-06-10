# Chunking Strategy Comparison Report

## Project

Ask My Notes — RAG-Powered PDF Question Answering System

---

# Objective

The goal of this experiment was to evaluate multiple chunking strategies for Retrieval-Augmented Generation (RAG) pipelines.

We implemented and tested:

* Fixed Chunking
* Sliding Window Chunking
* Semantic Chunking
* Hierarchical Chunking

The experiment focused on:

* Chunk quality
* Context preservation
* Retrieval efficiency
* Embedding performance
* Retrieval speed

---

# 1. Fixed Chunking

## Description

Fixed chunking splits text into equal-sized chunks.

Example:

* Chunk 1 → 0–500 chars
* Chunk 2 → 450–950 chars

Optional overlap helps preserve partial context.

## Advantages

* Simple implementation
* Fast processing
* Predictable chunk sizes
* Efficient embedding generation

## Disadvantages

* May break semantic meaning
* Sentences can split abruptly
* Context loss possible

## Experiment Results

| Metric          | Result |
| --------------- | ------ |
| Chunks Created  | 6      |
| Retrieval Speed | Fast   |
| Context Quality | Medium |
| Embedding Cost  | Medium |

## Observations

Fixed chunking worked well for fast retrieval but sometimes reduced answer quality because logical sections were split between chunks.

---

# 2. Sliding Window Chunking

## Description

Sliding window chunking uses larger overlap between chunks.

Example:

* Chunk 1 → 0–500
* Chunk 2 → 300–800

This preserves context continuity.

## Advantages

* Better contextual continuity
* Improved retrieval quality
* Reduced context fragmentation

## Disadvantages

* More chunks generated
* Higher embedding cost
* Increased storage usage

## Experiment Results

| Metric          | Result |
| --------------- | ------ |
| Chunks Created  | 8      |
| Retrieval Speed | Medium |
| Context Quality | High   |
| Embedding Cost  | High   |

## Observations

Sliding window chunking produced better answer consistency because overlapping content preserved surrounding context.

---

# 3. Semantic Chunking

## Description

Semantic chunking splits text based on logical meaning such as:

* Paragraphs
* Headings
* Sections

Implementation used paragraph-based splitting.

## Advantages

* Best semantic understanding
* Natural chunk boundaries
* High-quality retrieval

## Disadvantages

* Chunk sizes inconsistent
* Some PDFs produce very few chunks
* Depends heavily on document formatting

## Experiment Results

| Metric          | Result    |
| --------------- | --------- |
| Chunks Created  | 1         |
| Retrieval Speed | Very Fast |
| Context Quality | High      |
| Embedding Cost  | Low       |

## Observations

Semantic chunking preserved meaning effectively. However, PDFs without paragraph separation resulted in fewer chunks.

---

# 4. Hierarchical Chunking

## Description

Hierarchical chunking creates:

* Parent chunks
* Child chunks

This enables multi-level retrieval.

## Advantages

* Structured retrieval
* Better long-document organization
* Useful for large knowledge bases

## Disadvantages

* More implementation complexity
* Increased processing overhead

## Experiment Results

| Metric          | Result       |
| --------------- | ------------ |
| Chunks Created  | Experimental |
| Retrieval Speed | Medium       |
| Context Quality | High         |
| Embedding Cost  | Medium       |

## Observations

Hierarchical chunking was implemented as an experimental strategy for future improvements.

---

# Final Comparison

| Strategy     | Context Quality | Speed  | Embedding Cost | Best Use Case        |
| ------------ | --------------- | ------ | -------------- | -------------------- |
| Fixed        | Medium          | Fast   | Medium         | Simple RAG pipelines |
| Sliding      | High            | Medium | High           | Context-heavy QA     |
| Semantic     | High            | Fast   | Low            | Structured documents |
| Hierarchical | High            | Medium | Medium         | Large-scale systems  |

---

# Conclusion

This experiment demonstrated that chunking strategy significantly impacts retrieval quality and RAG performance.

Key findings:

* Sliding window chunking preserved context best.
* Semantic chunking provided the most natural retrieval behavior.
* Fixed chunking was fastest and easiest to implement.
* Hierarchical chunking offers future scalability potential.

For this project, semantic and sliding window chunking produced the best overall retrieval quality.
