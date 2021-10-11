const router = require('express').Router(); // creates common router
const uid = require('uid2'); // npm package to create unique id's
const fs = require('fs'); // JS package for writeFileSync
const path = require('path'); // JS package to create directory paths

const { createNewNote, deleteNoteById } = require('../../lib/notes');

const { notes } = require('../../db/db.json'); // Database - connects to db.json

// GET by req.query
router.get('/notes', (req, res) => {
   res.json(notes);
});


// POST 
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
      req.body.id = uid(6); // assigns unique id
      const note = createNewNote(req.body, notes); // add note to json file and notesArray
      res.json(note); // results just to test the API
   }
});

// DELETE
router.delete('/notes/:id', (req, res) => {
   // notes path needed /:id in order for it to work
   const id = req.params.id; // from newly generated data id
   deleteNoteById(id, notes); // delete new note in db.json using our module
   res.json(notes); // leaving notes variable unchanged here due to the information it is handling in the array
});

module.exports = router;
