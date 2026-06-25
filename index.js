const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const userRoutes = require('./server/routes/user');
const libraryRoutes = require('./server/routes/library');
const gameRoutes = require('./server/routes/game');

// MongoDB Connection
mongoose.connect(process.env.dbURL)
    .then(() => console.log("DB Connected!!"))
    .catch(error => console.log(error));

app.use(express.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Static files
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/user', userRoutes);
app.use('/library', libraryRoutes);
app.use('/game', gameRoutes);
// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
