from flask import request, make_response, jsonify, session
import json
import uuid

from app.modules.database import Data

def create_data():
    post_data = request.form
    if not post_data:
        post_data = request.get_json()

    data_id = uuid.uuid1().hex

    db_entry = {
        **post_data,
        "id": data_id,
    }

    Data.insert_one(db_entry)
    responseObject = {
        'status' : 'Success',
        'data_id' : data_id,
    }
    return make_response(jsonify(responseObject)), 200
