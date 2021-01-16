from flask import request, make_response, jsonify, session
import json
import uuid

from app.modules.database import Data
from algorithm import simulation

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

    ################# map Kyle data to Farley data
    income = db_entry.income
    expenses = db_entry.expenses
    principleCheq = 1000
    principleSav = 1000
    monthCount = 24
    ############################
    checking_balance, savings_balance = simulation(income, expenses, principleCheq, principleSav, monthCount)

    data = {
        checking_balance,
        savings_balance,
    }
    responseObject = {
        'status' : 'Success',
        'data' : data,
    }
    return make_response(jsonify(responseObject)), 200
