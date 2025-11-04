'use client';

import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import AddRedux from "./ReduxExamples/AddRedux/page";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import HelloRedux from "./ReduxExamples/HelloRedux/page";
import ReduxExamples from "./ReduxExamples/page";
import TodoList from "./ReduxExamples/todos/TodoList";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
      function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
    <div id="wd-lab4">
      <h3>Lab 4</h3>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables/>
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
      <HelloRedux />
      <CounterRedux/>
      <AddRedux/>
      <TodoList />
    </div>
    </Provider>
  );
}
