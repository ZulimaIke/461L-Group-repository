from flask import Flask, jsonify
from flask.helpers import send_from_directory
from pymongo import MongoClient
from bson.json_util import dumps
import ssl

# comment out on deployment
#from flask_cors import CORS

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="frontend/build", static_url_path="")

# comment out on deployment
#CORS(app)

@app.route("/create_acc/<userAndPass>", methods=["GET"])
def create_acc(userAndPass: str):
    separated = userAndPass.split('!')
    username = separated[0]
    password = separated[1]
    username = username.lower()
    password = password.lower()

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    UserAndPass = db.UserAndPass
    search = UserAndPass.find_one({"Username": username})
    if search is None:
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
    separated = userAndPass.split('!')
    username = separated[0]
    password = separated[1]
    username = username.lower()
    password = password.lower()

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
        f = open("stored.txt", "w")
        f.write(username)
        f.close()
        Client.close()
        output = "true"
        return jsonify(loginSuccess=output)

    
@app.route("/newProject/<projectInfo>", methods=["GET"])
def newProject(projectInfo: str):
    separated = projectInfo.split('!')
    projectName = separated[0]
    projectID = separated[1]
    projectDescription = separated[2]

    f = open("stored.txt", "r")
    projectUser = f.read()

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    Projects = db.Projects
    search = Projects.find_one({"ID": projectID})
    if search is None:
        newProject = {
        "Name" : projectName,
        "ID" : projectID,
        "Description" : projectDescription,
        "Users" : [projectUser],
        "HWSets Checked Out" : 0}
        Projects.insert_one(newProject)
        HWSet = db.HWSet
        HWSet.update_one({'Name': 'HWSet1'}, {'$set': {projectID: 0}})
        HWSet.update_one({'Name': 'HWSet2'}, {'$set': {projectID: 0}})
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

@app.route("/joinProject/<projectInfo>", methods=["GET"])
def joinProject(projectInfo: str):
    projectID = projectInfo

    f = open("stored.txt", "r")
    projectUser = f.read()

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = Client.Cluster0
    Projects = db.Projects
    search = Projects.find_one({"ID": projectID})
    newSearch = Projects.find_one({
        "$and": [
            {"ID": projectID},
            {"Users": projectUser}
        ]
    })
    if search is None:
        Client.close()
        output = "ID does not exist"
        return jsonify(successfullyCreated=output)
    else:
        if newSearch is None:
            Projects.update_one({'ID': projectID}, {'$push': {'Users': projectUser}})
            output = "Successfully joined"
        else:
            Client.close()
            output = "User already joined"
        return jsonify(successfullyCreated=output)

@app.route("/getHW/", methods=["GET"])
def getHW():
    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
    db = Client.Cluster0
    HWSet = db.HWSet
    cursor = HWSet.find({})
    list_cur = list(cursor)
    output = dumps(list_cur)
    Client.close()
    return jsonify(user_data=output)

@app.route("/checkout/<checkoutInfo>", methods=["GET"])
def checkout(checkoutInfo: str):
    separated = checkoutInfo.split('_')
    hwSetName = separated[0]
    quantity = int(separated[1])
    project = separated[2]

    f = open("stored.txt", "r")
    projectUser = f.read()

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = Client.Cluster0
    HWSet = db.HWSet
    search = HWSet.find_one({"Name": hwSetName}, {"Availability": 1});
    
    if search is None:
        Client.close()
        output = "HWSet doesn't exist"
        return jsonify(successfullyCreated=output)
    else:
        Projects = db.Projects
        newSearch = Projects.find_one({
        "$and": [
            {"ID": project},
            {"Users": projectUser}
            ]
        })
        if newSearch is None:
            output = "Join Project Before Checking Out HW"
        else:
            if (search["Availability"] - quantity) < 0:
                output = "Not Enough Availability For Checkout Quantity"
            else:
                newAvail = search["Availability"] - quantity
                HWSet.update_one({'Name': hwSetName}, {'$inc': {project: quantity}})
                HWSet.update_one({'Name': hwSetName}, {'$set': {'Availability': newAvail}})
                output = "Successfully Checked Out"
                Projects = db.Projects
                Projects.update_one({'ID' : project}, {'$inc': {'HWSets Checked Out': quantity}})
    Client.close()
    return jsonify(successfullyCreated=output)

@app.route("/checkin/<checkinInfo>", methods=["GET"])
def checkin(checkinInfo: str):
    separated = checkinInfo.split('_')
    hwSetName = separated[0]
    quantity = int(separated[1])
    project = separated[2]

    f = open("stored.txt", "r")
    projectUser = f.read()

    Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = Client.Cluster0
    HWSet = db.HWSet
    search = HWSet.find_one({"Name": hwSetName}, {project: 1});
    
    if search is None:
        Client.close()
        output = "HWSet doesn't exist"
        return jsonify(successfullyCreated=output)
    else:
        Projects = db.Projects
        newSearch = Projects.find_one({
        "$and": [
            {"ID": project},
            {"Users": projectUser}
            ]
        })
        if newSearch is None:
            output = "You Have Not Joined This Project"
        else:
            if (search[project] - quantity) < 0:
                output = "Error: Checking In More Than Checked Out"
            else:
                avail = HWSet.find_one({"Name": hwSetName}, {"Availability": 1});
                newAvail = avail["Availability"] + quantity
                HWSet.update_one({'Name': hwSetName}, {'$inc': {project: (quantity * -1)}})
                HWSet.update_one({'Name': hwSetName}, {'$set': {'Availability': newAvail}})
                output = "Successfully Checked In"
                Projects = db.Projects
                Projects.update_one({'ID' : project}, {'$inc': {'HWSets Checked Out': (quantity * -1)}})
    Client.close()
    return jsonify(successfullyCreated=output)
    
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
