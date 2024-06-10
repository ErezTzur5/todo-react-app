import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, removeTodo }) {
  return (
    <div className='container'>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      )}
      <p>Total number of todos: {todos.length}</p>
    </div>
  );
}

export default TodoList;
