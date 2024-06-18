import React, { useState, useEffect } from 'react';
import TodoList from '../TodoList';
import { Snackbar, Alert, Typography } from '@mui/material';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';

function TodoPage({ addTodoToState }) {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:8001/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [location.pathname]);

  function addTodoToState(newTodo) {
    setTodos([...todos, newTodo]);
  }

  async function removeTodo(todoId) {
    try {
      await axios.delete(`http://localhost:8001/todos/${todoId}`);
      const newTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(newTodos);
      setSnackbarMessage('🗑️ Todo deleted successfully');
      setSnackbarSeverity('none');
    } catch (error) {
      console.error('Error deleting todo:', error);
      setSnackbarMessage('Error deleting todo');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }

  async function toggleComplete(todoId) {
    try {
      const todo = todos.find((todo) => todo.id === todoId);
      const updatedTodo = { ...todo, isComplete: !todo.isComplete };

      await axios.put(`http://localhost:8001/todos/${todoId}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setSnackbarMessage('Todo updated successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error updating todo:', error);
      setSnackbarMessage('Error updating todo');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }

  const filteredTodos = todos.filter(todo =>
    typeof todo.title === 'string' && todo.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="todo-page">
        <h1>Todo List</h1>
        <Typography variant="h3" margin={'10px'}>TODO App</Typography>
        <div className="statistics-filter-container">
          <TodoList
            todos={filteredTodos}
            addTodoToState={addTodoToState}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Outlet />
    </>

  );
}

export default TodoPage;
