/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import "./styles.css";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import * as client from "../../../client";

type Assignment = {
  _id?: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  availableAt?: string;
  dueAt?: string;
};

const toInputDate = (d?: string) => {
  if (!d) return "";
  const dt = new Date(d);
  return isNaN(dt.valueOf()) ? "" : dt.toISOString().slice(0, 10);
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const isNew = aid === "new";

  const assignments = useSelector<RootState, Assignment[]>(
    (state) => state.assignmentsReducer.assignments
  );

  const existing = assignments.find(
    (a: Assignment) => a._id === aid && a.course === cid
  );

  const notFound = !isNew && !existing;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [points, setPoints] = useState<number>(existing?.points ?? 100);
  const [dueAt, setDueAt] = useState<string>(toInputDate(existing?.dueAt));
  const [availableAt, setAvailableAt] = useState<string>(
    toInputDate(existing?.availableAt)
  );

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleSave = async () => {
    const base: Omit<Assignment, "_id"> = {
      course: cid,
      title,
      description,
      points,
      availableAt: availableAt || undefined,
      dueAt: dueAt || undefined,
    };

    if (isNew) {
      const created = await client.createAssignmentForCourse(cid, base);
      dispatch(addAssignment(created as any));
      router.push(`/Courses/${cid}/Assignments`);
    } else if (existing) {
      const updated = await client.updateAssignment({
        ...base,
        _id: existing._id,
      });
      dispatch(updateAssignment(updated as any));
      router.push(`/Courses/${cid}/Assignments`);
    }
  };

  return (
    <div id="wd-assignments-editor" className="ae-card">
      {notFound ? (
        <>
          <h2 className="ae-title">Edit Assignment</h2>
          <p className="text-muted">Assignment not found.</p>
        </>
      ) : (
        <>
          <h2 className="ae-title">
            {isNew ? "New Assignment" : "Edit Assignment"}
          </h2>

          <div className="ae-field">
            <label htmlFor="wd-name">Assignment Name</label>
            <input
              id="wd-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="ae-field">
            <label htmlFor="wd-description">Description</label>
            <textarea
              id="wd-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="ae-field">
            <label htmlFor="wd-points">Points</label>
            <input
              id="wd-points"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>

          <div className="ae-row">
            <div className="ae-field">
              <label htmlFor="wd-text-fields-due">Due</label>
              <input
                type="date"
                id="wd-text-fields-due"
                value={dueAt}
                onChange={(e) => setDueAt(e.target.value)}
              />
            </div>
            <div className="ae-field">
              <label htmlFor="wd-available-from">Available From</label>
              <input
                type="date"
                id="wd-available-from"
                value={availableAt}
                onChange={(e) => setAvailableAt(e.target.value)}
              />
            </div>
          </div>

          <hr />

          <div className="ae-actions">
            <button
              className="ae-btn-primary"
              id="wd-save-assignment-click"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
            <button
              className="ae-btn"
              id="wd-cancel-assignment-click"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
