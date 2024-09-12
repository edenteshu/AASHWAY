import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    console.log("Token in App.jsx:", token);
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    console.log("No token found, showing login/register forms.");
    return showLogin ? (
      <div className="container mx-auto p-4">
        <Login
          setToken={(token) => {
            console.log("Token set from login:", token);
            setToken(token);
            localStorage.setItem("token", token);
          }}
        />
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => setShowLogin(false)}
            className="text-white bg-amber-300"
          >
            Register
          </button>
        </p>
      </div>
    ) : (
      <div className="container mx-auto p-4">
        <Register />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setShowLogin(true)}
            className="text-white bg-amber-300"
          >
            Login
          </button>
        </p>
      </div>
    );
  }

  console.log("Token exists, showing task management UI.");
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-extrabold text-orange-900 mb-10">
        Task Management App
      </h1>
      <button
        onClick={handleLogout}
        className="bg-green-600 text-white p-2 rounded"
      >
        Logout
      </button>
      <TaskForm token={token} />
      <TaskList token={token} />
    </div>
  );
}

export default App;
