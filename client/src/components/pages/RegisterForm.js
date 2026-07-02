import "./forms.css";
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/register", { username, email, password }, "POST")
      .then((data) => {
        if (data._id) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/profile");
        } else {
          console.log("Registration failed", data);
        }
      });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Create password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;