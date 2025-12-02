/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/[cid]/reducer";
import { RootState } from "../store";
import { enrollInCourse, unenrollFromCourse } from "./reducer"; 

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

  if (!currentUser) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  const userId = (currentUser as any)._id;
  const role = (currentUser as any).role;
  const isFaculty = role === "FACULTY";

  // All enrollments for this user
  const userEnrollments = enrollments.filter((e: any) => e.user === userId);
  const enrolledCourseIds = new Set(
    userEnrollments.map((e: any) => e.course)
  );

  // Courses to show: either only enrolled, or all
  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => enrolledCourseIds.has(c._id));

  const handleEnroll = (courseId: string) => {
    dispatch(enrollInCourse({ user: userId, course: courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollFromCourse({ user: userId, course: courseId }));
  };

  return (
    <div id="wd-dashboard">
      {/* Title + Enrollments button */}
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
          className="btn btn-primary"
          id="wd-toggle-enrollments-click"
          type="button"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
      </div>

      <hr />

      {/* New Course section only for faculty */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
              type="button"
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
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
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses
          ? `All Courses (${courses.length})`
          : `My Enrollments (${visibleCourses.length})`}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => {
            const isEnrolled = enrolledCourseIds.has(c._id);

            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: 300 }}
              >
                <Card>
                  {/* Only allow navigation if enrolled */}
                  {isEnrolled ? (
                    <Link
                      href={`/Courses/${c._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <Card.Img
                        src={course.image || "/images/reactjs.jpg"}
                        variant="top"
                        width="100%"
                        height={160}
                      />
                    </Link>
                  ) : (
                    <Card.Img
                      src={course.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                  )}

                  <Card.Body className="card-body">
                    {isEnrolled ? (
                      <Link
                        href={`/Courses/${c._id}/Home`}
                        className="text-decoration-none text-dark"
                      >
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {c.name}
                        </Card.Title>
                      </Link>
                    ) : (
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </Card.Title>
                    )}

                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: 100 }}
                    >
                      {c.description}
                    </Card.Text>

                    {/* Go button only works if enrolled */}
                    {isEnrolled ? (
                      <Link href={`/Courses/${c._id}/Home`} className="me-2">
                        <Button variant="primary" type="button">
                          Go
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="secondary"
                        type="button"
                        className="me-2"
                        disabled
                      >
                        Locked
                      </Button>
                    )}

                    {/* Enroll / Unenroll buttons */}
                    {isEnrolled ? (
                      <button
                        className="btn btn-danger float-end"
                        type="button"
                        id="wd-unenroll-course-click"
                        onClick={() => handleUnenroll(c._id)}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success float-end"
                        type="button"
                        id="wd-enroll-course-click"
                        onClick={() => handleEnroll(c._id)}
                      >
                        Enroll
                      </button>
                    )}

                    {/* Faculty-only edit/delete */}
                    {isFaculty && (
                      <>
                        <button
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                          type="button"
                        >
                          Edit
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(deleteCourse(c._id));
                          }}
                          className="btn btn-danger me-2 float-end"
                          id="wd-delete-course-click"
                          type="button"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
