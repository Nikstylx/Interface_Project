import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import LoginForm from "./components/pages/LoginForm";
import RegisterForm from "./components/pages/RegisterForm";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;