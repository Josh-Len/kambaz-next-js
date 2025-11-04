/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses((prev) => [...prev, newCourse]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses((prev) =>
      prev.map((c) => (c._id === course._id ? { ...course } : c))
    );
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
          type="button"
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
          type="button"
        >
          Update
        </button>
      </h5>
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        placeholder="Course name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />

      <FormControl
        as="textarea"
        rows={3}
        value={course.description}
        placeholder="Course description"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: 300 }}>
              <Card>
                {/* Make only the image/title area a link */}
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={c.image || "/images/reactjs.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                </Link>

                <Card.Body className="card-body">
                  <Link
                    href={`/Courses/${c._id}/Home`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </Card.Title>
                  </Link>

                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: 100 }}
                  >
                    {c.description}
                  </Card.Text>

                  {/* Normal navigation button */}
                  <Link href={`/Courses/${c._id}/Home`} className="me-2">
                    <Button variant="primary" type="button">Go</Button>
                  </Link>

                  {/* Local action buttons (NOT wrapped in Link).
                      Stop default + propagation just in case. */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteCourse(c._id); // <- use c._id
                    }}
                    className="btn btn-danger float-end"
                    id="wd-delete-course-click"
                    type="button"
                  >
                    Delete
                  </button>

                  <button
                    id="wd-edit-course-click"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCourse(c); // <- set from c
                    }}
                    className="btn btn-warning me-2 float-end"
                    type="button"
                  >
                    Edit
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
