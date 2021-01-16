#Data input
income = {
    'Money From Home': {'type': 'm', 'value': 100},
    'Loans': {'type': 'y', 'value': 10000},
    'Scholarships': {'type': 's', 'value': 4500},
    'Job': {'type': 'm', 'value': 0}
}

expenses = {
    'Rent': {'type': 'm', 'value': 650},
    'Food': {'type': 'm', 'value': 250},
    'Tuition': {'type': 's', 'value': 4000},
    'Savings': {'type': 'm', 'value': 0},
    'Car Payments': {'type': 'm', 'value': 0},
    'Car Insurance': {'type': 'y', 'value': 2000},
    'Utilities': {'type': 'm', 'value': 80},
    'Internet': {'type': 'm', 'value': 10},
    'Entertainment': {'type': 'm', 'value': 20}
}

#Constants
INTEREST = 0.01

#Helper functions
def setup_account(monthCount):
    account = []
    for i in range(monthCount):
        account.append(0)
    return account
    
def get_max_net_loss(income, expenses):
    netLoss = 0
    for i in income:
        if (income[i]['type'] == 'm'):
            netLoss -= income[i]['value']
            
    for i in expenses:
        netLoss += expenses[i]['value']
    
    return netLoss

def is_year(monthN):
    return monthN % 12 == 0

def is_sem(monthN):
    pass

def get_net_bal(income, expenses, monthN):
    net_bal = 0
    for i in income:
        if (income[i]['type'] == 'm'):
            net_bal += income[i]['value']
        if (is_year(monthN) and income[i]['type'] == 'y'):
            net_bal += income[i]['value']
        #add in semester
    
    for i in expenses:
        if (expenses[i]['type'] == 'm'):
            net_bal -= expenses[i]['value']
        if (is_year(monthN) and expenses[i]['type'] == 'y'):
            net_bal -= expenses[i]['value']
        #add in semester
    
    return net_bal

#Simulation
def simulate_next_month(prevChequing, prevSavings, income, expenses, monthN):
    balance = prevChequing
    
    net_bal = get_net_bal(income, expenses, monthN)
    next_net_bal = get_net_bal(income, expenses, monthN+1)
            
    print(net_bal)
    
    newSavings = prevSavings * (1 + INTEREST)    
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