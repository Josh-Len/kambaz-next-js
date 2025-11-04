import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import type { RootState, AppDispatch } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ListGroup.Item>
      <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
        Add
      </Button>
      <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click" className="ms-2">
        Update
      </Button>
      <FormControl
        className="mt-2"
        value={todo.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
      />
    </ListGroup.Item>
  );
}
