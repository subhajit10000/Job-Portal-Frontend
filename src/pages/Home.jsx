import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const stats = [
  { value: "12,400+", label: "Active job seekers" },
  { value: "3,150+", label: "Companies hiring" },
  { value: "820", label: "Roles posted this week" },
];


const trackerSteps = [
  { label: "Applied", tone: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Reviewed", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Shortlisted", tone: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Hired", tone: "bg-green-50 text-[var(--color-success)] border-green-200" },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-(--color-bg) border border-(--color-border) text-(--color-navy) px-3 py-1 rounded-full mb-5">
            Built for candidates and recruiters
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--color-navy) leading-tight">
            Every application, tracked from first click to offer letter.
          </h1>
          <p className="text-gray-600 mt-5 text-lg max-w-md">
            HirePath connects candidates with real openings and gives recruiters
            a straight line from posting a role to hiring for it — no spreadsheets,
            no guessing where things stand.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {!user && (
              <>
                <Link
                  to="/register"
                  className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-5 sm:px-6 py-3 rounded-md hover:brightness-95 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/jobs"
                  className="border border-(--color-border) text-(--color-navy) font-semibold px-5 sm:px-6 py-3 rounded-md hover:border-(--color-navy) transition"
                >
                  Browse Jobs
                </Link>
              </>
            )}
            {user?.role === "candidate" && (
              <Link
                to="/jobs"
                className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-5 sm:px-6 py-3 rounded-md hover:brightness-95 transition"
              >
                Browse Jobs
              </Link>
            )}
            {user?.role === "recruiter" && (
              <Link
                to="/post-job"
                className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-5 sm:px-6 py-3 rounded-md hover:brightness-95 transition"
              >
                Post a Job
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10 sm:mt-12">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-(--color-navy)">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signature element: live application tracker mock, mirrors the real status pills used across the app */}
        <div className="bg-white border border-(--color-border) rounded-2xl p-4 sm:p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
            Application progress
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 border border-(--color-border) rounded-lg px-3 sm:px-4 py-3">
              <div>
                <p className="font-semibold text-sm text-(--color-navy)">Frontend Developer</p>
                <p className="text-xs text-gray-500">Acme Robotics · Remote</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-green-50 text-(--color-success) border-green-200">
                Hired
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 border border-(--color-border) rounded-lg px-3 sm:px-4 py-3">
              <div>
                <p className="font-semibold text-sm text-(--color-navy)">Product Designer</p>
                <p className="text-xs text-gray-500">Northwind Labs · Bengaluru</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-purple-50 text-purple-700 border-purple-200">
                Shortlisted
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 border border-(--color-border) rounded-lg px-3 sm:px-4 py-3">
              <div>
                <p className="font-semibold text-sm text-(--color-navy)">Backend Engineer</p>
                <p className="text-xs text-gray-500">Fintrail · Pune</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                Applied
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-5">
            {trackerSteps.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1">
                <div className={`h-1.5 flex-1 rounded-full ${i <= 1 ? "bg-(--color-amber)" : "bg-(--color-border)"}`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Every application moves through the same four stages, so nothing sits in limbo.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-y border-(--color-border)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-amber) mb-2">
              For candidates
            </p>
            <h2 className="font-display text-2xl font-bold text-(--color-navy) mb-4">
              Find the role, apply, know where you stand.
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <span className="font-display font-bold text-(--color-amber)">1</span>
                <p className="text-sm text-gray-600">Search open roles by title, company, or location.</p>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-(--color-amber)">2</span>
                <p className="text-sm text-gray-600">Apply directly with a short cover note — no separate account per company.</p>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-(--color-amber)">3</span>
                <p className="text-sm text-gray-600">Track every application's status in one place, from applied to hired.</p>
              </li>
            </ul>
            {!user && (
              <Link to="/register" className="inline-block mt-6 text-sm font-semibold text-(--color-navy) hover:text-(--color-amber)">
                Create a candidate account →
              </Link>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-amber) mb-2">
              For recruiters
            </p>
            <h2 className="font-display text-2xl font-bold text-(--color-navy) mb-4">
              Post a role, review candidates, move fast.
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <span className="font-display font-bold text-(--color-amber)">1</span>
                <p className="text-sm text-gray-600">Post a job with the details candidates actually look for.</p>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-(--color-amber)">2</span>
                <p className="text-sm text-gray-600">See every applicant for each role in a single list.</p>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-(--color-amber)">3</span>
                <p className="text-sm text-gray-600">Move candidates through review, shortlist, and hire with one click.</p>
              </li>
            </ul>
            {!user && (
              <Link to="/register" className="inline-block mt-6 text-sm font-semibold text-(--color-navy) hover:text-(--color-amber)">
                Create a recruiter account →
              </Link>
            )}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-(--color-navy)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to move faster on your next hire — or your next role?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join HirePath today. It takes less than two minutes to set up.
          </p>
          {!user ? (
            <Link
              to="/register"
              className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-8 py-3 rounded-md hover:brightness-95 transition inline-block"
            >
              Create your free account
            </Link>
          ) : (
            <Link
              to={user.role === "recruiter" ? "/post-job" : "/jobs"}
              className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-8 py-3 rounded-md hover:brightness-95 transition inline-block"
            >
              {user.role === "recruiter" ? "Post a Job" : "Browse Jobs"}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
