import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    TODO
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/todo-page">
                    Todo Page
                </Button>
                <Button color="inherit" component={Link} to="/create-todo">
                    Create Todo
                </Button>
                <Button color="inherit" component={Link} to="/activity">
                    Activity
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
