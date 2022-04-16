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

@app.route("/create_acc/<userAndPass>", methods=["GET"])
def create_acc(userAndPass: str):
    separated = userAndPass.split('_')
    username = separated[0]
    password = separated[1]
    username = username.lower()
    password = password.lower()

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    UserAndPass = db.UserAndPass
    search = UserAndPass.find_one({"Username": username})
    if search is None:
        reversedText = password[::-1]
        asciiText = [ord(character) for character in reversedText]
        asciiText = [i+5 for i in asciiText]
        for i in range(len(asciiText)):
            while (asciiText[i] > 126):
                asciiText[i] = asciiText[i] - 93
            while (asciiText[i] < 34):
                asciiText[i] = asciiText[i] + 93
        password = ''.join(chr(i) for i in asciiText)
        newUser = {
        "Username" : username,
        "Password" : password}
        UserAndPass.insert_one(newUser)
        Client.close()
        output = "true"
        return jsonify(createdAcc=output)
    else:
        Client.close()
        output = "false"
        return jsonify(createdAcc=output)

@app.route("/login/<userAndPass>", methods=["GET"])
def login(userAndPass: str):
    separated = userAndPass.split('_')
    username = separated[0]
    password = separated[1]
    username = username.lower()
    password = password.lower()
    reversedText = password[::-1]
    asciiText = [ord(character) for character in reversedText]
    asciiText = [i+5 for i in asciiText]
    for i in range(len(asciiText)):
        while (asciiText[i] > 126):
            asciiText[i] = asciiText[i] - 93
        while (asciiText[i] < 34):
            asciiText[i] = asciiText[i] + 93
    password = ''.join(chr(i) for i in asciiText)
    
    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    UserAndPass = db.UserAndPass
    search = UserAndPass.find_one({
        "$and": [
            {"Username": username},
            {"Password": password}
        ]
    })
    if search is None:
        Client.close()
        output = "false"
        return jsonify(loginSuccess=output)
    else:
        Client.close()
        output = "true"
        return jsonify(loginSuccess=output)
   
@app.route("/newProject/<projectInfo>", methods=["GET"])
def newProject(projectInfo: str):
    separated = projectInfo.split('_')
    projectName = separated[0]
    projectID = separated[1]
    projectDescription = separated[2]

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    Projects = db.Projects
    search = Projects.find_one({"ID": projectID})
    if search is None:
        newProject = {
        "Name" : projectName,
        "ID" : projectID,
        "Description" : projectDescription}
        Projects.insert_one(newProject)
        Client.close()
        output = "true"
        return jsonify(successfullyCreated=output)
    else:
        Client.close()
        output = "false"
        return jsonify(successfullyCreated=output)

@app.route("/getProjects/", methods=["GET"])
def getProjects():
    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    Projects = db.Projects
    cursor = Projects.find({})
    list_cur = list(cursor)
    output = dumps(list_cur)
    Client.close()
    return jsonify(user_data=output)

# HWSets
@app.route("/HWSets/<setInfo>", methods=["GET"])
# return statement in form of <whether successfull>_<HWSet capacity>_<HWSet availability>
# <setInfo> either in form:
#   to just retrieve data about availability and capacity: 
#       <setName (either HWSet1 or 2)>_data
#   to either checkin or checkout:
#       <setName (either HWSet1 or 2)>_<key: either checkin, checkout>_<ProjectID>_<qty>
def newProject(projectInfo: str):
    separated = projectInfo.split('_')
    setName = separated[0]
    key = separated[1]

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    HWSets = db.HWSets
    search = HWSets.find_one({"Name": setName})
    
    #The HWSet (either HWSet 1 or 2 hasn't been created yet)
    if search is None:
        hwSet0 = HWSet.HWSet()
        newSet = {
            "Name" : setName,
            "HWSet" : hwSet0}

        HWSets.insert_one(newSet)
        Client.close()
        data = "true" + str(hwSet0.get_capacity()) + "_" + str(hwSet0.get_availability())
        return jsonify(HWSetData=data)

    else:
        #get HWSet object
        hwSet0 = search["HWSet"]

        # just getting capacity and availability
        if key == "data":
            Client.close()
            data = str(hwSet0.get_capacity()) + "_" + str(hwSet0.get_availability())
            return jsonify(HWSetData=data)

        else:
            projectID = separated[2]
            qty = separated[3]
            success = 0

            if key == "checkout":
                success = hwSet0.check_out(projectID, qty)
            if key == "checkin":
                success = hwSet0.check_out(projectID, qty)

            # if checkin or checkout successful    
            if success == 0:
                HWSets.update_one(
                    {"Name": setName},
                    {'$set' : { 'HWSet' : hwSet0 }})
                Client.close()
                data = "true" + str(hwSet0.get_capacity()) + "_" + str(hwSet0.get_availability())
                return jsonify(HWSetData=data)
            else:
                Client.close()
                data = "false" + str(hwSet0.get_capacity()) + "_" + str(hwSet0.get_availability())
                return jsonify(HWSetData=data)  
    
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
