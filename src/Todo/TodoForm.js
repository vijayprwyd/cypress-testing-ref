import React from "react";

export function TodoForm({ currentTodo, handleSubmit, handleCurrentTodoChange }) {

  return (
    <form onSubmit={handleSubmit} className = 'todoForm'>
      <input
        id = "todo"  
        type="text"
        className = "formInput"
        autoFocus
        value = {currentTodo}
        onChange={handleCurrentTodoChange}
        placeholder="What needs to be done ?"
      />
    </form>
  );
}
