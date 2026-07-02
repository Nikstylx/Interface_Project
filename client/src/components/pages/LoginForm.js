import "./forms.css";
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const { username, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetchData("/user/login", { username, password }, "POST")
      .then((data) => {
        if (data._id) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/profile");
        } else {
          setError("Login failed");
        }
      })
      .catch((err) => {
        console.log(err);

        const message =
          err?.error ||
          err?.message ||
          "Login failed";

        setError(message);
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;