export function filterTodos(todos, filter) {
  if (!filter) return todos;
  return todos.filter((todo) => todo.isComplete === (filter === "completed"));
}
