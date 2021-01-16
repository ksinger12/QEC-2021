# run as a script while server also running

import requests
import json

s = requests.Session()

base_url = "http://localhost:3000"

url = base_url + "/data"

testData = {
    "date": "",
    "homeMoney": {
        "value": "",
        "type": "" #M, S, Y
    },
    "loans": {
        "value": "",
        "type": "" #M, S, Y
    },
    "scholarships": {
        "value": "",
        "type": "" #M, S, Y
    },
    "salary": {
        "value": "",
        "type": "" #M, S, Y
    },
}
res = s.post(url = url, data=testData)
assert(res.status_code == 200)
print(res.json())
