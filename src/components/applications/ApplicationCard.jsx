// Backend stores status in lowercase ("applied", "reviewed", "shortlisted",
// "rejected", "hired") per the Application model's enum. This map controls
// both the display label and the badge color, keyed on the real lowercase value.
const statusConfig = {
  applied: { label: "Applied", tone: "bg-blue-50 text-blue-700 border-blue-200" },
  reviewed: { label: "Reviewed", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  shortlisted: { label: "Shortlisted", tone: "bg-purple-50 text-purple-700 border-purple-200" },
  rejected: { label: "Rejected", tone: "bg-red-50 text-[var(--color-danger)] border-red-200" },
  hired: { label: "Hired", tone: "bg-green-50 text-[var(--color-success)] border-green-200" },
};

// Buttons must send lowercase values — the backend's updateApplicationStatus
// controller rejects anything outside ["applied","reviewed","shortlisted","rejected","hired"].
const actionableStatuses = ["reviewed", "shortlisted", "rejected", "hired"];

export default function ApplicationCard({ application, isRecruiterView, onStatusChange }) {
  const status = application.status || "applied";
  const { label, tone } = statusConfig[status] || statusConfig.applied;

  return (
    <div className="bg-white border border-(--color-border) rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-bold text-(--color-navy)">
            {isRecruiterView ? application.candidate?.name : application.job?.title}
          </h3>
          <p className="text-sm text-gray-500">
            {isRecruiterView ? application.candidate?.email : application.job?.company}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${tone}`}>
          {label}
        </span>
      </div>

      {application.coverLetter && (
        <p className="text-sm text-gray-600 line-clamp-3">{application.coverLetter}</p>
      )}

      {isRecruiterView && onStatusChange && (
        <div className="flex gap-2 mt-1">
          {actionableStatuses.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(application._id, s)}
              className="text-xs font-medium px-2.5 py-1 rounded-md border border-(--color-border) hover:border-(--color-navy) hover:text-(--color-navy) transition"
            >
              Mark {statusConfig[s].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
