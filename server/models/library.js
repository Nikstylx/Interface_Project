const mongoose = require('mongoose');

//Post Library entry schema 
const librarySchema = new mongoose.Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    status: {
        type: String,
        enum: ['Playing', 'Completed', 'Backlog', 'Dropped'],
        default: 'Backlog'
    },
    hoursPlayed: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

//model
const Library = mongoose.model('Library', librarySchema);

//create a library entry
async function createLibraryEntry(data) {
    const existing = await Library.findOne({
        userId: data.userId,
        gameId: data.gameId
    });

    if (existing) {
        throw new Error("Game already exists in this user's library");
    }

    return await Library.create(data);
}

// read all library entries for a user
async function getLibraryEntries(userId) {
    return await Library.find({ userId: userId })
        .populate("gameId");
}

//update a library entry
async function updateLibraryEntry(id, updateData) {
    return await Library.findByIdAndUpdate(id, updateData, { returnDocument: "after" });
}

//delete a library entry
async function deleteLibraryEntry(userId, gameId) {
    return await Library.deleteOne({
        userId: userId,
        gameId: gameId
    });
}

//export all functions we want to access in routes files
module.exports = {
    createLibraryEntry,
    getLibraryEntries,
    updateLibraryEntry,
    deleteLibraryEntry
};
