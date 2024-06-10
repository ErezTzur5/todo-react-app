import { useState } from 'react';
import './App.css';


function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const data = [
  { id: '1', title: 'Learn React', isComplete: false },
  { id: '2', title: 'Build a Todo App', isComplete: false },
  { id: '3', title: 'Read JavaScript Documentation', isComplete: true },
  { id: '4', title: 'Write Unit Tests', isComplete: false },
  { id: '5', title: 'Implement Context', isComplete: true },
  { id: '6', title: 'Create Portfolio Website', isComplete: false },
  { id: '7', title: 'Learn TypeScript', isComplete: false },
  { id: '8', title: 'Refactor Codebase', isComplete: true },
  { id: '9', title: 'Optimize Performance', isComplete: false },
  { id: '10', title: 'Deploy to Production', isComplete: true },
];

const emptyData = []; // for test in case data is empty 

function App() {
  const [todos, setTodos] = useState(data);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  function removeTodo(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  function toggleComplete(todoId) {
    const checkedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(checkedTodos);
  }

  function addTodo(ev) {
    ev.preventDefault();

    const newTodo = {
      id: makeId(),
      title: newTodoTitle,
      isComplete: false,
    };

    const newTodos = [...todos];
    newTodos.push(newTodo);

    setTodos(newTodos);
  }

  function countCompletedTodos() {
    return todos.filter((todo) => todo.isComplete).length;
  }
 
  function countUncompletedTodos() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  function calculateCompletionPercentage() {
    return (countCompletedTodos() / todos.length) * 100; // fix divide by 0
  }

  return (
    <>
      <div className="main-container">
        <h1>Cat App</h1>
        <h2>Completed Todos: {countCompletedTodos()}</h2>
        <h2>Uncompleted Todos: {countUncompletedTodos()}</h2>
        <div className='progress-bar'>
          <div
            className='progress-bar-fill'
            style={{ width: `${calculateCompletionPercentage()}%` }}
          ></div>
        </div>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(ev) => setNewTodoTitle(ev.target.value)}
          />
          <button className='add-btn'>Add</button>
        </form>
        <div className='container'>
          {todos.length === 0 ? (
            <p>No todos available</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className="">
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.isComplete}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    <span>{todo.title}</span>
                  </label>
                  <button onClick={() => removeTodo(todo.id)}>Delete Todo</button>
                </li>
              ))}
            </ul>
          )}
          <h1>Total number of todos:{todos.length}</h1>
        </div>
      </div>
      
    </>
  );
}

export default App;
