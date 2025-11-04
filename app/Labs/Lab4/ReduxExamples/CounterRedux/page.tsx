"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store"; // adjust path
import { increment, decrement } from "./counterReducer";

export default function CounterRedux() {
  // option A: select the exact field
  const count = useSelector((state: RootState) => state.counter.count);

  // or, if you prefer destructuring:
  // const { count } = useSelector((state: RootState) => state.counter);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button
        onClick={() => dispatch(increment())}
        id="wd-counter-redux-increment-click"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        id="wd-counter-redux-decrement-click"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
