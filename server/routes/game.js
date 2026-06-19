const express = require('express');
const router = express.Router();

const Game = require('../models/game');

//create a game
router

.post('/create', async (req, res) => {
    try { 
        const game = await Game.createGame(
            req.body.title,
            req.body.genre,
            req.body.platform,
            req.body.releaseYear        
        );
        res.send(game);
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
})
//Get all games available
.get('/all', async (req, res) => {
    try { 
        const games = await Game.getGames();
        res.send(games);
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
})

//update game title
.put('/update-title', async (req, res) => {
    try { 
        const game = await Game.updateTitle(
            req.body.id,
            req.body.title
        )
        res.send(game);
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
})

//delete a game
.delete('/delete', async (req, res) => {
    try { 
        await Game.deleteGame(req.body.id);
        res.send({message: "Game deleted successfully"});
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
});

//export

module.exports = router;