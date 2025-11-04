'use client';
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import House from "./House";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreading";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import { useSelector } from "react-redux";
import type { RootState } from "../Lab4/store";
import { ListGroup } from "react-bootstrap";

import { Provider } from 'react-redux';
import { store } from '../Lab4/store';

function Lab3Inner() {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <div id="wd-lab3">
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

export default function Lab3() {
  return(
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <Provider store={store}>
      <Lab3Inner />
    </Provider>
      <hr />
           <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Add a={3} b={4} />
      <Styles/>
      <Classes/>
      <DestructingImports/>
      <FunctionDestructing/>
      <Destructing/>
      <Spreading/>
      <TodoList/>
      <TodoItem/>
      <House/>
      <JsonStringify/>
      <FilterFunction/>
      <FindIndex/>
      <FindFunction/>
      <MapFunction/>
      <ForLoops/>
      <AddingAndRemovingToFromArrays/>
      <ArrayIndexAndLength/>
      <SimpleArrays/>
      <TemplateLiterals/>
      <ImpliedReturn/>
      <ArrowFunctions/>
      <LegacyFunctions/>
      <ConditionalOutputInline/>
      <ConditionalOutputIfElse/>
      <TernaryOperator/>
      <IfElse/>
      <BooleanVariables/>
      <VariableTypes/>
      <VariablesAndConstants/>
    </div>
  );
}
