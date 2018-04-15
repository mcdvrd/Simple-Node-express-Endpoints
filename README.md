Matthew Dillon
----------------------------------------------------------
README for Simple Blog service using Node.js and express.
----------------------------------------------------------

Overview:
Implement two endpoints:
1. GET /posts
2. POST /post {"title": "XXX", "body": "YYYY"}


Copy (clone) the contents of this repository to a local directory:
```
> git clone https://github.com/mcdvrd/nwea-api.git folder-name
> cd folder-name
```

To install: 
```
> npm install
```

To run the server:
```
> npm start
```
The server will run on port 3000. To change this, set your environment value PORT to the desired value:
```
> export PORT=9001
```

To test the API:

1. Start the server
```
> npm start
```
2. Start the test in another window (shell):
```
> npm test
```

Or using CURL:
```
> curl -H "Content-Type: application/json" -X POST -d '{"title": "title TEST", "body": "body TEST"}' http://localhost:3000/post

> curl -X GET http://localhost:3000/posts
```


Included:

	server.js - Node.js, express application to implment the GET and POST operations on the sqlite database.

	test-api.js - Cleverly-named Javascript application to test the API asynchronously.

