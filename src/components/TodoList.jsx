import React, { useState, useEffect } from 'react';
import { Typography, List, Skeleton, Button } from '@mui/material';
import TodoItem from './TodoItem';
import { Link, useNavigate } from 'react-router-dom';

function TodoList({ todos, toggleComplete, removeTodo, }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();





  useEffect(() => {
    console.log('Todos updated:', todos);
  }, [todos]);



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
        <Button variant="contained" onClick={() => navigate("/todo-page/create")} color="primary"> Add </Button>

        <Typography variant="body1" className='total-todos'>Total number of todos: {todos.length}</Typography>
      </div>


    </div>
  );
}

export default TodoList;
