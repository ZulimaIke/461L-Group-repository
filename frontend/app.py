from flask import Flask, jsonify
from flask.helpers import send_from_directory

# comment out on deployment to heroku
from flask_cors import CORS

app = Flask(__name__, static_folder="frontend/build", static_url_path="")

# comment out on deployment
CORS(app)


@app.route("/username/<username>", methods=["GET"])
def result(username: str = None):


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run()