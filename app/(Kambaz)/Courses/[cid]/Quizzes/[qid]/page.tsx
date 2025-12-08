"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import {
  findQuizById,
} from "../../../client";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

export default function QuizDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const cid = params?.cid as string;
  const qid = params?.qid as string;

  const currentUser = useSelector(
    (state: RootState | any) => state.accountReducer?.currentUser
  );

  const [quiz, setQuiz] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const loadQuiz = async () => {
    setLoading(true);
    const data = await findQuizById(qid);
    setQuiz(data);
    setLoading(false);
  };

  useEffect(() => {
    if (qid) {
      loadQuiz();
    }
  }, [qid]);

  if (loading) {
    return <div className="p-3">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="p-3">Quiz not found.</div>;
  }

  const {
    title,
    quizType,
    points,
    assignmentGroup,
    shuffleAnswers,
    timeLimitMinutes,
    multipleAttempts,
    maxAttempts,
    showCorrectAnswers,
    accessCode,
    oneQuestionAtATime,
    webcamRequired,
    lockQuestionsAfterAnswering,
    dueDate,
    availableDate,
    untilDate,
  } = quiz;

  const handlePreview = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`);
  };

  const handleEdit = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const handleStartQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Take`);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{title || "Quiz Details"}</h2>

        <div className="d-flex gap-2">
          {isFaculty && (
            <>
              <Button variant="outline-secondary" onClick={handlePreview}>
                Preview
              </Button>
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
            </>
          )}

          {isStudent && (
            <Button variant="primary" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <div className="fw-semibold">Quiz Type</div>
              <div>{quizType || "Graded Quiz"}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Assignment Group</div>
              <div>{assignmentGroup || "Quizzes"}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Points</div>
              <div>{points ?? 0}</div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <div className="fw-semibold">Shuffle Answers</div>
              <div>{shuffleAnswers ? "Yes" : "No"}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Time Limit</div>
              <div>{timeLimitMinutes ?? 20} minutes</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Multiple Attempts</div>
              <div>{multipleAttempts ? "Yes" : "No"}</div>
              {multipleAttempts && (
                <div className="text-muted small">
                  Max attempts: {maxAttempts ?? 1}
                </div>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <div className="fw-semibold">Show Correct Answers</div>
              <div>{showCorrectAnswers || "Never"}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Access Code</div>
              <div>{accessCode || "None"}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">One Question at a Time</div>
              <div>{oneQuestionAtATime ? "Yes" : "No"}</div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <div className="fw-semibold">Webcam Required</div>
              <div>{webcamRequired ? "Yes" : "No"}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Lock After Answering</div>
              <div>{lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
            </Col>
          </Row>

          <Row className="mb-1">
            <Col md={4}>
              <div className="fw-semibold">Available From</div>
              <div>{formatDate(availableDate)}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Until</div>
              <div>{formatDate(untilDate)}</div>
            </Col>
            <Col md={4}>
              <div className="fw-semibold">Due Date</div>
              <div>{formatDate(dueDate)}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
