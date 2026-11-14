import { useState } from "react";

const initialState = {
  title: "",
  company: "",
  location: "",
  jobType: "Full-time",
  salary: "",
  description: "",
  requirements: "",
};

export default function JobForm({
  initialData,
  onSubmit,
  submitLabel = "Post Job",
}) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) {
      return setError("Job title is required.");
    }

    if (!form.description.trim()) {
      return setError("Job description is required.");
    }

    if (!onSubmit) {
      return setError("Submit function not found.");
    }

    try {
      setLoading(true);

      await onSubmit(form);

      if (!initialData) {
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-3xl mx-auto space-y-5"
    >
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="font-medium">Job Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full mt-1 border rounded px-3 py-2"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Job Type</label>

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Remote</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Salary</label>

          <input
            type="text"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="font-medium">Description *</label>

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full mt-1 border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="font-medium">Requirements</label>

        <textarea
          rows={4}
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}