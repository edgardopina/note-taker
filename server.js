const express = require('express'); // gets express.js modules
const uid = require('uid2'); // creates unique Ids
// import { uid } from 'uid'; // creates unique Ids

const fs = require('fs');
const path = require('path');

// use heroku environment variable (port 80/443) if it is set OR use 3001
const PORT = process.env.PORT || 3001;
const app = express(); // instanciate express.js

// MIDDLEWARE

// express.urlencoded - parse incoming string or array data from POST
// It takes incoming POST data and converts it to key/value pairings that can be accessed
// in the req.body object. The extended: true option set inside the method call informs
// our server that there may be sub-array data nested in it as well, so it needs to look
// as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data from POST
// It takes incoming POST data in the form of JSON and parses it into the req.body JavaScript
// object. Both of the above middleware functions need to be set up every time you create a
// server that's looking to accept POST data.
app.use(express.json());

const { notes } = require('./Develop/db/db.json'); // connects to db.json

//#region GET
function filterByQuery(query, notesArray) {
   let filteredResults = notesArray;
   if (query.title) {
      filteredResults = filteredResults.filter((note) => note.title === query.title);
   }
   return filteredResults;
}

function findById(id, notesArray) {
   const result = notesArray.filter((note) => note.id === id)[0]; // first element
   return result;
}

// GET by req.query
app.get('/api/notes', (req, res) => {
   let results = notes;
   console.log(req.query);
   if (req.query) {
      results = filterByQuery(req.query, results);
      // results = results;
   }
   res.json(results);
});

// GET by req.params
app.get('/api/notes/:id', (req, res) => {
   const result = findById(req.params.id, notes);
   if (result) {
      res.json(result);
   } else {
      res.send(404);
   }
});
//#endregion GET

//#region POST
function createNewNote(body, notesArray) {
   console.log(body);
   // our function's main code will go here!
   const note = body;
   notesArray.push(note);
   // synchronous version of fs.writeFile() and doesn't require a callback function
   // If we were writing to a much larger data set, the asynchronous version would be better.
   // use the method path.join() to join the value of __dirname, which represents the
   // directory of the file we execute the code in, with the path to the animals.json file.
   // save the JavaScript array data as JSON, so we use JSON.stringify() to convert it. The
   // other two arguments used in the method, null and 2, are means of keeping our data formatted.
   // The null argument means we don't want to edit any of our existing data; if we did, we could
   // pass something in there. The 2 indicates we want to create white space between our values
   // to make it more readable. If we were to leave those two arguments out, the entire
   // animals.json file would work, but it would be really hard to read.
   fs.writeFileSync(path.join(__dirname, './Develop/db/db.json'), JSON.stringify({ notes: notesArray }, null, 2));

   // return finished code to post route for response
   return note;
}

// POST one record
app.post('/api/notes', (req, res) => {
   // if any data in req.body is incorrect, send 400 error back
   // or better if data is not submitted if it is not properly submitted
   // in zookeeper we used a validateAnimal(req.body) function
   // HERE the form does NOT submit body if fields are empty; call back 'handleRenderSaveBtn'
   // therefore, there is no need for validation function

   console.log('line 98 !req.body.title, !req.body.text', !req.body.title, !req.body.text);
   if (!req.body.title || !req.body.text) {
      res.status(400).send('The note is not properly formatted.');
   } else {
      // req.body is where our incoming content will be
      req.body.id = uid(6);
      // add note to json file and notesArray
      const note = createNewNote(req.body, notes);
      res.json(note); // results just to test the API
   }
});

//#endregion POST

app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}`);
});
