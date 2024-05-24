import React, { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

const initialVal = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialVal);
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://admin-backend-deploy-gozo.onrender.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Success:", result);
      setIsSignup(false);
      alert("Signup successful");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Signup failed. Please try again.");
    }

    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isSignup ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
          {message && (
            <div className="mb-4 text-red-500 text-center">{message}</div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mb-2">
              Name:
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </label>
            <label className="mb-2">
              Email:
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            Existing User?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Signup;
