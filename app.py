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
mongoPass = "T32bfrH0L678xseI"
c = MongoClient(f"mongodb+srv://2team:{mongoPass}@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority") 
db = c.FinalProject

users_db = db['Users']

@app.route('/user/createAcc', methods = ["POST"])
def createAcc():
    requestData = json.loads(request.data)
    payload = requestData['data']

    username = payload['username']
    password = payload['password']

    user = Users(username, password)

    collection = c.FinalProject.Users

    try:
        user_id = c.FinalProject.insert_one(user.toDatabase()).inserted_id
    except Exception as e:
        print(e, flush = True)
        return;
    else:
        return;


    
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
