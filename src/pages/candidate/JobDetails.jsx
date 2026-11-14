import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../api/jobApi";
import { applyToJob } from "../../api/applicationApi";
import { useAuth } from "../../context/AuthContext";
export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data.data);
      } catch (err) {
        setError("Job not found.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    setApplying(true);
    setError("");
    try {
      await applyToJob(id, { coverLetter });
      setMessage("Application submitted successfully!");
      setCoverLetter("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit application.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <p className="text-gray-500 px-4 sm:px-6 py-6 sm:py-10">Loading job...</p>;
  if (!job) return <p className="text-(--color-danger) px-4 sm:px-6 py-6 sm:py-10">{error || "Job not found."}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-(--color-navy)">{job.title}</h1>
      <p className="text-gray-500 mt-1">
        {job.company} {job.location && `· ${job.location}`}
      </p>

      <div className="flex flex-wrap gap-2 my-4 text-xs">
        {job.jobType && (
          <span className="bg-(--color-bg) border border-(--color-border) px-2 py-1 rounded-full">
            {job.jobType}
          </span>
        )}
        {job.salary && (
          <span className="bg-(--color-bg) border border-(--color-border) px-2 py-1 rounded-full">
            💰 {job.salary}
          </span>
        )}
      </div>

      <div className="bg-white border border-(--color-border) rounded-xl p-4 sm:p-6 mt-6">
        <h2 className="font-display font-bold text-lg mb-2">Description</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line break-words">{job.description}</p>

        {job.requirements && (
          <>
            <h2 className="font-display font-bold text-lg mt-5 mb-2">Requirements</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line break-words">{job.requirements}</p>
          </>
        )}
      </div>

      {(!user || user.role === "candidate") && (
        <div className="bg-white border border-(--color-border) rounded-xl p-4 sm:p-6 mt-6">
          <h2 className="font-display font-bold text-lg mb-3">Apply for this job</h2>

          {message && (
            <div className="bg-green-50 border border-green-200 text-(--color-success) text-sm px-3 py-2 rounded-md mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-(--color-danger) text-sm px-3 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleApply} className="flex flex-col gap-3">
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              placeholder="Add a short cover letter (optional)"
              className="w-full border border-(--color-border) rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-amber) outline-none"
            />
            <button
              type="submit"
              disabled={applying}
              className="bg-(--color-amber) text-(--color-navy-dark) font-semibold px-4 py-2 rounded-md hover:brightness-95 transition disabled:opacity-50 self-start w-full sm:w-auto"
            >
              {applying ? "Submitting..." : user ? "Apply Now" : "Log in to Apply"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
