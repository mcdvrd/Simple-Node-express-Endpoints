
README for NWEA blog API code exercise.

Copy (clone) to local directory.

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

> curl -X GET http://localhost:3000/post
```


Included:

	server.js - Node.js, express application to implment the GET and POST operations on the sqlite database.

	test-api.js - Cleverly-named Javascript application to test the API asynchronously.


Matthew Dillon
mcdvrd@gmail.com
-------------------------------------------
