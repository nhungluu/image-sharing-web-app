# Overview
This is an online image sharing web app. Users can register Image Sharing Web app built with NodeJS, Express, EJS. Real-time comment &amp; like with socket.io.
# Technology Stack
- NodeJS, JavaScript - Core platform & web tools
- Express, Express-session, Express-fileupload, Body-parser  — Common HTTP server features
- EJS - Front-end view
- Socket.io — Real-time comment & like
- mySQL - Database
# Directory Layout
.
- ├── /public/                      # Frontend interface files
- │   ├── /images/                  # images uploaded by user
│   ├── /stylesheets/             # Frontend css style
│     ├── /style.css              # Master css style
│   ├── /users/                   # Profile pictures uploaded by users
├── /routes/                      # Express endpoints
│   ├── /index.js/                # Express endpoints
├── /views/                       # Frontend rendered views in ejs
│   ├── /pages/                   # All ejs rendered views
│     ├── /each_photo.ejs         # Display one photo with user information, likes, and comments
│     ├── /index.ejs              # Homepage with a list of photos
│     ├── /login.ejs              # Login page
│     ├── /profile.ejs            # Personal profile of each user with a list of photos uploaded
│     ├── /register.ejs           # Register new account
│     ├── /upload.ejs/            # Upload new photo
│   ├── /partials/                # Individual parts for all ejs views
│     ├── /footer.ejs             # footer
│     ├── /header.ejs             # header 
│     ├── /nav.ejs                # navigation bar
│     ├── /scripts.ejs            # scripts
├── server.js                     # Node.js server (entry point)
├── package.json                  # List of project dependencies

# Database
- users: information of all registered user with userID being primary key
- photos: information of all photos uploaded with photoID being primary key; linked to users by userID
- comments: information of all comments made with commentID being primary key; linked to users by userID, and linked to photos by photoID
