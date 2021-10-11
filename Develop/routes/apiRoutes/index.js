// We add this middleware to let our app know about the routes in notesRoutes.js
// we're using apiRoutes/index.js as a central hub for all routing functions we may want
// to add to the application.It may seem like overkill with just one exported module, but
// as our application evolves, it will become a very efficient mechanism for managing our
// routing code and keeping it modularized.

const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notesRoutes');

// here we are using the notesRoutes module and could add new modules after it
router.use(notesRoutes);

module.exports = router;
