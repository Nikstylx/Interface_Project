import './App.css';
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-3">
        <h1>Welcome to Library Tracker</h1>

        <LoginForm />
        <RegisterForm />
      </div>
    </>
  );
}

export default App;
