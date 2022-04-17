from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from pymongo import MongoClient
from bson.json_util import dumps
import json
import ssl
import HWSet
from User import User
# comment out on deployment
from flask_cors import CORS

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="frontend/build", static_url_path="/")

# comment out on deployment
CORS(app)
mongoPass = "T32bfrH0L678xseI"
c = MongoClient(f"mongodb+srv://2team:{mongoPass}@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority") 
db = c.FinalProject

@app.route('/user/createAcc', methods = ["POST"])
def createAcc():
    requestData = json.loads(request.data)
    payload = requestData['data']

    username = payload['username']
    password = payload['password']

    user = User(username, password)

    collection = db.Users
    print(user.dbSend(), flush=True)
    try:
        #user_id = collection.insert_one(user.dbSend()).inserted_id
        collection.insert_one(user.dbSend())
    except Exception as e:
        print(e, flush = True)
        return "account wasn't created"
    else: 
        return "account was created"

@app.route('/hwSet/<setData>', methods=['GET', 'POST'])
def createHWSet(setData: str):
    Client = MongoClient("mongodb+srv://2team:T32bfrH0L678xseI@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority")
    db = Client.FinalProject
    HWSets = db.HWSets
    data = setData.split("_")
    entry = {
        "Name": data[0],
        "Capacity": data[1],
        "Availability": data[1],
        "Checkouts": {}
    }
    Client.close()
    HWSet0 = entry["Hardware"] + "_" + entry["Capacity"] + "_" + entry["Availability"]
    HWSets.insert_one(entry)
    return jsonify(hwsetdata = HWSet0)

#hardwareset checkin or checkout
@app.route("/checkInOrOut/<setInfo>", methods=["GET"])
# return statement in form of <whether successfull>_<HWSet capacity>_<HWSet availability>
# <setInfo> in form:
# <setName (either HWSet1 or 2)>_<key: either checkin, checkout>_<ProjectID>_<qty>
def checkInOrOut(setInfo: str):
    separated = setInfo.split('_')
    setName = separated[0]
    key = separated[1]
    projectID = separated[2]
    qty = separated[3]
    success = 0

    Client = MongoClient("mongodb+srv://2team:T32bfrH0L678xseI@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority")
    db = Client.FinalProject
    HWSets = db.HWSets
    search = HWSets.find_one({"Name": setName})

    #create HWSet object
    HWSet0 = HWSet.HWSet(int(search["Availability"]), int(search["Capacity"]), search["Ckeckouts"])

    if key == "checkout":
        success = HWSet0.check_out(projectID, qty)
    if key == "checkin":
        success = HWSet0.check_in(projectID, qty)

    # if checkin or checkout successful    
    if success == 0:
        HWSets.update_one(
            {"Name": setName},
            {'$set' : {
                "Capacity": HWSet0.get_capacity(),
                "Availability": HWSet0.get_availability(),
                "Checkouts": HWSet0.get_checkOutQty() }})
        Client.close()
        data = "true" + str(HWSet0.get_capacity()) + "_" + str(HWSet0.get_availability())
        return jsonify(HWSetData=data)
    else:
        Client.close()
        data = "false" + str(HWSet0.get_capacity()) + "_" + str(HWSet0.get_availability())
        return jsonify(HWSetData=data)   

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
