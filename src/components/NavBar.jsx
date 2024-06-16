import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    TODO
                </Typography>
                <Button color="inherit">
                    Home
                </Button>
                <Button color="inherit">
                    About
                </Button>
                <Button color="inherit">
                    Todo
                </Button>
                <Button color="inherit">
                    Activity
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
