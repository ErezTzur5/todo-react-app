import React, { useState, useEffect } from 'react';
import { TodoFilter } from './components/filter';
import './index.css';
import TodoList from './components/TodoList';
import TodoStatistics from './components/TodoStatistics';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");

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
    } catch (error) {
      console.error('Error deleting todo:', error);
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
    } catch (error) {
      console.log("Error updating todo", error);
    }
  }

  async function addTodo(title) {
    try {
      const newTodo = { title: title, isComplete: false };
      const response = await axios.post('http://localhost:8001/todos', newTodo);
      setTodos([...todos, response.data]);  // Assuming response.data contains the new todo with its ID
    } catch (error) {
      console.error('Error adding todo:', error);
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
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="main-container">
      <h1>TODO App</h1>
      <AddTodoForm addTodo={addTodo} />

      <TodoFilter query={query} setQuery={setQuery} />

      <div className="todo-list-statistics-container">
        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
        <TodoStatistics
          completedTodos={countCompletedTodos()}
          uncompletedTodos={countUncompletedTodos()}
          completionPercentage={calculateCompletionPercentage()}
        />
      </div>

    </div>
  );
}

export default App;
