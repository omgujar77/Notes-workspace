import { useState } from "react";

import api from "../api/axios";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await api.post(
        "/auth/login",
        formData
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      login(
        res.data.user,
        res.data.token
      );

      toast.success("Login successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your AI Notes Workspace
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-500 font-semibold"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;