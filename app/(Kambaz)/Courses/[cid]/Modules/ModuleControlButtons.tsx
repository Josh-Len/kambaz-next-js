"use client";

import Button from "react-bootstrap/Button";

export default function ModuleControlButtons() {
  return (
    <div className="float-end d-flex gap-2">
      <Button size="sm" variant="secondary">Publish</Button>
      <Button size="sm" variant="secondary">+ Item</Button>
      <Button size="sm" variant="secondary">Edit</Button>
    </div>
  );
}
