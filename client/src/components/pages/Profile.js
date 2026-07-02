import { useState, useEffect } from "react";
import { fetchData } from "../../main.js";
import "./forms.css";

const Profile = () => {
  const [game, setGame] = useState({
    title: "",
    genre: "",
    platform: "",
    releaseYear: ""
  });

  const [games, setGames] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  // LOAD games from backend
  useEffect(() => {
    fetchData("/game/all", {}, "GET")
      .then((data) => setGames(data))
      .catch(console.log);
  }, []);

  const onChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  // CREATE game in backend
  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/game/create", game, "POST")
      .then((newGame) => {
        setGames([...games, newGame]);
      })
      .catch(console.log);

    setGame({
      title: "",
      genre: "",
      platform: "",
      releaseYear: ""
    });
  };

  return (
    <div className="container mt-4">

      <h2>Profile</h2>
      <h4>Welcome, {username}</h4>

      <hr />

      <h3>Add Game</h3>

      <form onSubmit={onSubmit}>

        <input
          className="form-control mb-2"
          placeholder="Game Title"
          name="title"
          value={game.title}
          onChange={onChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Genre"
          name="genre"
          value={game.genre}
          onChange={onChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Platform"
          name="platform"
          value={game.platform}
          onChange={onChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Release Year"
          name="releaseYear"
          value={game.releaseYear}
          onChange={onChange}
          required
        />

        <button className="btn btn-success w-100">
          Add Game
        </button>
      </form>

      <hr />

      <h3>My Games</h3>

      {games.map((g) => (
        <div key={g._id} className="card p-3 mb-2">
          <h5>{g.title}</h5>
          <p>Genre: {g.genre}</p>
          <p>Platform: {g.platform}</p>
          <p>Year: {g.releaseYear}</p>
        </div>
      ))}

    </div>
  );
};

export default Profile;