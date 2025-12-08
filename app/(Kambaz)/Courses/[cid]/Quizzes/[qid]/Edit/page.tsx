"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store";
import {
  findQuizById,
  updateQuiz,
  togglePublishQuiz,
} from "../../../../client";
import {
  Button,
  Card,
  Form,
  Nav,
  Row,
  Col,
} from "react-bootstrap";

function formatInputDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function QuizEditDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const cid = params?.cid as string;
  const qid = params?.qid as string;

  const currentUser = useSelector(
    (state: RootState | any) => state.accountReducer?.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );

  const loadQuiz = async () => {
    setLoading(true);
    const data = await findQuizById(qid);
    setQuiz(data);
    setForm({
      ...data,
      questions: data.questions || [], 
    });
    setLoading(false);
  };

  useEffect(() => {
    if (qid) {
      loadQuiz();
    }
  }, [qid]);

  if (!isFaculty) {
    return <div className="p-3">Only faculty can edit quizzes.</div>;
  }

  if (loading) {
    return <div className="p-3">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="p-3">Quiz not found.</div>;
  }

  const handleFieldChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };


  const handleSave = async () => {
    await updateQuiz(form);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const updated = await updateQuiz(form);
    if (!updated.published) {
      await togglePublishQuiz(qid);
    }
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };


  const questions: any[] = form.questions || [];

  const handleChoiceTextChange = (
  qIndex: number,
  cIndex: number,
  value: string
) => {
  const qs = [...questions];
  const q = { ...qs[qIndex] };
  const choices = [...(q.choices || [])];
  choices[cIndex] = value;
  q.choices = choices;
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};

const addChoice = (qIndex: number) => {
  const qs = [...questions];
  const q = { ...qs[qIndex] };
  const choices = [...(q.choices || [])];
  choices.push(`Choice ${choices.length + 1}`);
  q.choices = choices;
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};

const removeChoice = (qIndex: number, cIndex: number) => {
  const qs = [...questions];
  const q = { ...qs[qIndex] };
  const choices = [...(q.choices || [])];
  choices.splice(cIndex, 1);
  q.choices = choices;
  if (
    typeof q.correctChoiceIndex === "number" &&
    q.correctChoiceIndex >= choices.length
  ) {
    q.correctChoiceIndex = choices.length - 1;
  }
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};

const setCorrectChoice = (qIndex: number, cIndex: number) => {
  const qs = [...questions];
  const q = { ...qs[qIndex], correctChoiceIndex: cIndex };
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};


const handleFibAnswerChange = (
  qIndex: number,
  aIndex: number,
  value: string
) => {
  const qs = [...questions];
  const q = { ...qs[qIndex] };
  const answers = [...(q.acceptableAnswers || [])];
  answers[aIndex] = value;
  q.acceptableAnswers = answers;
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};

const addFibAnswer = (qIndex: number) => {
  const qs = [...questions];
  const q = { ...qs[qIndex] };
  const answers = [...(q.acceptableAnswers || [])];
  answers.push("");
  q.acceptableAnswers = answers;
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};

const removeFibAnswer = (qIndex: number, aIndex: number) => {
  const qs = [...questions];
  const q = { ...qs[qIndex] };
  const answers = [...(q.acceptableAnswers || [])];
  answers.splice(aIndex, 1);
  q.acceptableAnswers = answers;
  qs[qIndex] = q;
  handleFieldChange("questions", qs);
};



const handleQuestionChange = (
  index: number,
  field: string,
  value: any
) => {
  const copy = [...questions];
  let updated = { ...copy[index], [field]: value };

  if (field === "type") {
    if (value === "MC") {
      updated = {
        ...updated,
        choices:
          Array.isArray(updated.choices) && updated.choices.length > 0
            ? updated.choices
            : ["Choice 1", "Choice 2"],
        correctChoiceIndex:
          typeof updated.correctChoiceIndex === "number"
            ? updated.correctChoiceIndex
            : 0,
        correctBoolean: undefined,
        acceptableAnswers: undefined,
      };
    } else if (value === "TF") {
      updated = {
        ...updated,
        choices: undefined,
        correctChoiceIndex: undefined,
        acceptableAnswers: undefined,
        correctBoolean:
          typeof updated.correctBoolean === "boolean"
            ? updated.correctBoolean
            : true,
      };
    } else if (value === "FIB") {
      updated = {
        ...updated,
        choices: undefined,
        correctChoiceIndex: undefined,
        correctBoolean: undefined,
        acceptableAnswers:
          Array.isArray(updated.acceptableAnswers) &&
          updated.acceptableAnswers.length > 0
            ? updated.acceptableAnswers
            : [""],
      };
    }
  }

  copy[index] = updated;
  handleFieldChange("questions", copy);
};


const addNewQuestion = () => {
  const newQuestion = {
    id: `q-${Date.now()}`,
    type: "MC",         
    title: "New Question",
    points: 1,
    text: "",
    choices: ["Choice 1", "Choice 2"], 
    correctChoiceIndex: 0,         
  };
  const qs = form.questions || [];
  handleFieldChange("questions", [...qs, newQuestion]);
};


  const totalQuestionPoints = questions.reduce(
    (sum, q) => sum + (q.points || 0),
    0
  );

  const renderDetailsTab = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={form.title ?? ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="Quiz title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={form.description ?? ""}
              onChange={(e) =>
                handleFieldChange("description", e.target.value)
              }
              placeholder="Describe the quiz..."
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={form.quizType ?? "GRADED_QUIZ"}
                  onChange={(e) =>
                    handleFieldChange("quizType", e.target.value)
                  }
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={form.assignmentGroup ?? "QUIZZES"}
                  onChange={(e) =>
                    handleFieldChange("assignmentGroup", e.target.value)
                  }
                >
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type="number"
                  value={form.points ?? 0}
                  onChange={(e) =>
                    handleFieldChange("points", Number(e.target.value))
                  }
                />
                <Form.Text muted>
                  Total from questions: {totalQuestionPoints}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Shuffle Answers</Form.Label>
                <Form.Select
                  value={form.shuffleAnswers ? "yes" : "no"}
                  onChange={(e) =>
                    handleFieldChange(
                      "shuffleAnswers",
                      e.target.value === "yes"
                    )
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Time Limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={form.timeLimitMinutes ?? 20}
                  onChange={(e) =>
                    handleFieldChange(
                      "timeLimitMinutes",
                      Number(e.target.value)
                    )
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Multiple Attempts</Form.Label>
                <Form.Select
                  value={form.multipleAttempts ? "yes" : "no"}
                  onChange={(e) =>
                    handleFieldChange(
                      "multipleAttempts",
                      e.target.value === "yes"
                    )
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Form.Select>
                {form.multipleAttempts && (
                  <Form.Group className="mt-2">
                    <Form.Label>How Many Attempts</Form.Label>
                    <Form.Control
                      type="number"
                      value={form.maxAttempts ?? 1}
                      onChange={(e) =>
                        handleFieldChange(
                          "maxAttempts",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Group>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Control
                  type="text"
                  value={form.showCorrectAnswers ?? ""}
                  onChange={(e) =>
                    handleFieldChange("showCorrectAnswers", e.target.value)
                  }
                  placeholder="e.g., After each attempt"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  type="text"
                  value={form.accessCode ?? ""}
                  onChange={(e) =>
                    handleFieldChange("accessCode", e.target.value)
                  }
                  placeholder="Leave blank if none"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>One Question at a Time</Form.Label>
                <Form.Select
                  value={form.oneQuestionAtATime ? "yes" : "no"}
                  onChange={(e) =>
                    handleFieldChange(
                      "oneQuestionAtATime",
                      e.target.value === "yes"
                    )
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Webcam Required</Form.Label>
                <Form.Select
                  value={form.webcamRequired ? "yes" : "no"}
                  onChange={(e) =>
                    handleFieldChange(
                      "webcamRequired",
                      e.target.value === "yes"
                    )
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Lock Questions After Answering</Form.Label>
                <Form.Select
                  value={form.lockQuestionsAfterAnswering ? "yes" : "no"}
                  onChange={(e) =>
                    handleFieldChange(
                      "lockQuestionsAfterAnswering",
                      e.target.value === "yes"
                    )
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatInputDate(form.availableDate)}
                  onChange={(e) =>
                    handleFieldChange("availableDate", e.target.value)
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatInputDate(form.untilDate)}
                  onChange={(e) =>
                    handleFieldChange("untilDate", e.target.value)
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatInputDate(form.dueDate)}
                  onChange={(e) =>
                    handleFieldChange("dueDate", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderQuestionsTab = () => (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>Questions</h4>
      <Button onClick={addNewQuestion}>+ New Question</Button>
    </div>

    {questions.length === 0 && (
      <div className="text-muted mb-3">
        No questions yet. Click &quot;New Question&quot; to add one.
      </div>
    )}

    {questions.map((q, index) => (
      <Card key={q.id || index} className="mb-2">
        <Card.Body>
          {/* Title */}
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={q.title ?? ""}
              onChange={(e) =>
                handleQuestionChange(index, "title", e.target.value)
              }
            />
          </Form.Group>

          {/* Type + Points */}
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Question Type</Form.Label>
                <Form.Select
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                >
                  <option value="MC">Multiple Choice</option>
                  <option value="TF">True / False</option>
                  <option value="FIB">Fill in the Blank</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type="number"
                  value={q.points ?? 1}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "points",
                      Number(e.target.value)
                    )
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={q.text ?? ""}
              onChange={(e) =>
                handleQuestionChange(index, "text", e.target.value)
              }
              placeholder="Type the question here..."
            />
          </Form.Group>

          {q.type === "MC" && (
            <div className="mb-2">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="mb-0">Choices</Form.Label>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => addChoice(index)}
                >
                  + Add Choice
                </Button>
              </div>

              {(q.choices || []).map((choice: string, cIndex: number) => (
                <div
                  key={cIndex}
                  className="d-flex align-items-start mb-2 gap-2"
                >
                  <Form.Check
                    type="radio"
                    name={`correct-${index}`}
                    className="mt-2"
                    checked={q.correctChoiceIndex === cIndex}
                    onChange={() => setCorrectChoice(index, cIndex)}
                  />

                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={choice}
                    onChange={(e) =>
                      handleChoiceTextChange(index, cIndex, e.target.value)
                    }
                    placeholder={`Choice ${cIndex + 1}`}
                  />

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => removeChoice(index, cIndex)}
                  >
                    ✕
                  </Button>
                </div>
              ))}

              {(!q.choices || q.choices.length === 0) && (
                <div className="text-muted">
                  No choices yet. Click &quot;Add Choice&quot;.
                </div>
              )}
            </div>
          )}

{q.type === "TF" && (
  <Form.Group className="mb-2">
    <Form.Label>Correct Answer</Form.Label>
    <div>
      <Form.Check
        inline
        type="radio"
        id={`tf-true-${index}`}
        name={`tf-${index}`}
        label="True"
        checked={q.correctBoolean === true}
        onChange={() =>
          handleQuestionChange(index, "correctBoolean", true)
        }
      />
      <Form.Check
        inline
        type="radio"
        id={`tf-false-${index}`}
        name={`tf-${index}`}
        label="False"
        checked={q.correctBoolean === false}
        onChange={() =>
          handleQuestionChange(index, "correctBoolean", false)
        }
      />
    </div>
  </Form.Group>
)}

{q.type === "FIB" && (
  <div className="mb-2">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <Form.Label className="mb-0">Acceptable Answers</Form.Label>
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => addFibAnswer(index)}
      >
        + Add Answer
      </Button>
    </div>

    {(q.acceptableAnswers || []).map(
      (ans: string, aIndex: number) => (
        <div
          key={aIndex}
          className="d-flex align-items-start mb-2 gap-2"
        >
          <Form.Control
            type="text"
            value={ans}
            onChange={(e) =>
              handleFibAnswerChange(index, aIndex, e.target.value)
            }
            placeholder={`Answer ${aIndex + 1}`}
          />
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => removeFibAnswer(index, aIndex)}
          >
            ✕
          </Button>
        </div>
      )
    )}

    {(!q.acceptableAnswers || q.acceptableAnswers.length === 0) && (
      <div className="text-muted">
        No answers yet. Click &quot;Add Answer&quot;.
      </div>
    )}

    <Form.Text muted>
      Answers will be compared case-insensitively when grading.
    </Form.Text>
  </div>
)}


        </Card.Body>
      </Card>
    ))}

    <div className="mt-3">
      <strong>Total Points: </strong>
      {totalQuestionPoints}
    </div>
  </div>
);

  return (
    <div className="p-3">
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k as "details" | "questions")}
        className="mb-3"
      >
        <Nav.Item>
          <Nav.Link eventKey="details">Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions">Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Edit Quiz</h2>

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="primary" onClick={handleSaveAndPublish}>
            Save &amp; Publish
          </Button>
        </div>
      </div>

      {activeTab === "details" ? renderDetailsTab() : renderQuestionsTab()}
    </div>
  );
}
