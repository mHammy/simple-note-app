// setting up required dependencies
const path = require('path');
const express = require('express');
// setting up router
const router = express.Router();
// getting the notes.html and index.html files
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
// exporting the router
module.exports = router;