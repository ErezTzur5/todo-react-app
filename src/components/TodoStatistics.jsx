import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

function TodoStatistics({ completedTodos, uncompletedTodos, completionPercentage }) {
  return (
    <Box className="todo-statistics" p={2}>
      <Typography variant="h6">Completed Todos: {completedTodos}</Typography>
      <Typography variant="h6">Uncompleted Todos: {uncompletedTodos}</Typography>
      <LinearProgress
        variant="determinate"
        value={completionPercentage}
        style={{ height: '10px', borderRadius: '5px' }}
      />
    </Box>
  );
}

export default TodoStatistics;

