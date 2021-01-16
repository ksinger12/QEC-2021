from pymongo import MongoClient

client = MongoClient('localhost', 27017)

#Database
db = client.get_database('QEC-2021')

#Collections
Data = db.Data

print('Connected to database successfully')
