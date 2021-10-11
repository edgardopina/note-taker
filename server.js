// The apiRoutes and htmlRoutes require() statements will read the index.js files in each of the
// directories indicated.This mechanism works the same way as directory navigation does in a
// website: If we navigate to a directory that doesn't have an index.html file, then the contents
// are displayed in a directory listing. But if there's an index.html file, then it is read and its
// HTML is displayed instead. Similarly, with require(), the index.js file will be the default
// file read if no other file is provided, which is the coding method we're using here.
const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');

const express = require('express'); // gets express.js modules

// use heroku environment variable (port 80/443) if it is set OR use 3001
const PORT = process.env.PORT || 3001;

const app = express(); // instanciate express.js

// MIDDLEWARE - app.use() functions

// express.urlencoded - parse incoming string or array data from POST
// It takes incoming POST data and converts it to key/value pairings that can be accessed
// in the req.body object. The extended: true option set inside the method call informs
// our server that there may be sub-array data nested in it as well, so it needs to look
// as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));

// express.json - parse incoming JSON data from POST
// It takes incoming POST data in the form of JSON and parses it into the req.body JavaScript
// object. Both of the above middleware functions need to be set up every time you create a
// server that's looking to accept POST data.
app.use(express.json());

// express.static('<location>') - makes all files in <location> static resources
// for our case all our front-end code can now be accessed without having a
// specific endpoint created for it (style.css, script.js, etc).
app.use(express.static('./Develop/public'));

// This is our way of telling the server that any time a client navigates to <ourhost>/api,
// the app will use the router we set up in apiRoutes.If / is the endpoint, then the router
// will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// server listener, awaits for GET, POST, DELETE, etc. requests
app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}`);
});
