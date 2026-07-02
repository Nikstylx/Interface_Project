function Home() {
  return (
    <div className="container mt-5">

      <div className="card shadow-sm p-4 mb-4">
        <h1 className="mb-2">🎮 Welcome to Library Tracker</h1>

        <p className="text-muted">
          This is a full-stack web application where you can track your personal video game library.
        </p>

        <p>
          Manage your games, track progress, and view your stats all in one place.
        </p>
      </div>

      <div className="card shadow-sm p-4 mb-4">

        <h4 className="mb-3">What you can do:</h4>

        <div className="row">

          <div className="col-md-6">
            <ul>
              <li>Create an account</li>
              <li>Log in to your profile</li>
              <li>Add games to your library</li>
              <li>Store and view saved games anytime</li>
            </ul>
          </div>

          <div className="col-md-6">
            <ul>
              <li>View total stats (hours, games, rating)</li>
              <li>Update game information</li>
              <li>Delete games from your library</li>
              <li>Manage your personal game collection</li>
            </ul>
          </div>

        </div>

      </div>

      <div className="card shadow-sm p-4 text-center">

        <h5 className="mb-3">Get Started</h5>

        <p className="text-muted">
          Use the navigation bar above to log in or register and start tracking your games.
        </p>

      </div>

    </div>
  );
}

export default Home;