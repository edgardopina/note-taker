const fs = require('fs');
const path = require('path');

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

function createNewNote(body, notesArray) {
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
   fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify({ notes: notesArray }, null, 2));

   // return finished code to post route for response
   return note;
}

module.exports = { filterByQuery, findById, createNewNote };
