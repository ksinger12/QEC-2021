from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS
from app.modules.data import create_data, read_data, update_data, delete_data

# create and configure the app
app = Flask(__name__)
CORS(app)

# smoke test route
@app.route('/')
def server_test():
    return make_response(jsonify({'result':'success'})), 200

# routes for managing data
@app.route('/data', methods=["POST", "GET", "PUT", "DELETE"])
def data_endpoint():
    if request.method == "POST":
        return create_data()
    elif request.method == "GET":
        return read_data()
    elif request.method == "PUT":
        return update_data()
    elif request.method == "DELETE":
        return delete_data()
    else:
        raise Exception("All methods must be handled")
