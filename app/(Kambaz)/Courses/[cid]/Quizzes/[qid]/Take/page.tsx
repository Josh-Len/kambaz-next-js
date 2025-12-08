"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store";
import {
  findQuizById,
  getMyQuizAttempt,
  submitQuizAttempt,
  type QuizAnswerPayload,
} from "../../../../client";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";

type LocalAnswer = {
  selectedChoiceIndex?: number;
  selectedBoolean?: boolean;
  textAnswer?: string;
};

export default function TakeQuizPage() {
  const params = useParams();
  const cid = params?.cid as string;
  const qid = params?.qid as string;

  const currentUser = useSelector(
    (state: RootState | any) => state.accountReducer?.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  const [quiz, setQuiz] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<LocalAnswer[]>([]);
  const [attemptInfo, setAttemptInfo] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- LOAD QUIZ + LAST ATTEMPT ----------

  useEffect(() => {
  const load = async () => {
    if (!qid || !isStudent) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const quizData = await findQuizById(qid);
      setQuiz(quizData);

      try {
        const attemptData = await getMyQuizAttempt(qid);
        setAttemptInfo(attemptData);
      } catch (err: any) {
        console.error("getMyQuizAttempt failed", err);
        const status = err?.response?.status;
        if (status !== 403 && status !== 404) {
          throw err;
        }
      }

      const qs = quizData.questions || [];
      const initial: LocalAnswer[] = qs.map((q: any) => {
        if (q.type === "MC") return { selectedChoiceIndex: undefined };
        if (q.type === "TF") return { selectedBoolean: undefined };
        if (q.type === "FIB") return { textAnswer: "" };
        return {};
      });
      setAnswers(initial);
    } catch (err: any) {
      console.error("Error loading quiz", err);
      setError(err.message || "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  load();
}, [qid, isStudent]);

  if (!isStudent) {
    return <div className="p-3">Only students can take quizzes.</div>;
  }

  if (loading) {
    return (
      <div className="p-3">
        <Spinner size="sm" className="me-2" /> Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return <div className="p-3">Quiz not found.</div>;
  }

  const questions: any[] = quiz.questions || [];
  const lastAttempt = attemptInfo?.lastAttempt;
  const attemptsCount = attemptInfo?.attemptsCount ?? 0;
  const remainingAttempts = attemptInfo?.remainingAttempts ?? 0;
  const maxAttempts = attemptInfo?.maxAttempts ?? 1;
  const canTakeAgain = remainingAttempts > 0;

  const maxScore =
    lastAttempt?.maxScore ??
    questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleMCSelect = (qIndex: number, choiceIndex: number) => {
    if (!canTakeAgain || submitting) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = {
        ...(copy[qIndex] || {}),
        selectedChoiceIndex: choiceIndex,
      };
      return copy;
    });
  };

  const handleTFSelect = (qIndex: number, value: boolean) => {
    if (!canTakeAgain || submitting) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = {
        ...(copy[qIndex] || {}),
        selectedBoolean: value,
      };
      return copy;
    });
  };

  const handleFibChange = (qIndex: number, value: string) => {
    if (!canTakeAgain || submitting) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = {
        ...(copy[qIndex] || {}),
        textAnswer: value,
      };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canTakeAgain || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const payload: QuizAnswerPayload[] = answers.map((ans, index) => ({
        questionIndex: index,
        selectedChoiceIndex: ans.selectedChoiceIndex,
        selectedBoolean: ans.selectedBoolean,
        textAnswer: ans.textAnswer,
      }));

      await submitQuizAttempt(qid, payload);

      const refreshed = await getMyQuizAttempt(qid);
      setAttemptInfo(refreshed);

      setAnswers(
        questions.map((q: any) => {
          if (q.type === "MC") return { selectedChoiceIndex: undefined };
          if (q.type === "TF") return { selectedBoolean: undefined };
          if (q.type === "FIB") return { textAnswer: "" };
          return {};
        })
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="p-3">
      <h2 className="mb-1">{quiz.title}</h2>
      <div className="text-muted mb-3">
        Attempts used: {attemptsCount} / {maxAttempts}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {lastAttempt && (
        <Alert variant="info">
          Last attempt score:{" "}
          <strong>
            {lastAttempt.score} / {lastAttempt.maxScore ?? maxScore}
          </strong>{" "}
          (submitted {new Date(lastAttempt.submittedAt).toLocaleString()})
        </Alert>
      )}

      {remainingAttempts <= 0 && (
        <Alert variant="warning">
          You have no remaining attempts for this quiz. You can view your last
          attempt but not submit a new one.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {questions.map((q, index) => {
          const lastAns = lastAttempt?.answers?.find(
            (a: any) => a.questionIndex === index
          );
          const isCorrect = lastAns?.isCorrect;
          const borderClass =
            lastAttempt && typeof isCorrect === "boolean"
              ? isCorrect
                ? "border-success"
                : "border-danger"
              : "";

          return (
            <Card
              key={q.questionId || index}
              className={`mb-3 ${borderClass}`}
            >
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Question {index + 1}</strong>
                  <span>{q.points ?? 0} pts</span>
                </div>

                <div className="mb-3">{q.text}</div>

                {q.type === "MC" && (
                  <div>
                    {(q.choices || []).map(
                      (choice: string, cIndex: number) => (
                        <Form.Check
                          key={cIndex}
                          type="radio"
                          name={`q-${index}`}
                          label={choice}
                          checked={
                            answers[index]?.selectedChoiceIndex === cIndex
          }
                          onChange={() => handleMCSelect(index, cIndex)}
                          disabled={!canTakeAgain || submitting}
                          className="mb-1"
                        />
                      )
                    )}
                  </div>
                )}
                {q.type === "TF" && (
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="True"
                      name={`q-${index}`}
                      checked={
                        answers[index]?.selectedBoolean === true
                      }
                      onChange={() => handleTFSelect(index, true)}
                      disabled={!canTakeAgain || submitting}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="False"
                      name={`q-${index}`}
                      checked={
                        answers[index]?.selectedBoolean === false
                      }
                      onChange={() => handleTFSelect(index, false)}
                      disabled={!canTakeAgain || submitting}
                    />
                  </div>
                )}

                {q.type === "FIB" && (
                  <Form.Control
                    type="text"
                    value={answers[index]?.textAnswer ?? ""}
                    onChange={(e) =>
                      handleFibChange(index, e.target.value)
                    }
                    disabled={!canTakeAgain || submitting}
                    placeholder="Type your answer here"
                  />
                )}

                {lastAttempt && typeof isCorrect === "boolean" && (
                  <div className="mt-2">
                    {isCorrect ? (
                      <span className="text-success">✓ Correct</span>
                    ) : (
                      <span className="text-danger">✗ Incorrect</span>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}

        {canTakeAgain && questions.length > 0 && (
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
          >
            {attemptsCount === 0 ? "Submit Quiz" : "Submit New Attempt"}
          </Button>
        )}
      </Form>
    </div>
  );
}
