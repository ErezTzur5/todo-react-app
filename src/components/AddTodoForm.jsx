import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();
    addTodo(newTodoTitle);
    setNewTodoTitle(""); // clear input field after adding
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(ev) => setNewTodoTitle(ev.target.value)}
      />
      <button className='add-btn'>Add</button>
    </form>
  );
}

export default AddTodoForm;