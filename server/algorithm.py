# import matplotlib.pyplot as plt

#----------------------------------------------- Constants -----------------------------------------------
INTEREST = 0.0075
GIC_INTEREST = 0.015

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
    incomeVal = 0
    expensesVal = 0
    for i in income:
        if (income[i]['type'].lower() == 'monthly'):
            net_bal += income[i]['value']
            incomeVal += income[i]['value']
        if (is_year(monthN) and income[i]['type'].lower() == 'yearly'):
            net_bal += income[i]['value']
            incomeVal += income[i]['value']
        if (is_sem(monthN) and income[i]['type'].lower() == 'semester'):
            net_bal += income[i]['value']
            incomeVal += income[i]['value']
    
    for i in expenses:
        if (expenses[i]['type'].lower() == 'monthly'):
            net_bal -= expenses[i]['value']
            expensesVal += expenses[i]['value']
        if (is_year(monthN) and expenses[i]['type'].lower() == 'yearly'):
            net_bal -= expenses[i]['value']
            expensesVal += expenses[i]['value']
        if (is_sem(monthN) and expenses[i]['type'].lower() == 'semester'):
            net_bal -= expenses[i]['value']
            expensesVal += expenses[i]['value']
    
    return net_bal, incomeVal, expensesVal

#get_neg_net_bal: Gets the sum of all net balances that are negative
#income - the income data gathered from client
#expenses - the expenses data gathered from client
def get_neg_net_bal(income, expenses):
    out = 0
    for monthN in range(12):
        net_bal, _, _ = get_net_bal(income, expenses, monthN)
        if (net_bal < 0):
            out -= net_bal
    return out

#------------------------------------------- Simulation -----------------------------------------------
#simulate_next_month: Simulation step for generating what the chequing and savings values should be for the next month
#prevChequing - the previous month's chequing value
#prevSavings - the previous month's savings value
#income - the income data gathered from client
#expenses - the expenses data gathered from client
#monthN - the current month
def simulate_next_month(prevChequing, prevSavings, prevGic, gicMature, income, expenses, monthN):
    balance = prevChequing
    
    net_bal, incomeVal, expensesVal = get_net_bal(income, expenses, monthN)
    next_net_bal, _, _ = get_net_bal(income, expenses, monthN+1)
    
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
        
    if (prevGic == 0 and newSavings - get_neg_net_bal(income, expenses) > 0):
        newGic = newSavings - get_neg_net_bal(income, expenses)
        newSavings -= newSavings - get_neg_net_bal(income, expenses)
        newGicMature = monthN % 12
    else:
        if (monthN % 12 == gicMature):
            newSavings += prevGic*(1+GIC_INTEREST)
            newGicMature = -1
            newGic = 0
        else:
            newGic = prevGic
            newGicMature = gicMature
    
    return newChequing, newSavings, newGic, newGicMature, incomeVal, expensesVal

#simulation: Sets up and runs the simulation for a given number of months
#income - the income data gathered from client
#expenses - the expenses data gathered from client
#principleCheq - the principle amount in the chequing account
#principleSav - the priniciple amount in the savings account
#monthCount - the number of months to simulate for
def simulation(income, expenses, principleCheq, principleSav, monthCount):
    chequing = setup_account(monthCount+1)
    savings = setup_account(monthCount+1)
    gic = setup_account(monthCount+1)
    incomeMonthly = setup_account(monthCount)
    expensesMonthly = setup_account(monthCount)
    chequing[0] = principleCheq
    savings[0] = principleSav
    gic[0] = 0
    gicMature = -1
    
    for i in range(1, monthCount+1):
        newCheq, newSav, newGic, newGicMature, newIncome, newExpenses = simulate_next_month(chequing[i-1], savings[i-1], gic[i-1], gicMature, income, expenses, i-1)
        chequing[i] = newCheq
        savings[i] = newSav
        gic[i] = newGic
        gicMature = newGicMature
        incomeMonthly[i-1] = newIncome
        expensesMonthly[i-1] = newExpenses
        
    print(chequing)
    print(savings)
    print(gic)
    return chequing, savings, gic, gicMature, incomeMonthly, expensesMonthly

# c, s, g, m, i, e = simulation(income, expenses, 2500, 1000, 24)

# plt.plot(c, label='Chequing', color='black')
# plt.plot(s, label='Savings', color='green')
# plt.plot(g, label='GIC', color='blue')
# plt.legend()
# plt.show()

# plt.plot(i, label='Income', color='green')
# plt.plot(e, label='Expenses', color='blue')
# plt.legend()
# plt.show()