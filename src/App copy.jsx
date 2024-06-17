import React, { useState, useEffect } from 'react';
import { Typography, Snackbar, Alert } from '@mui/material';
import TodoList from './components/TodoList';
import TodoStatistics from './components/TodoStatistics';
import AddTodoForm from './components/AddTodoForm';
import Navbar from './components/NavBar';
import { TodoFilter } from './components/filter';
import './index.css';
import axios from 'axios';
import HomePage from './components/pages/HomePage';
import TodoPage from './components/pages/TodoPage';
import TodoDetailsPage from './components/pages/TodoDetailsPage';
import CreateTodoPage from './components/pages/CreateTodoPage';
import NotFoundPage from './components/pages/NotFoundPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';



function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    axios.get('http://localhost:8001/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

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

  async function addTodo(title) {
    try {
      const newTodo = { title: title, isComplete: false };
      const response = await axios.post('http://localhost:8001/todos', newTodo);
      setTodos([...todos, response.data]);  // Assuming response.data contains the new todo with its ID
      setSnackbarMessage('Todo added successfully');
      setSnackbarSeverity('info');
    } catch (error) {
      console.error('Error adding todo:', error);
      setSnackbarMessage('Error adding todo');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }

  function countCompletedTodos() {
    return todos.filter((todo) => todo.isComplete).length;
  }

  function countUncompletedTodos() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  function calculateCompletionPercentage() {
    if (todos.length === 0) {
      return 0;
    }
    return (countCompletedTodos() / todos.length) * 100;
  }

  const filteredTodos = todos.filter(todo =>
    typeof todo.title === 'string' && todo.title.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div className="main-container">
      <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todo-page" element={<TodoPage />} />
                <Route path="/todo/:id" element={<TodoDetailsPage />} />
                <Route path="/create-todo" element={<CreateTodoPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
      <Typography variant="h3" margin={'10px'}>TODO App</Typography>

      <AddTodoForm addTodo={addTodo} />

      <div className="statistics-filter-container">
        <TodoFilter query={query} setQuery={setQuery} />
        <TodoStatistics
          completedTodos={countCompletedTodos()}
          uncompletedTodos={countUncompletedTodos()}
          completionPercentage={calculateCompletionPercentage()}
        />
      </div>

      <div className="todo-list-statistics-container">
        <TodoList
          todos={filteredTodos}
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
  );
}

export default App;
