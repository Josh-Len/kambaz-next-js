"use client";

import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule  }: { 
    moduleId: string; deleteModule: (moduleId: string) => void; 
    editModule: (moduleId: string) => void } 
) {
  return (
    <div className="float-end d-flex gap-2">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <Button size="sm" variant="secondary">Publish</Button>
      <Button size="sm" variant="secondary">+ Item</Button>
      <Button size="sm" variant="secondary">Edit</Button>
    </div>
  );
}