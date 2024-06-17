import React from 'react';
import { Typography, List, Skeleton, Button } from '@mui/material';
import TodoItem from './TodoItem';
import { Link } from 'react-router-dom';

function TodoList({ todos, toggleComplete, removeTodo }) {
  return (
    <div className="todos-container">
      <div className='items-container'>
        {todos.length === 0 ? (
          <Typography variant="body1">No todos available</Typography>
        ) : (
          <List>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                removeTodo={removeTodo}
              />
            ))}
          </List>
        )}
        {todos.length === 0 && (
          <React.Fragment>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="rectangular" width={'100%'} height={400} />
          </React.Fragment>
        )}
        <Button component={Link} to="/create-todo" variant="contained" color="primary"> Add </Button>

        <Typography variant="body1" className='total-todos'>Total number of todos: {todos.length}</Typography>
      </div>
    </div>
  );
}

export default TodoList;