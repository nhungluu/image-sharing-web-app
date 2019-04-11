"use strict";

//var products = require('../data/products.json');
//var credentials = {"user1": "abcxyz", "user2": "12345678"};



module.exports = function(app, connection, bcrypt, saltRounds) {

    //Home Page
    app.get('/', function (req, res) {
        var sql ="SELECT * FROM photos" ;
        connection.query(sql, function(err, results) {
            //console.log(sql);
            //console.log(results);
            //add username column to photos database
            if (results.length) {
                var dataToEJS = {
                    title: 'Vice Photo Stream',
                    photos: results
                }
                //console.log(dataToEJS);
                res.render('pages/index', dataToEJS);
            }
            else {
            res.render('pages/index', {title: "Vice Photo Stream", photos: "", message: "No photos found"});
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
                res.render('pages/user_profile', {title: "Vice Photo Stream", message: "This user hasn't uploaded any photos."});
            }
        });
    });

    //Register
    app.get('/register', function (req, res) {
        res.render('pages/register', {title: 'Register', message: ""});
    });

    // Set up routes to post registration details
    app.post('/register', function(req, res) {
        var pic ="";
        var picURL ="";
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;

        if (!req.files) {
           console.log("No files");
        } else {
            pic = req.files.myPic;
            console.log ("myfile: "+req.files.myPic);
            console.log("Username: "+ username +" - Firstname: "+firstname+" - Lastname: "+lastname);
            if (pic) {
                picURL = "public/users/" + username + pic.name;
                console.log(picURL);
            } else {
                picURL = "";
            }
        }

        //console.log(password)
        //encrypt password before
        bcrypt.hash(password, saltRounds, function (err, hash) {

            var sql ="INSERT INTO users (username, password, email, firstname, lastname, picURL) VALUES('"+username+ "','"+ hash +"','"+email+"','"+firstname+"','"+lastname+"','"+picURL+"')" ;
            connection.query(sql, function(err, results) {
                console.log(sql);
                console.log("Results: "+ results);
                if (err) {
                    console.log("error"+err);
                    res.render('pages/register', {title: 'Register', message: 'Username or Email duplicated. Please try again.'});
                } else {
                    console.log("Database updated.");
                    var dataToEJS = {
                        title: 'Register',
                        message: 'User registered successfully. Please login with your details.'
                    }
                    if (pic) {
                        pic.mv(picURL);
                        console.log("File uploaded.");
                    }
                    res.render('pages/login',dataToEJS);
                }
            });
        });
    });



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
                        console.log("User =" + req.session.user);
                        console.log("User =" + req.session.userID);
                        //req.session.views = req.session.views + 1;
                        res.redirect('/');
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

    //Logout - session ends
    app.get('/upload', function(req, res){
        if(req.session.user) {
            res.render('pages/upload', {title: 'Upload Photos', message: ""});
        }
        else res.render('pages/login', {title: 'Upload Photo', message: "Please login to upload photos."});
    })

    //Set up route to upload photo to users directory
    app.post('/upload', function(req, res) {
        var file = req.files.myPic;
        var username = req.session.user;
        var userID = req.session.userID;
        var caption = req.body.caption;
        var description = req.body.description;
        var d = new Date();
        var fileName = d.getFullYear() + (d.getMonth()+1) + d.getDay() +"_" + d.getHours() + d.getMinutes() + d.getSeconds() + file.name;
        var url = "public/images/" + username + fileName;
        console.log("Username: "+ username +" - Caption: "+caption+" - Lastname: "+description);

        var sql ="INSERT INTO photos (caption, description, userID, url) VALUES('"+caption+ "','"+ description +"','"+userID+"','"+url+"')" ;

        connection.query(sql, function(err, results) {
            //console.log(results);
            if(err) {
                res.render('pages/upload', {title: 'Upload', message: 'Upload failed. Please try again.'});
                console.log(err);
            }
            else {
                var dataToEJS = {
                    title: 'Upload',
                    message: 'Successfully uploaded photo'
                }
                //console.log(file);
                file.mv(url);
                res.render('pages/upload',dataToEJS);
            }
        });
    });


    //Individual Photo Page
    app.get('/photos/:id', function (req, res) {
        var photoID = req.params.id;
        var photos; // store data of photo to be displayed and its owner
        var comments; //store data of comments related to the photo to be displayed

        //join users & photos to get user and photo information
        var sql_1 = "SELECT * FROM photos JOIN users WHERE photos.userID = users.userID AND photoID = '" + photoID + "'";
        connection.query(sql_1, function(err, results) {
            //console.log(results);
            if (err) {
                console.log(err);
            }
            else if (results.length > 0) {
                photos = results;
                commentsQuery(); //query for comments related to photos
            }
        });

        //join comments and users to get all comments and users attached to the photo to be displayed
        function commentsQuery() {
            var sql_2 = "SELECT * FROM comments JOIN users WHERE comments.userID = users.userID AND comments.photoID = '" + photoID + "' ORDER BY comments.timeComment DESC";
            connection.query(sql_2, function(err, results) {
                console.log("Comments Query");
                //console.log(results);
                //console.log("Result length: " + results.length);
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length > 0) {
                        comments = results;
                        var dataToEJS = {
                            message: "",
                            photos: photos,
                            comments: comments,
                            title: photos[0]["caption"]
                        }
                        res.render('pages/each_photo', dataToEJS);
                        console.log("dataToEJS");
                        console.log(dataToEJS);
                    }
                    else {
                        var dataToEJS = {
                            message: "",
                            photos: photos,
                            comments: "",
                            title: photos[0]["caption"]
                        }
                        res.render('pages/each_photo', dataToEJS);
                        console.log("dataToEJS");
                        console.log(dataToEJS);
                    }
                }
            });
        }
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
    app.get('/profile/:id', function (req, res) {
        var userID = req.params.id;
        var users;
        var photos;
        var sql_1 ="SELECT * FROM users WHERE users.userID = '" + userID +"'";
        var sql_2 = "SELECT * FROM photos WHERE photos.userID = '" + userID +"'";
        //join with photos for list of photos
        connection.query(sql_1, function(err, results) {
            console.log(results);
            if (err){
                console.log(err);
            }
            else if (results.length > 0){
                users = results[0];
                connection.query(sql_2, function(err, results) {
                    console.log(results);
                    if (err) {
                        console.log(err);
                    }
                    else {
                        photos = results;
                        var dataToEJS = {
                            title: 'Profile',
                            userdata: users,
                            photodata: photos
                        };
                        console.log(dataToEJS);
                        res.render('pages/profile', dataToEJS);
                    }
                });

            }
        });
    });

}