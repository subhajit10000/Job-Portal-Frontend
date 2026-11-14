import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPostedJobs, deleteJob } from "../../api/jobApi";

export default function MyJobPosts() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getMyPostedJobs();
      setJobs(res.data.data);
    } catch (err) {
      setError("Could not load your job posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job posting? This cannot be undone.")) return;
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((j) => j._id !== jobId));
    } catch (err) {
      alert("Could not delete job. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-(--color-navy)">
            My Job Posts
          </h1>
          <p className="text-gray-500 mt-1">Manage the roles you've posted.</p>
        </div>
        <Link
          to="/post-job"
          className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-4 py-2 rounded-md hover:brightness-95 transition text-center"
        >
          + Post New Job
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-(--color-danger)">{error}</p>}
      {!loading && jobs.length === 0 && (
        <p className="text-gray-500">You haven't posted any jobs yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-(--color-border) rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <h3 className="font-display font-bold text-(--color-navy)">{job.title}</h3>
              <p className="text-sm text-gray-500">
                {job.location} {job.jobType && `· ${job.jobType}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              <Link
                to={`/my-jobs/${job._id}/applicants`}
                className="px-3 py-1.5 rounded-md border border-(--color-border) hover:border-(--color-navy) hover:text-(--color-navy) transition"
              >
                View Applicants
              </Link>
              <button
                onClick={() => handleDelete(job._id)}
                className="px-3 py-1.5 rounded-md border border-red-200 text-(--color-danger) hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
