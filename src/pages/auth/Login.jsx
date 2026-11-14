import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Call backend login API
      const result = await loginUser(form);

      // Response from backend
      const { user, token } = result.data;

      // Save user and token in AuthContext
      login(user, token);

      // Redirect according to role
      if (user.role === "recruiter") {
        navigate("/my-jobs");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl border border-gray-200 p-5 sm:p-8">
        <h1 className="text-2xl font-bold text-(--color-navy) mb-2">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Login to continue to HirePath.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-600 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--color-navy) text-white py-2 rounded-md font-semibold hover:bg-(--color-navy-dark) transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-(--color-navy) hover:text-(--color-amber)"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}