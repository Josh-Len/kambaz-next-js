"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Dropdown } from "react-bootstrap";
import * as client from "../../client"
import { useSelector } from "react-redux";

function formatAvailability(quiz: any): string {
  const now = new Date();
  const avail = quiz.availableDate ? new Date(quiz.availableDate) : undefined;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : undefined;

  if (avail && now < avail) {
    return `Not available until ${avail.toLocaleDateString()}`;
  }

  if (avail && until && now >= avail && now <= until) {
    return "Available";
  }

  if (until && now > until) {
    return "Closed";
  }

  return "Available";
}


export default function QuizzesScreen() {
  const params = useParams();
  const router = useRouter();
  const cid = params?.cid as string;

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    const currentUser = useSelector(
    (state: any) => state.accountReducer?.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    setLoading(true);
    const data = await client.findQuizzesForCourse(cid);
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => {
    if (cid) {
      fetchQuizzes();
    }
  }, [cid]);

  const addQuiz = async () => {
    const quiz = await client.createQuizForCourse(cid);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDelete = async (qid: string) => {
    await client.deleteQuiz(qid);
    fetchQuizzes();
  };

  const handleTogglePublish = async (qid: string) => {
    await client.togglePublishQuiz(qid);
    fetchQuizzes();
  };

  const goToDetails = (qid: string) => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>
        {isFaculty &&
        <Button onClick={addQuiz}>+ Quiz</Button>}
      </div>

      {loading && <div>Loading...</div>}

      {!loading && quizzes.length === 0 && (
        <div className="text-muted">
          No quizzes yet. Click <strong>+ Quiz</strong> to add one.
        </div>
      )}

      {!loading &&
        quizzes.length > 0 &&
        quizzes.map((quiz) => {
          const availability = formatAvailability(quiz);
          const numQuestions = quiz.questions?.length || 0;

          return (
            <div
              key={quiz._id}
              className="border rounded p-3 mb-2 d-flex justify-content-between align-items-start"
            >
              <div style={{ cursor: "pointer" }} onClick={() => goToDetails(quiz._id)}>
                <div className="d-flex align-items-center mb-1">
                  <span className="me-2">
                    {quiz.published ? "✅" : "🚫"}
                  </span>
                  <span className="fw-bold text-primary text-decoration-underline">
                    {quiz.title}
                  </span>
                </div>

                <div className="small text-muted">
                  <div>Availability: {availability}</div>
                  {quiz.dueDate && (
                    <div>Due: {new Date(quiz.dueDate).toLocaleString()}</div>
                  )}
                  <div>Points: {quiz.points ?? 0}</div>
                  <div>Questions: {numQuestions}</div>
                </div>
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id={`quiz-menu-${quiz._id}`}
                  size="sm"
                >
                  ⋮
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => goToDetails(quiz._id)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTogglePublish(quiz._id)}>
                    {quiz.published ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          );
        })}
    </div>
  );
}
