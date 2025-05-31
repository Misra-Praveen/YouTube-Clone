import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://youtube-clone-0qg3.onrender.com/api/auth/login", form);
      const { token, user } = res.data;

      // Save to Redux and localStorage
      dispatch(loginSuccess(res.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data));


      
      
      alert(`Welcome, ${user.username}!`);
      

      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div>
          <label className="block mb-1  mt-2 text-start font-semibold text-blue-500">
            Email<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1  mt-2 text-start font-semibold text-blue-500">
            Password<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-6 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
