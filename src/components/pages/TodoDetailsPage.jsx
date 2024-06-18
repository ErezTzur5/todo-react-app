import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLabels, setNewLabels] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/todos/${id}`);
        setTodo(response.data);
        setNewTitle(response.data.title);
        setNewLabels(response.data.labels.join(','));
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:8001/todos/${id}`, { title: newTitle, labels: newLabels.split(','), isComplete: todo.isComplete });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8001/todos/${id}`);
      setEditMode(false);
      navigate("/todo-page");
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>TodoDetailPage</h1>
      {editMode ? (
        <div>
          <span>Title:</span>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <span>Labels:</span>
          <input
            type="text"
            value={newLabels}
            onChange={(e) => setNewLabels(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <p>Todo Title: {todo.title}</p>
          <p>Labels: {todo.labels.join(', ')}</p>
          <button onClick={() => setEditMode(true)}>Edit Title/Labels</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <p>Showing details for todo with id: {id}</p>

    </div>

  );
}

export default TodoDetailsPage;
