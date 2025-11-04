"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store"; // adjust path
import { add } from "./addReducer";
import { FormControl, Button } from "react-bootstrap";

export default function AddRedux() {
  const [a, setA] = useState<number>(12);
  const [b, setB] = useState<number>(23);

  const sum = useSelector((state: RootState) => state.add.sum);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>
        {a} + {b} = {sum}
      </h2>

      <FormControl
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.currentTarget.value))}
        className="mb-2"
      />
      <FormControl
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.currentTarget.value))}
        className="mb-2"
      />

      <Button
        id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </Button>
      <hr />
    </div>
  );
}
