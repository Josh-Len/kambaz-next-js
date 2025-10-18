"use client";

import { useParams } from "next/navigation";
import * as db from "../../../Database";

import ListGroup from "react-bootstrap/ListGroup";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

// ✅ Minimal local types
type Lesson = { _id?: string; name: string };
type Module = { _id?: string; name: string; course: string; lessons?: Lesson[] };

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = db.modules as Module[]; // narrow the db type

  return (
    <div>
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-publish-all">
        <option>Publish All</option>
      </select>
      <button>+ Module</button>

      <ModulesControls />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <ListGroup.Item
              key={module._id ?? module.name}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {module.name} <ModuleControlButtons />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroup.Item
                      key={lesson._id ?? lesson.name}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name} <LessonControlButtons />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
