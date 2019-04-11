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
    password: "123456",
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
    cookie: { maxAge: 60000 }
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

    socket.on('cmt', function(data) {
        //Update database
        var sql_1 = "INSERT INTO comment (username, content, photoID) VALUES('"+data.user + "','"+ data.comment +"','"+ data.photoID +"')" ;
        connection.query(sql_1,function(err,results){
            if(err) throw err;
            console.log('Updated comment database');
            console.log(results);
            //Send new comment to client
            socket.emit('newcmt', data);
            //Send message to everyone else on the page
            socket.broadcast.emit('newcmt', data);
        });

        var sql_2 = "INSERT INTO photo (cmtCount) VALUES('"+data.cmtCount+"')" ;
        connection.query(sql_2,function(err,results){
            if(err) throw err;
            console.log('Updated comment count');
            console.log(results);
            //Send new comment no
            socket.emit('pluscmt', data.cmtCount);
            //Send message to everyone else on the page
            socket.broadcast.emit('pluscmt', data.cmtCount);
        });
    })

    socket.on('like', function(data) {
        //Update database
        var sql_2 = "INSERT INTO photos (photoID, like) VALUES('"+data.photoID + "','"+ data.like +"')" ;
        connection.query(sql_2,function(err,results){
            if(err) throw err;
            console.log('Like updated in database');
            console.log(results);
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





