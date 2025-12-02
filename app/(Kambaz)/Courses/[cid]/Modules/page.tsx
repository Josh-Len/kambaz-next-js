"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import ListGroup from "react-bootstrap/ListGroup";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

type Lesson = { _id?: string; name: string };
type Module = { _id?: string; name: string; course: string; lessons?: Lesson[]; editing?: boolean; };

import { addModule, editModule, updateModule, deleteModule, setModules }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
    const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const moduleData = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, moduleData]));
  };

    const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

    const onUpdateModule = async (module: any) => {
    await client.updateModule(module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };




  return (
    <div>
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-publish-all">
        <option>Publish All</option>
      </select>
      <button>+ Module</button>

      <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
        addModule={onCreateModuleForCourse} />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: Module) => (
            <ListGroup.Item
              key={module._id ?? module.name}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                { module.editing && (
                <FormControl className="w-50 d-inline-block"
               onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                  onUpdateModule({ ...module, editing: false });
                 }
               }}
               defaultValue={module.name}/>
      )}
 
                <ModuleControlButtons
                  moduleId={String(module._id)}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}/>
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