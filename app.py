
from distutils.log import debug
from mailcap import findmatch
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from pymongo import MongoClient
from bson.json_util import dumps
import json
from bson import json_util
import ssl
import HWSet
# comment out on deployment
# from flask_cors import CORS
from user import User   

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="./build", static_url_path="/")

# comment out on deployment
# CORS(app)
mongoPass = "T32bfrH0L678xseI"
# c = MongoClient(f"mongodb+srv://2team:{mongoPass}@finalproject.njqba.mongodb.net/FinalProject?retryWrites=true&w=majority") 
# db = c.FinalProject
Client=MongoClient("mongodb+srv://josephhuynh:Jh032001@cluster0.rtq6j.mongodb.net/HWSet?retryWrites=true&w=majority")
db = Client.Cluster0
UserAndPass = db.UserAndPass
Projects = db.Projects
HWSet = db.HWSet


@app.route('/user/createAcc/', methods = ["POST"])
def createAcc():

    UserAndPass = db.UserAndPass

    requestData = json.loads(request.data)
    payload = requestData['data']

    username = payload['username']
    password = payload['password']

    user = User(username, password)

    # collection = db.Users
    findMatch = UserAndPass.find_one({'username': username})
    if(findMatch == None):
        print("no match", flush=True)
    elif(findMatch != None):
        print("match", flush=True)
        return "user already exists"
    
    #if findMatch != None:
     #   return 'existing user', 400

    try:
        UserAndPass.insert_one(user.dbSend())
    except Exception as e:
        print(e, flush = True)
        return 500
    else:
        return "Success"
    return 404

@app.route('/user/login/', methods = ["POST"])
def login():
    UserAndPass = db.UserAndPass

    requestData = json.loads(request.data)
    payload = requestData['data']

    username = payload['username']
    password = payload['password']

    user = User(username, password)

    # collection = db.Users

    findMatch = UserAndPass.find_one({'username': username})

    print(findMatch, flush=True)
    if (findMatch == None):
        return "invalid username"
    elif (findMatch['password'] == password):
        return "success"
    else:
        return "invalid password"


@app.route("/newProject/<projectInfo>", methods=["GET"])
def newProject(projectInfo: str):
    Projects = db.Projects
    HWSet = db.HWSet

    separated = projectInfo.split('!')
    projectName = separated[0]
    projectID = separated[1]
    projectDescription = separated[2]

    f = open("stored.txt", "r")
    projectUser = f.read()

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
    Projects = db.Projects
    
    cursor = Projects.find({})
    list_cur = list(cursor)
    output = dumps(list_cur)
    Client.close()
    return jsonify(user_data=output)

@app.route("/joinProject/<projectInfo>", methods=["GET"])
def joinProject(projectInfo: str):
    UserAndPass = db.UserAndPass
    Projects = db.Projects

    projectID = projectInfo

    f = open("stored.txt", "r")
    projectUser = f.read()

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
            UserAndPass.update_one({'Username': projectUser}, {'$push':{ "Projects": {"Name" :search["Name"], "HWSet1" : 0, "HWSet2" : 0} }})
            output = "Successfully joined"
        else:
            Client.close()
            output = "User already joined"
        return jsonify(successfullyCreated=output)

@app.route("/getHW/", methods=["GET"])
def getHW():
    HWSet = db.HWSet

    cursor = HWSet.find({})
    list_cur = list(cursor)
    output = dumps(list_cur)
    Client.close()
    return jsonify(user_data=output)

@app.route("/checkout/<checkoutInfo>", methods=["GET"])
def checkout(checkoutInfo: str):
    UserAndPass = db.UserAndPass
    Projects = db.Projects
    HWSet = db.HWSet

    separated = checkoutInfo.split('_')
    hwSetName = separated[0]
    quantity = int(separated[1])
    project = separated[2]

    f = open("stored.txt", "r")
    projectUser = f.read()

    search = HWSet.find_one({"Name": hwSetName}, {"Availability": 1})
    
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

                user = UserAndPass.find_one({'Username': projectUser})
                projectList = user["Projects"]
                for project in projectList:
                    if project["Name"] == search["Name"]:
                        project[hwSetName] += quantity
                        break
                
                UserAndPass.update_one({'Username': projectUser}, {'$set':{ "Projects": projectList }})
                
                output = "Successfully Checked Out"
                Projects = db.Projects
                Projects.update_one({'ID' : project}, {'$inc': {'HWSets Checked Out': quantity}})
    Client.close()
    return jsonify(successfullyCreated=output)

@app.route("/checkin/<checkinInfo>", methods=["GET"])
def checkin(checkinInfo: str):
    UserAndPass = db.UserAndPass
    Projects = db.Projects
    HWSet = db.HWSet

    separated = checkinInfo.split('_')
    hwSetName = separated[0]
    quantity = int(separated[1])
    project = separated[2]

    f = open("stored.txt", "r")
    projectUser = f.read()

    search = HWSet.find_one({"Name": hwSetName}, {project: 1})
    
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
                avail = HWSet.find_one({"Name": hwSetName}, {"Availability": 1})
                newAvail = avail["Availability"] + quantity
                HWSet.update_one({'Name': hwSetName}, {'$inc': {project: (quantity * -1)}})
                HWSet.update_one({'Name': hwSetName}, {'$set': {'Availability': newAvail}})
                output = "Successfully Checked In"

                user = UserAndPass.find_one({'Username': projectUser})
                projectList = user["Projects"]
                for project in projectList:
                    if project["Name"] == search["Name"]:
                        project[hwSetName] -= quantity
                        break
                
                UserAndPass.update_one({'Username': projectUser}, {'$set':{ "Projects": projectList }})
                Projects = db.Projects
                Projects.update_one({'ID' : project}, {'$inc': {'HWSets Checked Out': (quantity * -1)}})
    Client.close()
    return jsonify(successfullyCreated=output)

@app.route("/getAProject/<projectInfo>", methods=["GET"])
def getAProject(projectInfo: str):
    Projects = db.Projects

    projectID = projectInfo

    search = Projects.find_one({"ID": projectID})
    
    if search is None:
        output = "project doesn't exist"
    else:
        output = search
    Client.close()

    return jsonify(project_data=output)

@app.route("/getUserInfo/", methods=["GET"])
def getUserInfo():
    UserAndPass = db.UserAndPass

    f = open("stored.txt", "r")
    projectUser = f.read()
    projectList = []

    user = UserAndPass.find_one({'Username': projectUser})
    projectList = user["Projects"]
    output = {
        "Name": projectUser,
        "Projects": projectList
    }

    Client.close()
    return jsonify(user_data=output)    
      
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
