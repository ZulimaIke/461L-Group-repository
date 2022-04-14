from flask import Flask, jsonify
from flask.helpers import send_from_directory
from pymongo import MongoClient
import ssl

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
    
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
