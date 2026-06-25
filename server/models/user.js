// import mongoose 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// create schema for entity
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_At: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
//create model of schema
//Read a user
async function login(username, password) {
    const user = await getUser(username);
    if(!user) throw Error ("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw Error ("Incorrect password");
    return user._doc;
}

//create a user
async function register(username, email, password) {
    const user = await getUser(username);
    if(user) throw Error ("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        username: username,
        email: email,
        password: hashed
    });

    return newUser._doc;
}

//update a user
async function updatePassword(id, password) {
    const user = await User.findByIdAndUpdate(id, { password: password });
    if(!user) throw Error ("User not found");
    return user._doc;
}

//Delete a user
async function deleteUser(id) {
    await User.deleteOne({"_id": id });
}

async function getUserById(id){
    return await User.findById(id);
}


//utility functions
async function getUser(username){
    return await User.findOne({ "username": username });
}


//export all functions we want to access in routes files
module.exports = {
    login,
    register,
    updatePassword,
    deleteUser,
    getUser,
    getUserById 
};