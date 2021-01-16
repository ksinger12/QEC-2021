from flask import request, make_response, jsonify, session
import json
import uuid

from app.modules.database import Data
from algorithm import simulation

def create_data():
    post_data = request.form
    if not post_data:
        post_data = request.get_json()

    # save data to db
    db_entry = post_data
    Data.insert_one(db_entry)

    # Do calcuations
    income = post_data.get("income")
    expenses = post_data.get("expenses")
    principleCheq = 0
    principleSav = 0
    monthCount = 24 # this will do predictions for the next 2 years

    if(post_data.get("isDemo") is not None):
        income = {
            'Money From Home': {'type': 'monthly', 'value': 100},
            'Loans': {'type': 'yearly', 'value': 10000},
            'Scholarships': {'type': 'semester', 'value': 4500},
            'Job': {'type': 'monthly', 'value': 0}
        }
        expenses = {
            'Rent': {'type': 'monthly', 'value': 650},
            'Food': {'type': 'monthly', 'value': 250},
            'Tuition': {'type': 'semester', 'value': 4000},
            'Savings': {'type': 'monthly', 'value': 0},
            'Car Payments': {'type': 'monthly', 'value': 0},
            'Car Insurance': {'type': 'yearly', 'value': 2000},
            'Utilities': {'type': 'monthly', 'value': 80},
            'Internet': {'type': 'monthly', 'value': 10},
            'Entertainment': {'type': 'monthly', 'value': 20}
        }

    checking_balance, savings_balance, gic, gicMature, incomeMonthly, expensesMonthly = simulation(income, expenses, principleCheq, principleSav, monthCount)

    data = {
        "checking_balance": checking_balance,
        "savings_balance": savings_balance,
        "gic": gic,
        "incomeMonthly": incomeMonthly,
        "expensesMonthly": expensesMonthly,
    }
    responseObject = {
        'status' : 'Success',
        'data' : data,
    }
    return make_response(jsonify(responseObject)), 200
