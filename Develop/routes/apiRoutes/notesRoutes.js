const router = require('express').Router();
const uid = require('uid2');
const fs = require('fs');
const path = require('path');

const { filterByQuery, findById, createNewNote } = require('../../lib/notes');

const { notes } = require('../../db/db.json'); // Database - connects to db.json

router.get('/notes', (req, res) => {
   let results = notes;
   console.log(req.query);
   if (req.query) {
      results = filterByQuery(req.query, results);
   }
   res.json(results);
});

// GET by req.params
router.get('/notes/:id', (req, res) => {
   const result = findById(req.params.id, notes);
   if (result) {
      res.json(result);
   } else {
      res.send(404);
   }
});

router.post('/notes', (req, res) => {
   // if any data in req.body is incorrect, send 400 error back
   // or better if data is not submitted if it is not properly submitted
   // in zookeeper we used a validateAnimal(req.body) function
   // HERE the form does NOT submit body if fields are empty; call back 'handleRenderSaveBtn'
   // therefore, there is no need for validation function

   // this is the VALIDATION function (the check for NOT empty)
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

router.delete('/notes/:id', (req, res) => {
   // notes path needed /:id in order for it to work
   const id = req.params.id; // from newly generated data id
   //
   const noteIndex = notes.findIndex((element) => element.id === id);
   notes.splice(noteIndex, 1); // splice method to remove selected index in our array

   // Synchronously write (in this case "remove")
   fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'), //
      JSON.stringify({ notes }, null, 2) // keeping data formatted just as before.
   );
   res.json(notes); // ?? to send data as JSON response? But where?
});

module.exports = router;
