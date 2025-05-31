import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar:""
    
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if(!form.email.includes("@") || !form.email.endsWith(".com")){
    alert("Please enter valid email");
    return;

  }

  try {
    const res = await axios.post("https://youtube-clone-0qg3.onrender.com/api/auth/register", {
      username: form.username,
      email: form.email,
      password: form.password,
      avatar: form.avatar
    });

    alert("User registered. Go to login.");
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* form for register new user */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <fieldset className="border-t-2 border-green-400 p-2 text-center">
          <legend className="text-green-500 p-1 font-bold">
            Welcome to create a new account
          </legend>
          {/* UserName */}
          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Username<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          {/* Email */}
          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Email<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="email"
            placeholder="email id"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          {/* Password Section*/}
          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Password<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="password"
            placeholder="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <label className="block mb-1  mt-2 text-start font-semibold text-blue-500">
            Confirm Password<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="password"
            placeholder="confirm password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
            required
          />


          {/* Avatar URL */}
          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Avatar URL (optional)
          </label>
          <input
            type="text"
            name="avatar" placeholder="Avatar URL (optional)"
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="submit"
            className="w-full shadow-2xl bg-blue-600 mt-2 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
