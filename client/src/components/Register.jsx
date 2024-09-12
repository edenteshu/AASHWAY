import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      console.log("Registration response:", response.data);

      // Simulate login after registration
      const loginResponse = await axios.post(
        "http://localhost:5000/api/login",
        { username, password }
      );
      console.log("Login response after registration:", loginResponse.data);

      // Store the token
      const token = loginResponse.data.token;
      localStorage.setItem("token", token);
      window.location.reload(); // Reload to update the UI
    } catch (error) {
      alert("Error registering user");
      console.error("Register error:", error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 bg-orange-200">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">Register</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
