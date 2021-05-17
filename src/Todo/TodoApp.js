import React, { useState, useEffect } from "react";
import { TodoList } from "./TodoList";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { TodoForm } from "./TodoForm";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "../libs/service";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [error, setError] = useState(false);
  async function addTodo(event) {
    event.preventDefault();
    const newTodo = {
      id: new Date(),
      isComplete: false,
      task: currentTodo,
    };

    try {
      const response = await saveTodo(newTodo);
      setTodos(todos.concat(response.data));
    } catch (err) {
      setError(true);
    }
    setCurrentTodo("");
  }

  async function deleteTodo(taskToDelete) {
    await destroyTodo(taskToDelete.id).catch(() => {});
    setTodos(todos.filter((todo) => todo.id !== taskToDelete.id));
  }

  async function toggleTodo(taskToToggle) {
    const updatedTodo = {
      ...taskToToggle,
      isComplete: !taskToToggle.isComplete,
    };
    await updateTodo(updatedTodo);
    const newTodos = todos.map((todo) =>
      todo.id === taskToToggle.id ? updatedTodo : todo
    );
    console.log(updatedTodo);
    console.log(newTodos);
    setTodos(newTodos);
  }

  function handleCurrentTodoChange(event) {
    setCurrentTodo(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await loadTodos();
      setTodos(response.data);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <div className="todoApp">
        <Switch>
          <Route path="/:id?">
            <h1>todos</h1>
            {error && <div className="save-error">Couldn't save </div>}
            <TodoForm
              handleSubmit={addTodo}
              handleCurrentTodoChange={handleCurrentTodoChange}
              currentTodo={currentTodo}
            />
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          </Route>
        </Switch>
        <div className="links">
          <Link to="/">All</Link>
          <Link to="/active">Active</Link>
          <Link to="/completed">Completed</Link>
        </div>
      </div>
    </Router>
  );
}
