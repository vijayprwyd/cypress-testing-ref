import React from 'react';
import './todo.css';

export function Todo({todo, toggleTodo, deleteTodo}) {

    const { task, isComplete } = todo;
    return (
        <li className = "todo">
            <div className = {`todoContent ${isComplete ? 'completed' : ''}`} onClick = {() => toggleTodo(todo)} > { task } </div>
            <button className = "todoButton" onClick = {() => deleteTodo(todo)}>x </button>
        </li>
    )
}