import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, removeTodo }) {
  return (
    <div className="todos-container">
      <div className='items-container'>
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
        <p className='total-todos' >Total number of todos: {todos.length}</p>
      </div>
    </div>
  );
}

export default TodoList;
