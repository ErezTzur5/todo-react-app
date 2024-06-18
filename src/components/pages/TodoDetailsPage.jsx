import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, Typography, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

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
    <Card sx={{ marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h5">Todo Detail</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>Todo Title: {todo.title}</Typography>
                  <Typography>Labels: {todo.labels.join(', ')}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {editMode && (
          <div>
            <TextField
              label="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <TextField
              label="Labels"
              value={newLabels}
              onChange={(e) => setNewLabels(e.target.value)}
            />
            <Button onClick={handleEdit}>Save</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TodoDetailsPage;
