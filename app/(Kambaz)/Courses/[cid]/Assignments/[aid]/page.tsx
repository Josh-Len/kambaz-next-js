"use client";

import "./styles.css";
import { useParams } from "next/navigation";
import * as db from "../../../../Database"; // adjust the path if needed

type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  availableAt?: string; // ISO or human-readable
  dueAt?: string;       // ISO or human-readable
  untilAt?: string;     // optional (if you add it later)
};

const toInputDate = (d?: string) => {
  if (!d) return "";
  const dt = new Date(d);
  return isNaN(dt.valueOf()) ? "" : dt.toISOString().slice(0, 10); // YYYY-MM-DD
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignment = (db.assignments as Assignment[]).find(
    (a) => a._id === aid && a.course === cid
  );

  if (!assignment) {
    return (
      <div id="wd-assignments-editor" className="ae-card">
        <h2 className="ae-title">Edit Assignment</h2>
        <p className="text-muted">Assignment not found.</p>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="ae-card">
      <h2 className="ae-title">Edit Assignment</h2>

      <div className="ae-field">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue={assignment.title} />
      </div>

      <div className="ae-field">
        <label htmlFor="wd-description">Description</label>
        <textarea
          id="wd-description"
          rows={4}
          defaultValue={assignment.description ?? ""}
        />
      </div>

      <div className="ae-field">
        <label htmlFor="wd-points">Points</label>
        <input
          id="wd-points"
          type="number"
          defaultValue={assignment.points ?? 100}
        />
      </div>

      <div className="ae-row">
        <div className="ae-field">
          <label htmlFor="wd-assignment-groups">Assignment Group</label>
          <select id="wd-assignment-groups" defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
          </select>
        </div>

        <div className="ae-field">
          <label htmlFor="wd-display-grade">Display Grade As</label>
          <select id="wd-display-grade" defaultValue="Percentage">
            <option>Percentage</option>
          </select>
        </div>
      </div>

      <div className="ae-field">
        <label htmlFor="wd-submission-type">Submission Type</label>
        <select id="wd-submission-type" defaultValue="Online">
          <option>Online</option>
        </select>
      </div>

      <div className="ae-field">
        <span className="ae-label">Online Entry Options</span>
        <div className="ae-checks">
          <label><input type="checkbox" id="wd-entryop-txt" /> Text Entry</label>
          <label><input type="checkbox" id="wd-entryop-url" /> Website URL</label>
          <label><input type="checkbox" id="wd-entryop-rec" /> Media Recordings</label>
          <label><input type="checkbox" id="wd-entryop-ann" /> Student Annotations</label>
          <label><input type="checkbox" id="wd-entryop-file" /> File Uploads</label>
        </div>
      </div>

      <div className="ae-field">
        <label htmlFor="wd-text-assign-to">Assign to</label>
        <input type="text" defaultValue="Everyone" id="wd-text-assign-to" />
      </div>

      <div className="ae-row">
        <div className="ae-field">
          <label htmlFor="wd-text-fields-due">Due</label>
          <input
            type="date"
            id="wd-text-fields-due"
            defaultValue={toInputDate(assignment.dueAt)}
          />
        </div>
        <div className="ae-field">
          <label htmlFor="wd-available-from">Available From</label>
          <input
            type="date"
            id="wd-available-from"
            defaultValue={toInputDate(assignment.availableAt)}
          />
        </div>
        <div className="ae-field">
          <label htmlFor="wd-available-until">Until</label>
          <input
            type="date"
            id="wd-available-until"
            defaultValue={toInputDate(assignment.dueAt)}
          />
        </div>
      </div>

      <hr />

      <div className="ae-actions">
        <button className="ae-btn-primary">Save</button>
        <button className="ae-btn">Cancel</button>
      </div>
    </div>
  );
}
