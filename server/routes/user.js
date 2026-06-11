//import any need libraries
const express = require('express');
const User = require('../models/user'); //accesses functions in the user model file
const router = express.Router();

//create all routes to the database
router
 .post('/login', async (req, res) => {
    try { 
        const user = await User.login(req.body.username, req.body.password);
        res.send({...user, password: undefined });
    }catch (error) {
        res.status(401).send({ message: error.message });
    }
})

.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body.username, req.body.email, req.body.password);
        res.send({...user, password: undefined });
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})

.put('/update-password', async (req, res) => {
    try {
        const user = await User.updatePassword(req.body.id, req.body.password);
        res.send({...user, password: undefined });
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})

.delete('/delete-user', async (req, res) => {
    try {
        await User.deleteUser(req.body.id);
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})

//export thr router for use in index.js
module.exports = router;