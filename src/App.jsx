import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoStatistics from './components/TodoStatistics';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';

function makeId(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const [todos, setTodos] = useState([]);

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
      console.log('after remove: ', newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  async function toggleComplete(todoId) {
    try{

      const checkedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
      );
      await axios.put(`http://localhost:8001/todos/${todoId}`, checkedTodos);
      setTodos(checkedTodos);
    } catch (error){
      console.log("Error updating todo", error);
    }
  }

  function addTodo(title) {
    const newTodo = {
      id: makeId(10),
      title: title,
      isComplete: false,
    };

    const newTodos = [...todos];
    newTodos.push(newTodo);
    console.log('after add: ',newTodos);
    setTodos(newTodos);
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

  return (
    <div className="main-container">
      <h1>Cat App</h1>
      <TodoStatistics
        completedTodos={countCompletedTodos()}
        uncompletedTodos={countUncompletedTodos()}
        completionPercentage={calculateCompletionPercentage()}
      />
      <AddTodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default App;
