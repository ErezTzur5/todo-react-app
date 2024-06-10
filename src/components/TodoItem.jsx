import React from 'react';

function TodoItem({ todo, toggleComplete, removeTodo }) {
  return (
    <li className="">
      <label>
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={() => toggleComplete(todo.id)}
        />
        <span>{todo.title}</span>
      </label>
      <button onClick={() => removeTodo(todo.id)}>Delete Todo</button>
    </li>
  );
}

export default TodoItem;
