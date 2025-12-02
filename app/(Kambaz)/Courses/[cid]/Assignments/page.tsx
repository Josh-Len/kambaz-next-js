/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment, setAssignments } from "./reducer"; // 🔥 make sure this path is right
import { useEffect } from "react";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

    const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
  };



  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  const handleDelete = (event: React.MouseEvent, assignmentId: string) => {
    event.preventDefault();
    event.stopPropagation();

    const ok = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (!ok) return;

    onRemoveAssignment(assignmentId);
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex gap-2 flex-wrap mb-3">
        <input
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="form-control"
          style={{ minWidth: 260 }}
        />
        <button
          id="wd-add-assignment-group"
          className="btn btn-outline-secondary"
          type="button"
        >
          + Group
        </button>

        <Link
          id="wd-add-assignment"
          href={`/Courses/${cid}/Assignments/new`}
          className="btn btn-primary"
        >
          + Assignment
        </Link>
      </div>

      <ListGroup className="rounded-0">
        <ListGroup className="rounded-0">
          {courseAssignments.map((a: any) => (
            <ListGroup.Item
              key={a._id}
              as={Link}
              href={`/Courses/${cid}/Assignments/${a._id}`}
              action
              className="wd-assignment-list-item text-decoration-none text-reset"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold text-primary">{a.title}</div>
                  <div className="wd-assignment-meta text-muted">
                    Multiple Modules |{" "}
                    <b>Not Available until</b> {a.availableAt} |
                  </div>
                  <div className="wd-assignment-due">
                    <b>Due</b> {a.dueAt} | {a.points}
                  </div>
                </div>

                <button
                  type="button"
                  id="wd-delete-assignment-click"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={(e) => handleDelete(e, a._id)}
                >
                  Delete
                </button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ListGroup>
    </div>
  );
}
