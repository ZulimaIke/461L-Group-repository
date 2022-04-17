from flask import Flask, jsonify
from flask.helpers import send_from_directory
from pymongo import MongoClient
from bson.json_util import dumps
import ssl
import HWSet

# comment out on deployment
from flask_cors import CORS

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="frontend/build", static_url_path="")

# comment out on deployment
CORS(app)


    
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
