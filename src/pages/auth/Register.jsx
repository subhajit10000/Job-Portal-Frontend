import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
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
      // Call register API
      const res = await registerUser(form);

      // Backend response
      const { user, token } = res.data;

      // Save user and token
      login(user, token);

      // Redirect based on role
      if (user.role === "recruiter") {
        navigate("/post-job");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-gray-200 p-5 sm:p-8">
        <h1 className="text-2xl font-bold text-(--color-navy) mb-2">
          Create your account
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Join HirePath as a Candidate or Recruiter.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-600 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
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
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              I am a...
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["candidate", "recruiter"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      role,
                    })
                  }
                  className={`rounded-md border py-2 font-medium capitalize transition ${
                    form.role === role
                      ? "bg-(--color-navy) text-white border-(--color-navy)"
                      : "border-gray-300 hover:border-(--color-navy)"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--color-navy) text-white py-2 rounded-md font-semibold hover:bg-(--color-navy-dark) transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-(--color-navy) hover:text-(--color-amber)"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}