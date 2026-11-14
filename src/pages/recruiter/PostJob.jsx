import { useNavigate } from "react-router-dom";
import { createJob } from "../../api/jobApi";
import JobForm from "../../components/jobs/JobForm";

export default function PostJob() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const response = await createJob(formData);

      console.log("Job created:", response.data);

      alert("Job posted successfully!");

      navigate("/my-jobs");
    } catch (err) {
      console.error("Error:", err);

      if (err.response) {
        alert(err.response.data.message || "Failed to create job.");
      } else if (err.request) {
        alert("Unable to connect to the backend server.");
      } else {
        alert(err.message);
      }

      throw err;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-(--color-navy) mb-2">
        Post a New Job
      </h1>

      <p className="text-gray-500 mb-8">
        Fill in the details below to publish a job opening.
      </p>

      <JobForm
        onSubmit={handleCreate}
        submitLabel="Post Job"
      />
    </div>
  );
}