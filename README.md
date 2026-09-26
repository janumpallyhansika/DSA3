# 📄 PaperCheck — Plagiarism Detection System

> An efficient plagiarism detection system using **Rolling Hash** and the **Rabin-Karp algorithm** to identify similarities between research papers.

---

## 👥 Team

| Name | Roll Number |
|------|-------------|
| Raghava Akkinepally | 2520030271 |
| Janumpally Hansika | 2520030060 |
| N. Rishika Chowdary | 2520030212 |

**Course:** Data Structures and Algorithms - III (25CS2103E)  
**Department:** Computer Science and Engineering  
**Faculty Guide:** Dr. S. Madhavi

---

## 📌 Overview

**PaperCheck** is a plagiarism detection system designed to compare an uploaded research paper against a collection of reference research papers.

The system extracts text from a PDF, preprocesses the content, divides it into **K-grams**, and generates hash values using the **Rolling Hash** technique.

The **Rabin-Karp algorithm** then compares these hash values to efficiently identify matching sequences.

Finally, PaperCheck calculates a **similarity percentage** and generates a ranked list of reference papers that contain matching content.

The project demonstrates how fundamental **Data Structures and Algorithms concepts can be applied to a real-world problem such as plagiarism detection.**

---

## 🎯 Problem Statement

Manually checking large research papers for plagiarism is time-consuming and inefficient.

Traditional approaches such as direct text comparison can become expensive when the number and size of documents increase.

PaperCheck addresses this problem by developing an automated system that efficiently compares an uploaded research paper with a collection of reference papers using:

- Rolling Hash
- K-Grams
- Rabin-Karp String Matching
- Similarity Analysis

---

## 🎯 Objectives

The main objectives of PaperCheck are:

- 📤 Accept research papers in PDF format
- 📑 Extract text from uploaded PDFs
- 🧹 Preprocess the extracted text
- 🔢 Divide text into K-grams
- #️⃣ Generate hash values using Rolling Hash
- 🔍 Detect matching sequences using Rabin-Karp
- 📊 Calculate similarity percentage
- 🏆 Display and rank similar reference papers

---

## ⚙️ How It Works

The PaperCheck pipeline follows these steps:

```text
        Upload Research Paper
                 │
                 ▼
          Process PDF File
                 │
                 ▼
           Extract Text
                 │
                 ▼
          Preprocess Text
                 │
                 ▼
           Generate K-Grams
                 │
                 ▼
          Rolling Hash
                 │
                 ▼
       Rabin-Karp Matching
                 │
                 ▼
        Calculate Similarity
                 │
                 ▼
      Rank Matching Papers
                 │
                 ▼
         Display Results
