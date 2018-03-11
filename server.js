////////////////////////////////////////////
// server.js
//
// NWEA Blg.db Node.js application
// implments:  GET /posts
//             POST post {title: body:}
//
// To a sqlite database "./blog.db"
//
// Matthew Dillon
// 2018
///////////////////////////////////////////


var sqlite3 = require('sqlite3').verbose();

//var path = require('path');
//var dbPath = path.resolve(__dirname, 'mydb.db')
var db = new sqlite3.Database('./blog.db');

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


app.get('/posts', function(req, res){
    db.all("SELECT * FROM posts", function(err, rows){
        res.json(rows);
    });
});


app.post('/post', function(req, res) {

//  console.log("App:POST req: " + req);

  if(req.body) {

    let st = "INSERT INTO posts (title, body) VALUES(\"" + req.body.title + "\" , \"" + req.body.body + "\")";

  //  console.log("Sending query: " + st);

    db.run(st, function(err, row){
        if (err){
            console.log(err);
            res.status(500);
        }
        else {
            res.status(200);
        }
        res.end();
    });
  }
});

app.listen(port);
console.log("Server listening on port: " + port);
