import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const linkCls = "hover:text-(--color-amber) transition-colors py-2 md:py-0";
  const btnCls =
    "bg-(--color-amber) text-(--color-navy-dark) font-semibold px-3 py-1.5 rounded-md hover:brightness-95 transition text-center";

  return (
    <header className="bg-(--color-navy) text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-lg sm:text-xl font-bold tracking-tight">
          Online<span className="text-(--color-amber)">Job</span>
          <span className="text-white">Portal</span>
        </Link>

        {/* hamburger (below md) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 rounded-md hover:bg-white/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav
          className={`${open ? "flex" : "hidden"} md:flex absolute md:static top-full left-0 right-0 md:top-auto
            flex-col md:flex-row md:items-center gap-1 md:gap-5 lg:gap-6
            bg-(--color-navy) md:bg-transparent px-4 sm:px-6 md:px-0 pb-4 md:pb-0
            border-t border-white/10 md:border-0 shadow-lg md:shadow-none text-sm font-medium`}
        >
          <Link to="/jobs" className={linkCls}>Browse Jobs</Link>

          {user?.role === "candidate" && (
            <Link to="/my-applications" className={linkCls}>My Applications</Link>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link to="/post-job" className={linkCls}>Post a Job</Link>
              <Link to="/my-jobs" className={linkCls}>My Job Posts</Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-3 mt-2 pt-3 border-t border-white/20 md:mt-0 md:pt-0 md:border-t-0 md:pl-4 md:border-l">
              <span className="text-xs uppercase tracking-wide bg-white/10 px-2 py-1 rounded-full">
                {user.role}
              </span>
              <button onClick={handleLogout} className={btnCls}>Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-3 mt-2 pt-3 border-t border-white/20 md:mt-0 md:pt-0 md:border-t-0 md:pl-4 md:border-l">
              <Link to="/login" className={linkCls}>Login</Link>
              <Link to="/register" className={btnCls}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
