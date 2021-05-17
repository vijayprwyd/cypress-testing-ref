import React from "react";
import { Todo } from "./Todo";
import { useParams } from "react-router-dom";
import { filterTodos } from "./todoUtils";
import "./todo.css";

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  const obj = useParams();
  return (
    <div className="todos">
      <ul className = "todoList">
        {filterTodos(todos, obj.id).map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
