import { useState } from "react";
import { Download, Plus, ChevronRight } from "lucide-react";
import { formatDate, formatYear } from "../utils/formatDate";
import { exportJobsToCSV } from "../utils/csv";

export default function JobList({ jobs, onSelect, onAdd }) {
    const [search, setSearch] = useState("");
    const jobCount = jobs.length;
    const total = jobs.reduce((sum, job) => sum + job.cost, 0);
    const filtered = jobs.filter((job) =>
        job.client.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="screen">
            <div className="top-bar">
                <h1 className="page-title">Jobs</h1>
                <button
                    className="icon-button"
                    onClick={() => exportJobsToCSV(jobs)}
                    disabled={jobs.length === 0}
                    aria-label="Export CSV"
                >
                    <Download size={24} />
                </button>
            </div>

            <div className="summary">
                <div className="summary-card">
                    <div className="summary-label">Jobs</div>
                    <div className="summary-value">{jobCount}</div>
                </div>
                <div className="summary-card">
                    <div className="summary-label">Total</div>
                    <div className="summary-value">${total.toLocaleString()}</div>
                </div>
            </div>

            {jobs.length > 0 && (
                <input
                    className="search"
                    type="search"
                    placeholder="Search clients"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            )}

            {sorted.length > 0 && (
                <div className="list">
                    {sorted.map((job) => (
                        <button
                            key={job.id}
                            className="job-row"
                            onClick={() => onSelect(job.id)}
                        >
                            <div>
                                <div className="job-client">{job.client}</div>
                                <div className="job-meta">
                                    <span className="date">{formatDate(job.date)}</span>{" "}
                                    <span className="year">{formatYear(job.date)}</span>
                                    {" · "}
                                    {job.cameras} {job.cameras === 1 ? "cam" : "cams"}
                                </div>
                            </div>
                            <div className="job-cost">
                                ${job.cost.toLocaleString()}
                                <ChevronRight size={18} className="chevron" />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {jobs.length === 0 && (
                <div className="empty">
                    <strong>Add your first job</strong>
                    Tap New job to start your log.
                </div>
            )}

            {jobs.length > 0 && filtered.length === 0 && (
                <div className="empty">No jobs match "{search}"</div>
            )}

            <div className="bottom-bar">
                <button className="primary-button" onClick={onAdd}>
                    <Plus size={20} /> New job
                </button>
            </div>
        </div>
    );
}
