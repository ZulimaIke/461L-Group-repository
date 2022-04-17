from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from pymongo import MongoClient
from bson.json_util import dumps
import json
from bson import json_util
import ssl
import HWSet
# comment out on deployment
from flask_cors import CORS
from User import User   

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="frontend/build", static_url_path="/")

# comment out on deployment
CORS(app)
mongoPass = "T32bfrH0L678xseI"
c = MongoClient(f"mongodb+srv://2team:{mongoPass}@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority") 
db = c.FinalProject

@app.route('/user/createAcc', methods = ["POST"])
def createAcc():
    collection = db.Users
    requestData = json.loads(request.data)
    payload = requestData['data']

    username = payload['username']
    password = payload['password']

    entry = {
        "username": username,
        "password": password
    }
    print(username, flush=True)
    collection.insert_one(entry)
    return {'response' : 'success'}
    #user = User(username, password)

    
    #print(user.dbSend(), flush=True)
   # try:
        #user_id = collection.insert_one(user.dbSend()).inserted_id
    #    collection.insert_one(user.dbSend())
   # except Exception as e:
    #    print(e, flush = True)
      #  return "account wasn't created"
   # else: 
     #   return "account was created"

@app.route('/hwSet/<setData>', methods=['GET', 'POST'])
def createHWSet(setData: str):
    #return {'response':'Hi'}
    # Client = MongoClient("mongodb+srv://2team:T32bfrH0L678xseI@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority")
    # db = Client.FinalProject
    hwSets = db.HWSets
    data = setData.split("_")
    entry = {
        "Name": data[0],
        "Capacity": data[1],
        "Availability": data[1],
        "Checkouts": {}
    }
    # hwSet0 = entry["Hardware"] + "_" + entry["Capacity"] + "_" + entry["Availability"]
    hwSets.insert_one(entry)
    return {'response':'success'}

@app.route('/getSets', methods=['POST', 'GET'])
def getHWSets():
    # return {'response':'Hi'}
    Client = MongoClient("mongodb+srv://2team:T32bfrH0L678xseI@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority")
    db = Client.FinalProject
    hwSets = db.HWSets
    existingSets = []
    pointer = hwSets.find({})
    for set in pointer:
        print(set)
        page = json.loads(json_util.dumps(set))
        existingSets.append(page)
    return jsonify(existingSets)
  
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
