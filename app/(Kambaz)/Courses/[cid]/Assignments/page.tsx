"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Assignments() {
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
        <ListGroupItem className="p-0 mb-3 border-0">
          <div
            id="wd-assignments-title"
            className="wd-title p-3 ps-2 bg-secondary text-white d-flex align-items-center justify-content-between"
          >
            <span>ASSIGNMENTS 40% of Total</span>
            <button className="btn btn-light btn-sm">+</button>
          </div>
        </ListGroupItem>
        
        <ListGroup className="rounded-0">
          <ListGroupItem className="wd-assignment-list-item">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-decoration-none fw-semibold"
              >
                A1 - ENV + HTML
              </Link>
            </div>
            <div className="wd-assignment-meta text-muted">
              Multiple Modules | <b>Not Available until</b> May 6 12:00 AM |
            </div>
            <div className="wd-assignment-due">
              <b>Due</b> May 13 at 11:59 PM | 100 Pts
            </div>
          </ListGroupItem>

          <ListGroupItem className="wd-assignment-list-item">
            <div>
              <Link
                href="/Courses/1234/Assignments/223"
                className="wd-assignment-link text-decoration-none fw-semibold"
              >
                A2 - CSS + BOOTSTRAP
              </Link>
            </div>
            <div className="wd-assignment-meta text-muted">
              Multiple Modules | <b>Not Available until</b> May 13 12:00 AM |
            </div>
            <div className="wd-assignment-due">
              <b>Due</b> May 20 at 11:59 PM | 100 Pts
            </div>
          </ListGroupItem>

          <ListGroupItem className="wd-assignment-list-item">
            <div>
              <Link
                href="/courses/1234/assignments/323"
                className="wd-assignment-link text-decoration-none fw-semibold"
              >
                A3 - JAVASCRIPT + REACT
              </Link>
            </div>
            <div className="wd-assignment-meta text-muted">
              Multiple Modules | <b>Not Available until</b> May 20 12:00 AM |
            </div>
            <div className="wd-assignment-due">
              <b>Due</b> May 27 at 11:59 PM | 100 Pts
            </div>
          </ListGroupItem>
        </ListGroup>
      </ListGroup>
    </div>
  );
}
