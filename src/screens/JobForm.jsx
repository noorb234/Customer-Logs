import { useState } from "react";
import { Calendar } from "lucide-react";
import { formatDate, formatYear } from "../utils/formatDate";
import { formatPhone } from "../utils/formatPhone";

export default function JobForm({ job, onSave, onCancel }) {
    const [date, setDate] = useState(job?.date ?? new Date().toLocaleDateString("en-CA"));
    const [name, setName] = useState(job?.client ?? "");
    const [phone, setPhone] = useState(formatPhone(job?.phone));
    const [numCams, setNumCams] = useState(job?.cameras ?? "");
    const [cost, setCost] = useState(job?.cost ?? "");

    function handleSave() {
        if (!name.trim()) {
            alert("Enter a customer name");
            return;
        }
        onSave({
            id: job?.id ?? crypto.randomUUID(),
            date,
            client: name.trim(),
            phone,
            cameras: Number(numCams) || 0,
            cost: Number(cost) || 0,
        });
    }

    return (
        <div className="screen">
            <div className="top-bar">
                <button className="text-button" onClick={onCancel}>Cancel</button>
                <span className="top-bar-title">{job ? "Edit job" : "New job"}</span>
                <button className="text-button bold" onClick={handleSave}>Save</button>
            </div>

            <div className="field">
                <label className="field-label" htmlFor="date">Date of project</label>
                <div className="date-field">
                    <span className="date">{formatDate(date)}</span>
                    <span className="year">{formatYear(date)}</span>
                    <Calendar size={20} className="calendar-icon" />
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="date-input"
                    />
                </div>
            </div>

            <div className="field">
                <label className="field-label" htmlFor="client">Customer name</label>
                <input
                    id="client"
                    className="input"
                    type="text"
                    placeholder="Acme Media"
                    autoCapitalize="words"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="phone">Phone number</label>
                <input
                    id="phone"
                    className="input"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="cameras">Number of cameras</label>
                <input
                    id="cameras"
                    className="input"
                    type="number"
                    inputMode="numeric"
                    placeholder="2"
                    value={numCams}
                    onChange={(e) => setNumCams(e.target.value)}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="cost">Cost ($)</label>
                <input
                    id="cost"
                    className="input"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />
            </div>

            <div className="bottom-bar">
                <button className="primary-button" onClick={handleSave}>
                    Save job
                </button>
            </div>
        </div>
    );
}
