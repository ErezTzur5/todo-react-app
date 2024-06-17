import React, { useState } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTodoPage() {
  const [title, setTitle] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  async function addTodo() {
    try {
      const newTodo = { title: title, isComplete: false };
      await axios.post('http://localhost:8001/todos', newTodo);
      setSnackbarMessage('Todo added successfully');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
      navigate('/todo-page'); // Navigate back to the todo list
    } catch (error) {
      console.error('Error adding todo:', error);
      setSnackbarMessage('Error adding todo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === '') {
      alert('Please enter a todo title');
      return;
    }
    addTodo();
    setTitle('');
  }

  return (
    <div className="create-todo-page">
      <h1>Create Todo</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Todo
        </Button>
      </form>
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
  );
}

export default CreateTodoPage;
