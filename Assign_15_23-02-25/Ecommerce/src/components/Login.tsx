import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import "../styles/Login.css";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      dispatch({ type: "LOGIN", value: { username: user.username, role: user.role } });
      alert(`Welcome ${user.username}`);
      navigate("/home");
      
    } else {
      setError("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
