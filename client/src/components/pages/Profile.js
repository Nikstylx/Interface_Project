import { useState, useEffect, useCallback } from "react";
import { fetchData } from "../../main.js";
import "./forms.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  const [games, setGames] = useState([]);
  const [library, setLibrary] = useState([]);

  const [showAddLibrary, setShowAddLibrary] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);

  const [form, setForm] = useState({
    gameId: "",
    hoursPlayed: "",
    rating: "",
    status: "Backlog"
  });

  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    platform: "",
    releaseYear: ""
  });

  const [editId, setEditId] = useState(null);

  const [editForm, setEditForm] = useState({
    hoursPlayed: "",
    rating: "",
    status: ""
  });

  const loadLibrary = useCallback(() => {
    if (!user?._id) return;

    fetchData(`/library/${user._id}`, {}, "GET")
      .then((data) => setLibrary(Array.isArray(data) ? data : []))
      .catch(console.log);
  }, [user?._id]);

  // LOAD USER LIBRARY
  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  // LOAD GAMES
  useEffect(() => {
    fetchData("/game/all", {}, "GET")
      .then((data) => setGames(Array.isArray(data) ? data : []))
      .catch(console.log);
  }, []);

  // FORM CHANGE
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onNewGameChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  // ADD TO LIBRARY
  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/library", {
      userId: user._id,
      ...form
    }, "POST")
      .then(() => {
        loadLibrary();

        setForm({
          gameId: "",
          hoursPlayed: "",
          rating: "",
          status: "Backlog"
        });

        setShowAddLibrary(false);
      })
      .catch(console.log);
  };

  // CREATE GAME
  const createNewGame = (e) => {
    e.preventDefault();

    fetchData("/game/create", newGame, "POST")
      .then(() => fetchData("/game/all", {}, "GET"))
      .then((data) => setGames(Array.isArray(data) ? data : []))
      .then(() => {
        setNewGame({
          title: "",
          genre: "",
          platform: "",
          releaseYear: ""
        });

        setShowNewGame(false);
      })
      .catch(console.log);
  };

  // DELETE FROM LIBRARY
  const deleteFromLibrary = (gameId) => {
    fetchData(`/library/${user._id}/${gameId}`, {}, "DELETE")
      .then(() => {
        loadLibrary();
      })
      .catch(console.log);
  };

  // EDIT START
  const startEdit = (entry) => {
    setEditId(entry._id);

    setEditForm({
      hoursPlayed: entry.hoursPlayed || "",
      rating: entry.rating || "",
      status: entry.status || "Backlog"
    });
  };

  const onEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    fetchData(`/library/${id}`, editForm, "PUT")
      .then(() => {
        loadLibrary();
        setEditId(null);
      })
      .catch(console.log);
  };

  // STATS
  const totalGames = library.length;

  const totalHours = library.reduce(
    (sum, entry) => sum + (Number(entry.hoursPlayed) || 0),
    0
  );

  const avgRating =
    library.length > 0
      ? (
          library.reduce(
            (sum, entry) => sum + (Number(entry.rating) || 0),
            0
          ) / library.length
        ).toFixed(1)
      : 0;

  return (
    <div className="container mt-4">

      <h2>Profile</h2>
      <h5>Welcome, {username}</h5>

      <div className="card p-3 mb-3">
        <h5>Stats</h5>
        <p>Total Games: {totalGames}</p>
        <p>Total Hours: {totalHours}</p>
        <p>Average Rating: {avgRating}/10</p>
      </div>

      <hr />

      <button
        className="btn btn-dark w-100 mb-2"
        onClick={() => setShowAddLibrary(!showAddLibrary)}
      >
        {showAddLibrary ? "Hide Add Game" : "➕ Add Game to Library"}
      </button>

      {showAddLibrary && (
        <div className="card p-3 mb-3">

          <form onSubmit={onSubmit}>

            <select
              className="form-control mb-2"
              name="gameId"
              value={form.gameId}
              onChange={onChange}
              required
            >
              <option value="">Select Game</option>
              {games.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.title}
                </option>
              ))}
            </select>

            <input
              className="form-control mb-2"
              name="hoursPlayed"
              placeholder="Hours Played"
              value={form.hoursPlayed}
              onChange={onChange}
            />

            <input
              className="form-control mb-2"
              name="rating"
              placeholder="Rating (1-10)"
              value={form.rating}
              onChange={onChange}
            />

            <select
              className="form-control mb-2"
              name="status"
              value={form.status}
              onChange={onChange}
            >
              <option value="Backlog">Backlog</option>
              <option value="Playing">Playing</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>

            <button className="btn btn-success w-100">
              Add to Library
            </button>
          </form>

          <hr />

          <button
            className="btn btn-outline-primary w-100"
            onClick={() => setShowNewGame(!showNewGame)}
          >
            {showNewGame ? "Close New Game" : "+ Game not listed? Add new game"}
          </button>

          {showNewGame && (
            <div className="mt-3">

              <input
                className="form-control mb-2"
                name="title"
                placeholder="Title"
                value={newGame.title}
                onChange={onNewGameChange}
                required
              />

              <input
                className="form-control mb-2"
                name="genre"
                placeholder="Genre"
                value={newGame.genre}
                onChange={onNewGameChange}
                required
              />

              <input
                className="form-control mb-2"
                name="platform"
                placeholder="Platform"
                value={newGame.platform}
                onChange={onNewGameChange}
                required
              />

              <input
                className="form-control mb-2"
                name="releaseYear"
                placeholder="Release Year"
                value={newGame.releaseYear}
                onChange={onNewGameChange}
                required
              />

              <button
                className="btn btn-primary w-100"
                onClick={createNewGame}
              >
                Create Game
              </button>

            </div>
          )}

        </div>
      )}

      <hr />

      <h4>My Library</h4>

      {library.length === 0 ? (
        <p>No games yet.</p>
      ) : (
        library.map((entry) => (
          <div key={entry._id} className="card p-2 mb-2 shadow-sm">

            <h6>{entry.gameId?.title}</h6>

            <small className="text-muted d-block">
              {entry.gameId?.genre} • {entry.gameId?.platform}
            </small>

            {editId === entry._id ? (
              <>
                <input
                  className="form-control form-control-sm mb-1"
                  name="hoursPlayed"
                  value={editForm.hoursPlayed}
                  onChange={onEditChange}
                />

                <input
                  className="form-control form-control-sm mb-1"
                  name="rating"
                  value={editForm.rating}
                  onChange={onEditChange}
                />

                <select
                  className="form-control form-control-sm mb-1"
                  name="status"
                  value={editForm.status}
                  onChange={onEditChange}
                >
                  <option value="Backlog">Backlog</option>
                  <option value="Playing">Playing</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                </select>

                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => saveEdit(entry._id)}
                >
                  Save
                </button>

                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <small className="d-block">
                  Status: {entry.status} |
                  Hours: {entry.hoursPlayed || 0} |
                  Rating: {entry.rating || 0}/10
                </small>

                <button
                  className="btn btn-sm btn-primary mt-2 me-2"
                  onClick={() => startEdit(entry)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger mt-2"
                  onClick={() => deleteFromLibrary(entry.gameId?._id)}
                >
                  Remove
                </button>
              </>
            )}

          </div>
        ))
      )}

    </div>
  );
};

export default Profile;