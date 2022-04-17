from flask import Flask, jsonify
from flask.helpers import send_from_directory
from pymongo import MongoClient
from bson.json_util import dumps
import ssl
import HWSet

# comment out on deployment
from flask_cors import CORS

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="frontend/build", static_url_path="/")

# comment out on deployment
CORS(app)
mongoPass = "T32bfrH0L678xseI"
c = MongoClient(f"mongodb+srv://2team:{mongoPass}@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority") 
db = c.FinalProject

@app.route('/hwSet/<setData>', methods=['GET', 'POST'])
def createHWSet(setData: str):
    return {'response':'Hi'}
    Client = MongoClient("mongodb+srv://2team:T32bfrH0L678xseI@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority")
    db = Client.FinalProject
    hwSets = db.HWSets
    data = setData.split("_")
    entry = {
        "Hardware": data[0],
        "Capacity": data[1],
        "Availability": data[1]
    }
    hwSets.insert_one(entry)
    return jsonify(entry)
  
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
