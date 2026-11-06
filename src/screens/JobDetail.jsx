import { ChevronLeft, Phone, MessageCircle, Trash2 } from "lucide-react";
import { formatDate, formatYear } from "../utils/formatDate";
import { formatPhone, phoneDigits } from "../utils/formatPhone";

function initials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
}

export default function JobDetail({ job, onBack, onEdit, onDelete }) {
    function handleDelete() {
        if (window.confirm(`Delete the job for ${job.client}?`)) {
            onDelete(job.id);
        }
    }

    return (
        <div className="screen">
            <div className="top-bar">
                <button className="text-button" onClick={onBack}>
                    <ChevronLeft size={24} /> Jobs
                </button>
                <button className="text-button" onClick={onEdit}>Edit</button>
            </div>

            <div className="detail-hero">
                <div className="avatar">{initials(job.client)}</div>
                <h1 className="detail-name">{job.client}</h1>
                <p className="detail-cost">${job.cost.toLocaleString()}</p>
            </div>

            {job.phone && (
                <div className="contact-buttons">
                    <a href={`tel:${phoneDigits(job.phone)}`}>
                        <Phone size={22} /> Call
                    </a>
                    <a href={`sms:${phoneDigits(job.phone)}`}>
                        <MessageCircle size={22} /> Text
                    </a>
                </div>
            )}

            <div className="list">
                <div className="job-row">
                    <span className="row-label">Date</span>
                    <span className="row-value">
                        <span className="date">{formatDate(job.date)}</span>{" "}
                        <span className="year">{formatYear(job.date)}</span>
                    </span>
                </div>
                <div className="job-row">
                    <span className="row-label">Phone</span>
                    <span className="row-value">
                        {job.phone ? <a href={`tel:${phoneDigits(job.phone)}`}>{formatPhone(job.phone)}</a> : "—"}
                    </span>
                </div>
                <div className="job-row">
                    <span className="row-label">Cameras</span>
                    <span className="row-value">{job.cameras}</span>
                </div>
                <div className="job-row">
                    <span className="row-label">Cost</span>
                    <span className="row-value">${job.cost.toLocaleString()}</span>
                </div>
            </div>

            <button className="delete-button" onClick={handleDelete}>
                <Trash2 size={20} /> Delete job
            </button>
        </div>
    );
}
