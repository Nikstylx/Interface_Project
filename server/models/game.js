const mongoose = require('mongoose');

//Post game entry schema 
const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    releaseYear: { type: Number, required: true }
});

//model
const Game = mongoose.model('Game', gameSchema);

//create a game entry

async function createGame(title, genre, platform, releaseYear) {
    return await Game.create({ title, genre, platform, releaseYear });
}

//Read a game entry

async function getGames(){
    return await Game.find();
}

//update a game entry
async function updateTitle(id, title){
    return await Game.findByIdAndUpdate(id, { title }, { new: true });
}

//Delete a game entry
async function deleteGame(id){
    return await Game.deleteOne({ _id: id });
}

//export

module.exports = {
    createGame,
    getGames,
    updateTitle,
    deleteGame
};