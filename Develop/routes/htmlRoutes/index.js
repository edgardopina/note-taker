const path = require('path');
const router = require('express').Router();

// GET root route (index.html), this block wil NOT be needed after middleware to set 'public' as static
router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// GET /notes route (notes.html)
router.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// GET wildcard routes
// The '*' will act as a wildcard, meaning any route that wasn't previously defined will fall under
// this request and will receive the homepage as the response.Thus, requests for /about or /contact
// or /membership will essentially be the same now.
// IMPORTANT The order of your routes matters! The * route should always come last. Otherwise, 
// it will take precedence over named routes
router.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
