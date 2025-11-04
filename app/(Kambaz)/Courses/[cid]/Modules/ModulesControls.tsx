"use client";

import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import React, { useState } from "react";
import ModuleEditor from "./ModuleEditor";
export default function ModulesControls(
{ moduleName, setModuleName, addModule }:
{ moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" onClick={handleShow} >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <Dropdown.Toggle id="wd-publish-all-toggle" variant="secondary" size="lg">
          <GreenCheckmark />
          Publish All
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <GreenCheckmark />
            Publish All
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark />
            Publish all modules and items
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
  );
}