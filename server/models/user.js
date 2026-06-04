const users = [
    {
        userId: 12345,
        userName: "cathy123",
        password: "bestPswd12"
    },
    {
        userId: 67890,
        userName: "johnDoe",
        password: "johnsPswd34"
    },
    {
        userId: 54321,
        userName: "janeSmith",
        password: "janesPswd56"
    }
];

// Function to get ALL users
let getUsers = () => users;

//Need to export to allow access
module.exports = { getUsers };