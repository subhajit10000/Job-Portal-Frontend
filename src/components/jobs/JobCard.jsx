import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white border border-(--color-border) rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="min-w-0 break-words">
        <h3 className="font-display text-lg font-bold text-(--color-navy)">
          {job.title}
        </h3>
        <p className="text-sm text-gray-500">{job.company || job.recruiter?.name}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {job.location && (
          <span className="bg-(--color-bg) border border-(--color-border) px-2 py-1 rounded-full">
            📍 {job.location}
          </span>
        )}
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

      <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

      <Link
        to={`/jobs/${job._id}`}
        className="mt-2 text-sm font-semibold text-(--color-navy) hover:text-(--color-amber) transition-colors self-start"
      >
        View details →
      </Link>
    </div>
  );
}
