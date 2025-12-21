from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://mongo:27017")
db = client["tododb"]
tasks = db["tasks"]

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify([{"id": str(t["_id"]), "text": t["text"]} for t in tasks.find()])

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    tasks.insert_one({"text": data["text"]})
    return jsonify({"status": "ok"})

@app.route("/tasks/<id>", methods=["DELETE"])
def delete_task(id):
    from bson import ObjectId
    tasks.delete_one({"_id": ObjectId(id)})
    return jsonify({"status": "deleted"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
