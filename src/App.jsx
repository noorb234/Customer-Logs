import JobList from "./screens/JobList";
import JobForm from "./screens/JobForm";
import JobDetail from "./screens/JobDetail";
import { useState, useEffect } from "react";
import { loadJobs, saveJobs } from "./utils/storage";

export default function App() {
  const [jobs, setJobs] = useState(loadJobs);
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const selectedJob = jobs.find((job) => job.id === selectedId);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  if (view === "list") {
    return (
      <JobList
        jobs={jobs}
        onSelect={(id) => { setSelectedId(id); setView("detail"); }}
        onAdd={() => { setSelectedId(null); setView("form"); }}      />
    );
  }

  if (view === "form") {
    return (
      <JobForm
        job={selectedJob}
        onSave={(savedJob) => {
          const exists = jobs.some((j) => j.id === savedJob.id);
          setJobs(
            exists
              ? jobs.map((j) => (j.id === savedJob.id ? savedJob : j))
              : [...jobs, savedJob]
          );
          setSelectedId(savedJob.id);
          setView(exists ? "detail" : "list");
        }}
        onCancel={() => setView(selectedJob ? "detail" : "list")}
      />
    );
  }

  if (view === "detail" && selectedJob) {
    return (
      <JobDetail
        job={selectedJob}
        onBack={() => setView("list")}
        onEdit={() => setView("form")}
        onDelete={(id) => {
          setJobs(jobs.filter((job) => job.id !== id));
          setView("list");
        }}
      />
    );
  }
}