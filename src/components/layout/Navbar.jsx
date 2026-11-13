import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-(--color-navy) text-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          Online<span className="text-(--color-amber)">Job</span><span className="text-white">Portal</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/jobs" className="hover:text-(--color-amber) transition-colors">
            Browse Jobs
          </Link>

          {user?.role === "candidate" && (
            <Link to="/my-applications" className="hover:text-(--color-amber) transition-colors">
              My Applications
            </Link>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link to="/post-job" className="hover:text-(--color-amber) transition-colors">
                Post a Job
              </Link>
              <Link to="/my-jobs" className="hover:text-(--color-amber) transition-colors">
                My Job Posts
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <span className="text-xs uppercase tracking-wide bg-white/10 px-2 py-1 rounded-full">
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-3 py-1.5 rounded-md hover:brightness-95 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <Link to="/login" className="hover:text-(--color-amber) transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-3 py-1.5 rounded-md hover:brightness-95 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
