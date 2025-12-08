"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store";
import { findQuizById } from "../../../../client";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";

type Answer = {
  selectedChoiceIndex?: number;
  selectedBoolean?: boolean;
  textAnswer?: string;
};

export default function QuizPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const cid = params?.cid as string;
  const qid = params?.qid as string;

  const currentUser = useSelector(
    (state: RootState | any) => state.accountReducer?.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await findQuizById(qid);
      setQuiz(data);

      const qs = data.questions || [];

      const initialAnswers: Answer[] = qs.map((q: any) => {
        if (q.type === "MC") {
          return { selectedChoiceIndex: undefined };
        }
        if (q.type === "TF") {
          return { selectedBoolean: undefined };
        }
        if (q.type === "FIB") {
          return { textAnswer: "" };
        }
        return {};
      });

      setAnswers(initialAnswers);

      const totalPoints = qs.reduce(
        (sum: number, q: any) => sum + (q.points ?? 0),
        0
      );
      setMaxScore(totalPoints);

      setLoading(false);
    };

    if (qid) {
      load();
    }
  }, [qid]);

  if (!isFaculty) {
    return <div className="p-3">Only faculty can preview quizzes.</div>;
  }

  if (loading) {
    return (
      <div className="p-3">
        <Spinner size="sm" className="me-2" /> Loading preview...
      </div>
    );
  }

  if (!quiz) {
    return <div className="p-3">Quiz not found.</div>;
  }

  const questions: any[] = quiz.questions || [];


  const handleMCSelect = (qIndex: number, choiceIndex: number) => {
    if (submitted) return;
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
    if (submitted) return;
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
    if (submitted) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = {
        ...(copy[qIndex] || {}),
        textAnswer: value,
      };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const results: boolean[] = [];
    let total = 0;

    questions.forEach((q, index) => {
      const ans = answers[index];
      let correct = false;

      if (q.type === "MC") {
        if (typeof ans?.selectedChoiceIndex === "number") {
          correct = ans.selectedChoiceIndex === q.correctChoiceIndex;
        }
      } else if (q.type === "TF") {
        if (typeof ans?.selectedBoolean === "boolean") {
          correct = ans.selectedBoolean === q.correctBoolean;
        }
      } else if (q.type === "FIB") {
        const userText = (ans?.textAnswer ?? "").trim().toLowerCase();
        if (userText && Array.isArray(q.acceptableAnswers)) {
          correct = q.acceptableAnswers.some(
            (a: string) => a.trim().toLowerCase() === userText
          );
        }
      }

      results.push(correct);
      if (correct) {
        total += q.points ?? 0;
      }
    });

    setQuestionResults(results);
    setScore(total);
    setSubmitted(true);
  };


  const handleExit = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleEdit = () => {
    // navigate to your quiz editor (Details+Questions tabs)
    router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Preview Quiz</h2>
          <div className="text-muted">{quiz.title}</div>
        </div>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={handleExit}>
            Exit Preview
          </Button>
          <Button variant="outline-primary" onClick={handleEdit}>
            Edit Quiz
          </Button>
        </div>
      </div>

      {submitted && (
        <Alert variant="info">
          Your preview score:{" "}
          <strong>
            {score} / {maxScore}
          </strong>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {questions.map((q, index) => {
          const result = submitted ? questionResults[index] : undefined;
          const borderClass =
            submitted && result !== undefined
              ? result
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
                          disabled={submitted}
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
                      checked={answers[index]?.selectedBoolean === true}
                      onChange={() => handleTFSelect(index, true)}
                      disabled={submitted}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="False"
                      name={`q-${index}`}
                      checked={answers[index]?.selectedBoolean === false}
                      onChange={() => handleTFSelect(index, false)}
                      disabled={submitted}
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
                    disabled={submitted}
                    placeholder="Type your answer here"
                  />
                )}

                {submitted && result === false && (
                  <div className="mt-2 text-danger">
                    Incorrect.
                    {q.type === "MC" &&
                      typeof q.correctChoiceIndex === "number" &&
                      q.choices?.[q.correctChoiceIndex] && (
                        <>
                          {" "}
                          Correct answer:{" "}
                          <strong>{q.choices[q.correctChoiceIndex]}</strong>
                        </>
                      )}
                    {q.type === "TF" && (
                      <>
                        {" "}
                        Correct answer:{" "}
                        <strong>
                          {q.correctBoolean ? "True" : "False"}
                        </strong>
                      </>
                    )}
                    {q.type === "FIB" &&
                      Array.isArray(q.acceptableAnswers) && (
                        <>
                          {" "}
                          Acceptable answers:{" "}
                          <strong>
                            {q.acceptableAnswers.join(", ")}
                          </strong>
                        </>
                      )}
                  </div>
                )}

                {submitted && result === true && (
                  <div className="mt-2 text-success">Correct!</div>
                )}
              </Card.Body>
            </Card>
          );
        })}

        {!submitted && questions.length > 0 && (
          <Button type="submit" variant="primary">
            Submit Preview
          </Button>
        )}
      </Form>
    </div>
  );
}
