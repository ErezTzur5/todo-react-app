import React from 'react';

function TodoStatistics({ completedTodos, uncompletedTodos, completionPercentage }) {
  return (
    <div className="todo-statistics">
      <h2>Completed Todos: {completedTodos}</h2>
      <h2>Uncompleted Todos: {uncompletedTodos}</h2>
      <div className='progress-bar'>
        <div
          className='progress-bar-fill'
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default TodoStatistics;
