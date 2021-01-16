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

def read_data():
    get_data = request.args
    if not get_data:
        get_data = request.get_json()

    data_id = get_data.get("data_id")

    if not data_id:
        responseObject = {
            'status':'fail',
            'message':'must provide data id',
        }
        return make_response(jsonify(responseObject)), 400
    
    results = Data.find_one({
        "id": data_id,
    })

    if not results:
        return make_response(jsonify({"message": "no Data found for that id"})), 406
    
    responseObject = {
        **results,
    }
    return make_response(jsonify(responseObject)), 200

def update_data():
    put_data = request.form
    if not put_data:
        put_data = request.get_json()
    new_entry = make_data_dto(put_data)

    data_id = put_data.get("data_id")

    results = Data.update_one({
        "id": data_id,
    }, {
        "$set": new_entry,
    })

    if results.modified_count != 1:
        return make_response(jsonify({"message": "no Data found for that id"})), 406

    responseObject = {
        'status':'Success',
    }

    return make_response(jsonify(responseObject)), 200

def delete_data():
    get_data = request.args
    if not get_data:
        get_data = request.get_json()

    data_id = get_data.get("data_id")

    if not data_id:
        responseObject = {
            'status':'fail',
            'message':'must provide data id',
        }
        return make_response(jsonify(responseObject)), 400

    results = Data.find_one({
        "id": data_id,
    })

    if results is None:
        return make_response(jsonify({"message": "no Data found for that id"})), 406

    results = Data.delete_one({
        "id": data_id,
    })

    if results.deleted_count != 1:
        return make_response(jsonify({"message": "no Data found for that id"})), 406

    responseObject = {
        'status':'Success',
    }

    return make_response(jsonify(responseObject)), 200
