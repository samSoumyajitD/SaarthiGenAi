# Saarthi_Gen-AI 🎓✨ 

AI-Powered Personalized Learning Platform

In today’s fast-paced world, learning should be adaptive, not one-size-fits-all. Yet, many learners struggle with directionless learning, rigid courses, and a lack of real-time feedback. That’s where Saarthi_Gen-AI comes in!

## 🎯 Project Overview

*Saarthi_Gen-AI* revolutionizes learning journeys through AI-powered personalization. Initially developed for the *Amdocs GenAI Hackathon*, this smart learning assistant tackles critical education challenges:

- 🧭 *Directionless Learning*: Creates purpose-driven educational paths
- 🚧 *Rigid Curriculum*: Dynamically adapts to individual progress
- 📉 *Ineffective Feedback*: Delivers real-time performance insights

Our platform analyzes user profiles to generate *adaptive learning roadmaps*, employing AI tutors and smart assessments to ensure 95%+ learning retention rates.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🗺 AI Learning Roadmaps | Personalized skill development paths based on goals/skills |
| 🧠 Adaptive Quizzes | Weekly & final assessments with difficulty scaling (±40%) |
| 🔄 Dynamic Adjustments | Real-time roadmap optimization based on performance |
| 🤖 24/7 AI Tutor | LangChain-powered assistant for instant Q&A support |
| 📊 Progress Analytics | Interactive dashboard with skill mastery visualization |

## 🛠 Tech Stack

*Frontend*  
[![Next.js](https://img.shields.io/badge/Next.js-13.5-000000?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

*Backend*  
[![Node.js](https://img.shields.io/badge/Node.js-20.5-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com/)

*AI Core*  
[![LangChain](https://img.shields.io/badge/LangChain-0.1.0-00FF00)](https://python.langchain.com/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-4.3-yellow?logo=huggingface)](https://huggingface.co/)

*Database*  
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)](https://www.mongodb.com/)

## 🚀 Installation Guide

### Prerequisites
- Node.js ≥18.x
- Python ≥3.9
- MongoDB Atlas Cluster


# 1. Clone repository

git clone https://github.com/SaarthiAI/saarthi-core.git
cd saarthi-core

# 2. Install dependencies

npm install
pip install -r requirements.txt


# 3. Configure environment

cp .env.example .env
# Update with your API keys


# 4. Start development servers

npm run dev & python api/server.py


## 🔑 Environment Configuration


# .env
MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/saarthi"
GROQ_API_KEY="gsk_YourKeyHere"


## 🤝 Contributing

1. Fork the repository
2. Create feature branch: git checkout -b feat/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feat/amazing-feature
5. Open Pull Request

## 🙏 Acknowledgments

- Amdocs Hackathon Organization Team
- LangChain Community Support
- HuggingFace Open Source Models
- Groq API Infrastructure
