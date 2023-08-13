const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dbFilePath = path.join(__dirname, '../db/db.json');

router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, notes) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read notes." });
        }
        res.json(JSON.parse(notes));
    });
});

router.post('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, notes) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read notes." });
        }

        let jsonNotes = JSON.parse(notes);
        let newNote = { ...req.body, id: Date.now().toString() }; 
        jsonNotes.push(newNote);

        fs.writeFile(dbFilePath, JSON.stringify(jsonNotes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to save note." });
            }
            res.json(newNote);
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, notes) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read notes." });
        }

        let jsonNotes = JSON.parse(notes);
        jsonNotes = jsonNotes.filter(note => note.id !== req.params.id);

        fs.writeFile(dbFilePath, JSON.stringify(jsonNotes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete note." });
            }
            res.json({ success: true });
        });
    });
});

module.exports = router;