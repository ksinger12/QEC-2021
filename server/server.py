from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS
from app.modules.data import create_data

# create and configure the app
app = Flask(__name__)
CORS(app)

# smoke test route
@app.route('/')
def server_test():
    return make_response(jsonify({'result':'success'})), 200

# routes for managing data
@app.route('/data', methods=["POST"])
def data_endpoint():
    return create_data()

if __name__ == "__main__":
    app.run(debug=True, port=3000)
