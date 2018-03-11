////////////////////////////////////////////////////
// test-api.js
//
// Node application to test our NWEA Blog API
//
// Asynchronous Promise-based test of the two
// operations defined by our endpoints:
//     GET /posts - return list of posts
//	   POST /post - add a new blog to our db
//
// Matthew Dillon
// March 10, 2018
////////////////////////////////////////////////////

const request = require('request');

let port = process.env.PORT || 3000;

let basePath = "http://localhost:" + port;
let baseApi = "/posts";
let baseMethod = "GET";
let api = basePath + baseApi;
let orgCount = 0;

console.log("\n\nStarting NWEA Blog API test:");

requestApi(api, baseMethod, null)
.then(function(results) {

	console.log("\n1) GET /posts returned: " + results);

	let posts = JSON.parse(results);
	console.log("Found " + posts.length + " posts.");

	orgCount = posts.length;
	let timeStamp = new Date();

	// Now POST new 
	basePath = "http://localhost:3000";
	baseApi = "/post";
 	baseMethod = "POST";
 	api = basePath + baseApi;
 	let lt = "Test @" + timeStamp.toString();

 	let testPost = {
 		"title": lt, 
 		"body": "Test Body"
 	};

 	console.log("\n\n2) Test-Api: POST: " + JSON.stringify(testPost));

	return requestApi(api, baseMethod, testPost);

  })
  .then(function (results) {

  	console.log("POST completed - no errors.");

	basePath = "http://localhost:" + port;
	baseApi = "/posts";
	baseMethod = "GET";

	api = basePath + baseApi;

	return requestApi(api, baseMethod, null);

  })
  .then(function(results) {

  	console.log("\n\n3) GET /posts returned: " + results);

  	let posts = JSON.parse(results);

	if(posts.length === (orgCount + 1)) {

		console.log("\n* Success! * There are now " + posts.length + " posts. That is the expected number.")
	} else {

		console.log("\nFAILURE: Found " + posts.length + " posts. This is not the expected number");
	}

  })
  .catch(console.log.bind(console));



//////////////////////////////////////////////////////////////////
// requestApi
//
//  api:    url to call - eg: http://localhost/hello
//  method: GET, POST, DELETE
//  body:   Payload to send to server
//  @Returns: Promise.resolve(results) or 
//            Promise.reject(err)
//
// Function to return a Promise encapsulating an http request. 
// Since http requests do not block, creating a sequence
// of operations requires a blocking construct; like the
// ES6 Promise().
// By making this return a Promise(); the function-call can
// be "chained" using requestApi().then(). This will 
// create a "chain" of operations to be completed sequentially.
//
/////////////////////////////////////////////////////////////////
function requestApi(api, method, body) {

  api = api || "/posts";
  method = method || "GET";
  body = body || null;

  return new Promise(function(resolve, reject) {

  	let myHeaders = {
      'Content-Type': 'application/json'
    }

    let options = {
      url: api,
      method: method,
      headers: myHeaders
    };

 //   console.error("Sending API request '" + method + "' to '" + options.url + "'.");
    
    /* If there is a body, set the content-type and length headers */
    if (body) {
      options.json = body;
    }
    
 //   console.log("Body: " + body);

    /* Invoke the request */
    request(options,  function(error, response, body) {
      if (error) {
        console.warn('Error "' + options.url + '": ' + error.message);
        return reject(new Error(error.message));
      }

      if (response.statusCode >= 400) {
        return reject(new Error(response.statusCode));
      }

      try {
        return resolve(body);
      } catch (e) {
          console.warn("Unable to parse response: " + e.message);
          console.warn(body);

          return reject(new Error("Unable to parse response: " + e.message));
      }
    });
  });
}



    