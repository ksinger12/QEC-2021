#Data input
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

#----------------------------------------------- Constants -----------------------------------------------
INTEREST = 0.01

#----------------------------------------------- Helper functions -----------------------------------------------
#setup_account: Creates an array with values for the balance each month for a chequing or savings account
#monthCount - the number of months to simulate for
def setup_account(monthCount):
    account = []
    for i in range(monthCount):
        account.append(0)
    return account

#is_year: Checks if a given month is the start of a year
#monthN - the current month
def is_year(monthN):
    return monthN % 12 == 0

#is_sem: Checks if a given month is the start of a semester
#monthN - the current month
def is_sem(monthN):
    return monthN % 12 == 0 or monthN % 12 == 4 or monthN % 12 == 8

#get_net_bal: Gets the net balance for a given month
#income - the income data gathered from client
#expenses - the expenses data gathered from client
#monthN - the current month
def get_net_bal(income, expenses, monthN):
    net_bal = 0
    for i in income:
        if (income[i]['type'].lower() == 'monthly'):
            net_bal += income[i]['value']
        if (is_year(monthN) and income[i]['type'].lower() == 'yearly'):
            net_bal += income[i]['value']
        if (is_sem(monthN) and income[i]['type'].lower() == 'semester'):
            net_bal += income[i]['value']
    
    for i in expenses:
        if (expenses[i]['type'].lower() == 'monthly'):
            net_bal -= expenses[i]['value']
        if (is_year(monthN) and expenses[i]['type'].lower() == 'yearly'):
            net_bal -= expenses[i]['value']
        if (is_sem(monthN) and expenses[i]['type'].lower() == 'semester'):
            net_bal -= expenses[i]['value']
    
    return net_bal

#------------------------------------------- Simulation -----------------------------------------------
#simulate_next_month: Simulation step for generating what the chequing and savings values should be for the next month
#prevChequing - the previous month's chequing value
#prevSavings - the previous month's savings value
#income - the income data gathered from client
#expenses - the expenses data gathered from client
#monthN - the current month
def simulate_next_month(prevChequing, prevSavings, income, expenses, monthN):
    balance = prevChequing
    
    net_bal = get_net_bal(income, expenses, monthN)
    next_net_bal = get_net_bal(income, expenses, monthN+1)
    
    newSavings = round(100*(prevSavings * (1 + INTEREST)))/100
    newChequing = balance + net_bal
    
    if (next_net_bal < 0):
        extraBal = newChequing + next_net_bal
    else:
        extraBal = newChequing
    if (newSavings + extraBal >= 0):
        newChequing -= extraBal
        newSavings += extraBal
    else:
        newChequing += newSavings
        newSavings -= newSavings
    
    return newChequing, newSavings

#simulation: Sets up and runs the simulation for a given number of months
#income - the income data gathered from client
#expenses - the expenses data gathered from client
#principleCheq - the principle amount in the chequing account
#principleSav - the priniciple amount in the savings account
#monthCount - the number of months to simulate for
def simulation(income, expenses, principleCheq, principleSav, monthCount):
    chequing = setup_account(monthCount+1)
    savings = setup_account(monthCount+1)
    chequing[0] = principleCheq
    savings[0] = principleSav
    
    for i in range(1, monthCount+1):
        newCheq, newSav = simulate_next_month(chequing[i-1], savings[i-1], income, expenses, i-1)
        chequing[i] = newCheq
        savings[i] = newSav
        
    print(chequing)
    print(savings)
    return chequing, savings