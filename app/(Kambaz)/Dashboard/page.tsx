/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/[cid]/reducer";
import { RootState } from "../store";
import { enrollInCourse, unenrollFromCourse } from "./reducer";
import * as client from "../Courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const [myCourses, setMyCourses] = useState<any[]>([]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchData = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      const enrolledCourses = await client.findMyCourses();
      dispatch(setCourses(allCourses));
      setMyCourses(enrolledCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchData();
  }, [currentUser]);

  const onEnrollUserInCourse = async (courseId: string) => {
    if (!currentUser) return;

    try {
      await client.enrollUserInCourse(courseId);

      const userId = (currentUser as any)._id;
      dispatch(enrollInCourse({ user: userId, course: courseId }));

      const enrolledCourse = courses.find((c: any) => c._id === courseId);
      if (enrolledCourse && !myCourses.some((c: any) => c._id === courseId)) {
        setMyCourses([...myCourses, enrolledCourse]);
      }
    } catch (e) {
      console.error("Failed to enroll in course", e);
    }
  };

  const onUnenrollUserFromCourse = async (courseId: string) => {
    if (!currentUser) return;

    try {
      await client.unenrollUserFromCourse(courseId);

      const userId = (currentUser as any)._id;
      dispatch(unenrollFromCourse({ user: userId, course: courseId }));

      setMyCourses(myCourses.filter((c: any) => c._id !== courseId));
    } catch (e) {
      console.error("Failed to unenroll from course", e);
    }
  };

  const onAddNewCourse = async () => {
    if (!currentUser) return;
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));

    await onEnrollUserInCourse(newCourse._id);
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
      setMyCourses(myCourses.filter((c: any) => c._id !== courseId));
    } catch (e) {
      console.error("Failed to delete course", e);
    }
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    const updatedCourses = courses.map((c: any) =>
      c._id === course._id ? course : c
    );
    dispatch(setCourses(updatedCourses));

    setMyCourses(
      myCourses.map((c: any) => (c._id === course._id ? course : c))
    );
  };

  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

  if (!currentUser) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  const userId = (currentUser as any)._id;
  const role = (currentUser as any).role;
  const isFaculty = role === "FACULTY";

  const enrolledCourseIds = new Set(myCourses.map((c: any) => c._id));

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => enrolledCourseIds.has(c._id));

  const handleEnroll = (courseId: string) => {
    onEnrollUserInCourse(courseId);
  };

  const handleUnenroll = (courseId: string) => {
    onUnenrollUserFromCourse(courseId);
  };

  return (
    <div id="wd-dashboard">
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

      {/*isFaculty*/ true && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
              type="button"
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
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
                  {isEnrolled ? (
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
                  ) : (
                    <Card.Img
                      src={c.image || "/images/reactjs.jpg"}
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

                    {/*isFaculty*/ true && (
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
                            onDeleteCourse(c._id);
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
