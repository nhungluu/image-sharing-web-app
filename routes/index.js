"use strict";

//var products = require('../data/products.json');
//var credentials = {"user1": "abcxyz", "user2": "12345678"};



module.exports = function(app, connection, bcrypt, saltRounds) {

    //Home Page
    app.get('/', function (req, res) {
        var sql ="SELECT * FROM photos" ;
        connection.query(sql, function(err, results) {
            //console.log(results);
            //add username column to photos database
            if (results.length) {
                var dataToEJS = {
                    title: 'Vice Photo Stream',
                    photos: results
                }
                res.render('pages/index', dataToEJS);
            }
            else {
            res.render('pages/index', {message: "No photos found"});
            }
        });
    });

    //Individual user's page
    app.get('/users/:id', function (req, res) {
        var userID = req.params.id;
        //console.log(userID);
        var sql = "SELECT * FROM photos WHERE userID = '" + userID +"'";
        //add username column to photos database
        connection.query(sql, function(err, results) {
            //console.log(results);
            if (results.length) {
                var dataToEJS = {
                    title: "Photos by " + results[0]["username"],
                    photos: results
                }
                res.render('pages/user_profile', dataToEJS);
            }
            else {
                res.render('pages/user_profile', {message: "This user hasn't uploaded any photos."});
            }
        });
    });

    //Register
    app.get('/register', function (req, res) {
        res.render('pages/register', {title: 'Register', message: ""});
    });

    // Set up routes to post registration details
    app.post('/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var pic = req.files.myPic;
        var picURL = "upload/images/users/" + userID + pic.name;
        //console.log(username);
        //console.log(password)
        //encrypt password before
        bcrypt.hash(password, saltRounds, function (err, hash) {
            var sql ="INSERT INTO photoUsers (username, password, email, pic) VALUES('"+username+ "','"+ hash +"','"+email+"','"+picURL+"')" ;
            connection.query(sql, function(err, results) {
                //console.log(results);
                if (results.length) {
                    var dataToEJS = {
                        title: 'Register',
                        message: 'User registered successfully. Please login with your details.'
                    }
                    //console.log(file);
                    pic.mv('upload/image/users/' + userID + pic.name);
                    res.render('pages/register',dataToEJS);
                } else {
                    res.render('pages/register', {title: 'Register', message: 'Username or Email duplicated. Please try again.'});
                }
            });
        });
    });


    //Comment & likes


    //Login Page
    app.get('/login', function (req, res) {
        res.render('pages/login', {title: 'Login', message: ""});
    });

    // Set up routes to post login details
    app.post('/login', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        //console.log(username);
        //console.log(password);

        //check encrypt password
        var sql = "SELECT * FROM users WHERE username = '" + username + "'";
        connection.query(sql, function(err, results) {
            //console.log(results);
            if (results.length) {
                bcrypt.compare(password, results[0]["password"], function (err, result) {
                    if(result == true) {
                        req.session.user = username;
                        req.session.userID = results[0]["userID"];
                        //console.log("User =" + req.session.user);
                        //req.session.views = req.session.views + 1;
                        res.redirect('/profile');
                    }
                    else {
                        res.render('pages/login', {title: 'Login', message: 'Wrong password. Please try again.'});
                    }
                });
            } else {
                res.render('pages/login', {title: 'Login', message: 'Wrong username. Please try again.'});
            }
        });
    });

    //Logout - session ends
    app.get('/logout', function(req, res){
        req.session.destroy();
        res.redirect("/");
    })

    //Set up route to upload photo to users directory
    app.post('/upload', function(req, res) {
        var file = req.files.myFile;
        var userID = req.session.userID;
        var caption = req.body.caption;
        var description = req.body.description;
        var d = new Date();
        var fileName = d.getFullYear() + (d.getMonth()+1) + d.getDay() +"_" + d.getHours() + d.getMinutes() + d.getSeconds();
        var url = "upload/images/" + userID + "/" + fileName;

        var sql ="INSERT INTO photos (caption, description, userID, url) VALUES('"+caption+ "','"+ description +"','"+userID+"','"+url+"')" ;

        connection.query(sql, function(err, results) {
            //console.log(results);
            if (results.length) {
                var dataToEJS = {
                    title: 'Upload',
                    message: 'Successfully uploaded photo'
                }
                //console.log(file);
                file.mv('upload/images/' + userID +'/' + fileName);
                res.render('pages/upload',dataToEJS);
            } else {
                res.render('pages/upload', {title: 'Upload', message: 'Upload failed. Please try again.'});
            }
        });
    });


    //Individual Photo Page
    app.get('/photos/:id', function (req, res) {
        var photoID = req.params.id;
        //console.log(photoID);
        //join with user & comments to get username, comment list, people who comment, time
        var sql = "SELECT * FROM photos WHERE photoID = '" + photoID + "'";
        connection.query(sql, function(err, results) {
            //console.log(results);
            if (results.length) {
                var dataToEJS = {
                    message: "",
                    photoID: photoID,
                    title: results[0]["caption"],
                    photo: results
                }
                res.render('pages/each_photo', dataToEJS);
            } else {
                res.render('pages/each_photo', {title: 'Photo', message: 'Photo not found.'});
            }
        });
    });

    //Search Page
    app.get('/search/', function (req, res) {
        res.render('pages/search', {title: 'Search'});
        var searchTerm = req.query.term;
        if (searchTerm) {
            res.send('Search results for ' + searchTerm);
        } else {
            res.send('Enter a search term.');
        }
    });

    //Profile
    app.get('/profile', function (req, res) {
        var sql ="SELECT * FROM users WHERE username = '" + req.session.user +"'";
        //join with photos for list of photos
        connection.query(sql, function(err, results) {
            console.log(results);
            if (results.length) {
                console.log(results[0]["firstname"]);
                var dataToEJS = {
                    title: 'Profile',
                    firstname: results[0]["firstname"], //results["firstname"];
                    lastname: results[0]["surname"]
                };
                res.render('pages/profile', dataToEJS);

            } else {
                res.render('pages/login', {title: 'Login', message: 'Login to view your profile.'});
            }
        });
    });

}