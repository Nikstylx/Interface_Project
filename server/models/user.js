const users = [
    {
         User_ID: 12345,
        Username: "cathy123",
        Email: "cathy123@gmail.com",
        Password: "bestPswd12",
        Created_At: "2024-05-26"
    },
    {
        User_ID: 67890,
        Username: "johnDoe",
        Email: "johndoe@outlook.com",
        Password: "johnsPswd34",
        Created_At: "2026-02-19"
    },
    {
        User_ID: 54321,
        Username: "janeSmith",
        Email: "janesmith@icloud.com",
        Password: "janesPswd56",
        Created_At: "2026-06-04"
    }
];

// Function to get ALL users
let getUsers = () => users;

//Need to export to allow access
module.exports = { getUsers };