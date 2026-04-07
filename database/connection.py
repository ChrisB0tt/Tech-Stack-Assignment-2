
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["skill_swap"]

users_collection = db["users"]
resources_collection = db["resources"]
client = MongoClient(os.getenv("MONGO_URI"))
db = client["skill_swap"]

users = db.users
resources = db.resources
