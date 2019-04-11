"use strict";

//Create Express Server
var express = require('express');
var routes = require('./routes/index.js');
var port = 3000;
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var io = require('socket.io')(server);

var connection = mysql.createConnection({
    host: "localhost", // the hostname of your MySQL server
    user: "root",
    password: "root",
    database: "luun_db" // the name of your database
});

connection.connect( function(err) {
    if (err) {
        console.log("Error connecting to Database"+ err);
    } else {
        console.log("Connected to Database");
    }
});

app.use('/public', express.static(process.cwd() + '/public'));
app.set("view engine", "ejs");

// Create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: true}));

//Use fileupload
app.use(fileUpload());

//Sessions
app.use(session({
    secret: "crmorytp8vyp98p%&ADIB66^^&fjdfdfaklfdhf",
    resave: false,
    saveUninitialized: true,
    cookie: { MaxAge: 24 * 60 * 60 * 1000 }
}));

//Middleware to make username & userID available in all templates
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.userID = req.session.userID;
    next();
});

//Set-up Routes
routes(app, connection, bcrypt, saltRounds);

//Set up Socket.io handler
io.on('connection', function (socket) {
    console.log('A user connected');

    //new comment
    socket.on('cmt', function(data) {
        //Update database
        console.log(data);
        var sql_1 = "INSERT INTO comments (userID, content, photoID) VALUES('"+data.userID + "','"+ data.comment +"','"+ data.photoID +"')" ;
        connection.query(sql_1,function(err,results){
            if(err) throw err;
            console.log('Updated comment database');
            console.log(results);

        });

        //Send new comment to client to load
        var sql_3 = "SELECT * FROM comments JOIN users WHERE comments.userID = users.userID AND comments.photoID = '" + data.photoID + "' AND comments.userID = '"+data.userID+"' ORDER BY comments.commentID DESC";
        connection.query(sql_3, function(err, results) {
            console.log("Latest comment query");
            if (err) {
                console.log(err);
            }
            else if (results.length > 0) {
                var databack = results[0];
                console.log("Data Back.");
                console.log(databack);
                socket.emit('newcmt', databack);
                //Send message to everyone else on the page
                socket.broadcast.emit('newcmt', databack);
            }
        });

        //Update photos database with new comment count and display new number of comments
        data.cmtCount += 1;
        var sql_2 = "UPDATE photos SET cmtCount = '"+data.cmtCount+"' WHERE photoID = '"+data.photoID+"'" ;
        connection.query(sql_2,function(err,results){
            if(err) throw err;
            console.log('Updated comment count');
            //console.log(results);
            //Send new comment no
            socket.emit('pluscmt', data.cmtCount);
            //Send message to everyone else on the page
            socket.broadcast.emit('pluscmt', data.cmtCount);
        });
    })

    socket.on('like', function(data) {
        //Update database
        //console.log("Like initiated");
        //console.log(data);
        data.like +=1;
        //console.log(data.like);
        var sql_2 = "UPDATE photos SET likeCount = '"+ data.like +"' WHERE photoID = '"+ data.photoID + "'";
        connection.query(sql_2,function(err,results){
            if(err) throw err;
            //console.log('Like updated in database');
            //console.log(results);
            //Send new comment to client
            socket.emit('newlike', data.like);
            //Send message to everyone on the page
            socket.broadcast.emit('newlike', data.like);
        });
    })

});

//Starting Server
server.listen(port);
console.log("Server running on http://localhost:" + port);





