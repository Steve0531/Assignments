import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
// import "../styles/Login.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    // <div className="login-container">
    //   <h2>Login</h2>
    //   {error && <p className="error">{error}</p>}
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray">
  <Card className="w-full max-w-2xl p-8 shadow-lg">
    <CardHeader>
      <CardTitle className=" flex text-2xl justify-center items-center">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account.
        {error && <p className="error text-red-500">{error}</p>}
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="username" className="font-bold">Username</Label>
        <Input
          id="username"
          type="text"
          required
          className="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password" className="font-bold">Password</Label>
        <Input
          id="password"
          type="password"
          required
          className="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full py-2 text-lg" onClick={handleLogin}>
        Log in
      </Button>
    </CardFooter>
  </Card>
</div>

  );
};

export default Login;
