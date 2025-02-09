# workRoadmap.py

import os
from pymongo import MongoClient
from datetime import datetime
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pathlib import Path
# Initialize Flask app
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app


# MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")
# MongoDB Connection URI

FAISS_INDEX_PATH = "workingpro_faiss_index"  # Directory for FAISS index
PDF_PATH = "Working_Professional_Data.pdf"  # Path to your data source
EMBEDDING_MODEL = "sentence-transformers/all-mpnet-base-v2"

def get_mongo_data():
    """Fetch the latest goal data from MongoDB"""
    client = MongoClient(MONGO_URI)
    db = client["Amdoc"]
    collection = db["goals"]
    
    # Fetch the latest inserted document
    latest_goal = collection.find_one(sort=[("createdAt", -1)])

    if not latest_goal:
        raise ValueError("No goal data found in MongoDB.")

    user_inputs = {
        "userID": str(latest_goal.get("userId", "Unknown")),
        "goal": latest_goal.get("goal", "Unknown"),
        "time_per_week": latest_goal.get("time_per_week", "Unknown"),
        "learning_mode": latest_goal.get("learning_mode", "Unknown"),
        "skill_level": latest_goal.get("skill_level", "Unknown"),
        "deadline": latest_goal.get("deadline", "Unknown")
    }

    return user_inputs

def get_vectorstore():
    """Load existing FAISS index or create new one if missing"""
    index_file = os.path.join(FAISS_INDEX_PATH, "index.faiss")

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"}
    )

    if os.path.exists(index_file):
        print("Loading existing FAISS index...")
        return FAISS.load_local(
            FAISS_INDEX_PATH,
            embeddings,
            allow_dangerous_deserialization=True
        )

    print("Generating new FAISS index...")
    loader = PyPDFLoader(PDF_PATH)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=30, separator="\n")
    docs = text_splitter.split_documents(documents)

    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local(FAISS_INDEX_PATH)
    print("FAISS index saved successfully.")

    return vectorstore

def setup_ai_model(api_key):
    return ChatGroq(temperature=0, groq_api_key=api_key, model_name="mixtral-8x7b-32768")

def create_personalized_prompt(user_inputs):
    system_prompt = """
    You are SaarthiAI, a highly intelligent AI assistant specializing in creating detailed and actionable learning roadmaps.
    Your responsibilities include:
    - Breaking down the learning goal into weekly or phased milestones.
    - Providing high-quality, trusted resources (e.g., online courses, YouTube tutorials, books, coding platforms).
    - Suggesting practical projects and exercises tailored to the user's level and timeline.
    - Including motivational tips and methods for tracking progress.
    """

    user_prompt = f"""
Based on the student's details:
- Learning Goal: {user_inputs['goal']}
- Time Commitment: {user_inputs['time_per_week']} per week
- Preferred Learning Mode: {user_inputs['learning_mode']}
- Current Skill Level: {user_inputs['skill_level']}
- Deadline: {user_inputs['deadline']}

Generate a week-by-week academic roadmap that includes:
1. Weekly milestones focused on mastering key subjects and topics.
2. Suggested study activities (reading, practice, etc.) for each week.
3. Key concepts and skills to focus on for each week.
4. Study tips to stay on track and maintain progress.
"""

    return ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", user_prompt)
    ])

def generate_roadmap(qa, personalized_prompt, user_goal):
    try:
        print("\nGenerating your personalized roadmap...\n")
        result = qa.run(personalized_prompt.format_messages()[1].content)
        youtube_link = f"https://www.youtube.com/results?search_query={user_goal.replace(' ', '+')}"
        result += f"\n\n🔗 Explore related YouTube videos here: {youtube_link}\n"
        return result
    except Exception as e:
        return f"Error while generating the roadmap: {e}"

def save_roadmap(output, file_type="txt"):
    filename = "roadmap.txt" if file_type == "txt" else "roadmap.html"

    if file_type == "html":
        html_output = f"<html><body><h1>Personalized Roadmap</h1><pre>{output}</pre></body></html>"
        Path(filename).write_text(html_output, encoding="utf-8")
    else:
        Path(filename).write_text(output, encoding="utf-8")

    print(f"\n📄 Roadmap saved as {filename}")

def save_roadmap_to_mongo(user_id, roadmap, goal):
    """Save or update the generated roadmap in MongoDB under the 'Roadmap' collection."""
    client = MongoClient(MONGO_URI)
    db = client["Amdoc"]
    collection = db["Roadmap"]

    # Check if a roadmap already exists for the user and goal
    existing_roadmap = collection.find_one({"userID": user_id, "goal": goal})

    roadmap_data = {
        "userID": user_id,
        "roadmap": roadmap,
        "goal": goal,
        "timestamp": datetime.utcnow()  # Store timestamp for tracking
    }

    if existing_roadmap:
        # Update the existing roadmap
        collection.update_one(
            {"_id": existing_roadmap["_id"]},  # Match the existing document by its _id
            {"$set": roadmap_data}  # Update the roadmap data
        )
        print(f"\n✅ Roadmap updated successfully for userID: {user_id}")
    else:
        # Insert a new roadmap document if no existing one is found
        collection.insert_one(roadmap_data)
        print(f"\n✅ Roadmap saved successfully in MongoDB for userID: {user_id}")

def generate_and_save_roadmap(api_key, user_id):
    # Fetch the latest goal data from MongoDB
    user_inputs = get_mongo_data()

    # Setup the AI model
    qa = setup_ai_model(api_key)

    # Create personalized prompt based on the user inputs
    personalized_prompt = create_personalized_prompt(user_inputs)

    # Generate the personalized roadmap
    roadmap = generate_roadmap(qa, personalized_prompt, user_inputs["goal"])

    # Save the roadmap in a text file and HTML
    save_roadmap(roadmap, file_type="txt")
    save_roadmap(roadmap, file_type="html")

    # Save the generated roadmap to MongoDB
    save_roadmap_to_mongo(user_inputs["userID"], roadmap, user_inputs["goal"])