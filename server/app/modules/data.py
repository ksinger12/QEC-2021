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
    income = post_data.income
    expenses = post_data.expenses
    principleCheq = 0
    principleSav = 0
    monthCount = 24 # this will do predictions for the next 2 years
    checking_balance, savings_balance, gic, gicMature, incomeMonthly, expensesMonthly = simulation(income, expenses, principleCheq, principleSav, monthCount)

    data = {
        checking_balance,
        savings_balance,
        gic,
        incomeMonthly,
        expensesMonthly,
    }
    responseObject = {
        'status' : 'Success',
        'data' : data,
    }
    return make_response(jsonify(responseObject)), 200
