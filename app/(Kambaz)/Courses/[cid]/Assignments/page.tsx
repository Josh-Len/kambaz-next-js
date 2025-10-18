"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";
import * as db from "../../../Database";

type Assignment = { _id: string; 
  title: string; 
  course: string; 
  description: string; 
  points: number; 
  availableAt: string; 
  dueAt: string};

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = (db.assignments as Assignment[]).filter(a => a.course === cid);

  return (
    <div id="wd-assignments">
      <div className="d-flex gap-2 flex-wrap mb-3">
        <input
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="form-control"
          style={{ minWidth: 260 }}
        />
        <button id="wd-add-assignment-group" className="btn btn-outline-secondary">
          + Group
        </button>
        <button id="wd-add-assignment" className="btn btn-primary">
          + Assignment
        </button>
      </div>

      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-0 mb-3 border-0">
          <div
            id="wd-assignments-title"
            className="wd-title p-3 ps-2 bg-secondary text-white d-flex align-items-center justify-content-between"
          >
            <span>ASSIGNMENTS 40% of Total</span>
            <button className="btn btn-light btn-sm">+</button>
          </div>
        </ListGroup.Item>

        <ListGroup className="rounded-0">
          {assignments.map(a => (
            <ListGroup.Item key={a._id} className="wd-assignment-list-item">
              <div>
                <Link
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="wd-assignment-link text-decoration-none fw-semibold"
                >
                  {a.title}
                </Link>
              </div>
              <div className="wd-assignment-meta text-muted">
                Multiple Modules | <b>Not Available until</b> {a.availableAt} |
              </div>
              <div className="wd-assignment-due">
                <b>Due</b> {a.dueAt} | {a.points}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ListGroup>
    </div>
  );
}
