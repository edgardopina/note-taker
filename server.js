const express = require('express');

// use heroku environment variable (port 80/443) if it is set OR use 3001
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./Develop/db/db.json');

function filterByQuery(query, notesArray) {
   let filteredResults = notesArray;
   if (query.title) {
      filteredResults = filteredResults.filter((note) => note.title === query.title);
   }
   return filteredResults;
}

app.get('/api/notes', (req, res) => {
   let results = notes;
   console.log(req.query);
   if (req.query) {
      results = filterByQuery(req.query, results);
      // results = results;
   }
   res.json(results);
});

app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}`);
});
