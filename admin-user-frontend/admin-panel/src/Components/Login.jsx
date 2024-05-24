import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialVal = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialVal);
  const [message, setMessage] = useState("");
  
const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://admin-backend-deploy-gozo.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Success:", result);
      localStorage.setItem("user_token", result.token);
      console.log(result.token);
      alert("Login Successful");
      navigate("/userslist");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
        {message && (
          <div className="mb-4 text-red-500 text-center">{message}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            Email:
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
          <label className="mb-4">
            Password:
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
