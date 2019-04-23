# Overview
This is an online image sharing web app. Users can register Image Sharing Web app built with NodeJS, Express, EJS. Real-time comment &amp; like with socket.io.
# Technology Stack
- NodeJS, JavaScript - Core platform & web tools
- Express, Express-session, Express-fileupload, Body-parser  — Common HTTP server features
- EJS - Front-end view
- Socket.io — Real-time comment & like
- mySQL - Database
# Directory Layout
./
├── /public/                      # Frontend interface files \
│&nbsp;   ├── /images/                  # images uploaded by user\
│ &nbsp;  ├── /stylesheets/             # Frontend css style\
│&nbsp;     ├── /style.css              # Master css style\
│&nbsp;   ├── /users/                   # Profile pictures uploaded by users\
├── /routes/                      # Express endpoints\
│ &nbsp;  ├── /index.js/                # Express endpoints\
├── /views/                       # Frontend rendered views in ejs\
│&nbsp;   ├── /pages/                   # All ejs rendered views\
│ &nbsp;    ├── /each_photo.ejs         # Display one photo with user information, likes, and comments \
│&nbsp;     ├── /index.ejs              # Homepage with a list of photos \
│ &nbsp;    ├── /login.ejs              # Login page\
│&nbsp;     ├── /profile.ejs            # Personal profile of each user with a list of photos uploaded\
│&nbsp;     ├── /register.ejs           # Register new account\
│ &nbsp;    ├── /upload.ejs/            # Upload new photo\
│&nbsp;   ├── /partials/                # Individual parts for all ejs views\
│&nbsp;     ├── /footer.ejs             # footer\
│&nbsp;     ├── /header.ejs             # header \
│ &nbsp;    ├── /nav.ejs                # navigation bar\
│&nbsp;     ├── /scripts.ejs            # scripts\
├── server.js                     # Node.js server (entry point)\
├── package.json                  # List of project dependencies\

# Database
- users: information of all registered user with userID being primary key
- photos: information of all photos uploaded with photoID being primary key; linked to users by userID
- comments: information of all comments made with commentID being primary key; linked to users by userID, and linked to photos by photoID
