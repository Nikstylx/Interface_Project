const express = require('express');
const router = express.Router();
const User = require('../models/user'); //accesses functions in the user model file

const Library = require('../models/library'); //accesses functions in the library model file

//create all routes to the database

//create a new library entry
router
.post('/', async (req, res) => {
    try {
        const entry = await Library.createLibraryEntry(req.body);
        res.status(201).send(entry);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

//get all entries for a user
.get('/:userId', async (req, res) => {
    try {
        const user = await User.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const entries = await Library.getLibraryEntries(req.params.userId);
        if (entries.length === 0) {
            return res.status(200).send({ message: 'No library entries found for this user' });
            data: []
        }
        res.send(entries);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})


//update a library entry
.put('/:id', async (req, res) => {
    try {
        const update = await Library.updateLibraryEntry(req.params.id, req.body);
        res.send(update);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

//delete a library entry
.delete('/:userId/:gameId', async (req, res) => {
    try {
        const result = await Library.deleteLibraryEntry(
            req.params.userId,
            req.params.gameId
        );

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Game not found in library" });
        }

        res.send({ message: "Game removed from library" });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

//export thr router for use in index.js
module.exports = router;