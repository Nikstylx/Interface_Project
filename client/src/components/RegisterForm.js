import "./forms.css";

function RegisterForm() {
  return (
    <div className="form-container">
      <h2>Register</h2>

      <form>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Enter username" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Create password" />
        </div>

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;