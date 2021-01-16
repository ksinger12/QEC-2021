# QBudge
This project was developed for Queen's Engineering Competition 2021 by Andrew Farley, Kyle Singer, Joseph Grosso, and Andrew Fryer.

## Run Backend
First, ensure that Mongo is installed and running locally, and that python and pip are installed.
Then, navigate to the server directory:
`cd server`
Install dependencies:
`pip3 i -r requirements.txt`
Run server:
`python3 server.py`

## Run Front-end
First, ensure that node and npm are installed.
Then, navigate to the client directory:
`cd Client`
Install dependencies:
`npm i`
Run development server:
`npm run start`

## API Tests
Currently, the project has only one integration test, which is located at
`/server/test.py` and can be run with `python3 /server/test/py`.
